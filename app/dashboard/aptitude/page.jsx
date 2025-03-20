"use client";
import React, { useState, useEffect } from 'react';
import AptitudeList from './_components/AptitudeList';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { AptitudeTest } from "@/utils/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const AptitudeTestComponent = () => {
  const [numQuestions, setNumQuestions] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [selectedTypes, setSelectedTypes] = useState({
    theory: false,
    scenario: false,
    coding: false
  });
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [testId, setTestId] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    setDialogOpen(!testStarted && !questions.length);
  }, [testStarted, questions]);

  const questionTypes = [
    { id: 'theory', label: 'Theory Based' },
    { id: 'scenario', label: 'Scenario Based' },
    { id: 'coding', label: 'Coding Based' }
  ];

  const handleTypeChange = (type) => {
    setSelectedTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const generateQuestions = async () => {
    if (!numQuestions || !Object.values(selectedTypes).some(Boolean) || !jobPosition || !jobDesc || !jobExperience) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    const selectedTypesArr = Object.entries(selectedTypes)
      .filter(([_, selected]) => selected)
      .map(([type]) => type);

    const prompt = `Generate ${numQuestions} multiple choice questions for a ${jobPosition} position with ${jobExperience} years of experience requirement. Consider the following job description: ${jobDesc}.
      Question criteria:
      - Question types: ${selectedTypesArr.join(', ')}
      - Each question should have 4 options labeled as A, B, C, D
      - Each option should start with the letter (A, B, C, D) followed by a period and space
      - Include the correct answer as a single letter (A, B, C, or D)
      - Provide explanation for why each wrong option is incorrect
      Format the response as a JSON array with objects containing:
      - question (string)
      - options (array of 4 strings, each starting with A., B., C., or D.)
      - correctAnswer (string, one of: A, B, C, D)
      - explanations (object with keys A, B, C, D containing explanation strings)
      Example format:
      [{
        "question": "What is...",
        "options": ["A. First option", "B. Second option", "C. Third option", "D. Fourth option"],
        "correctAnswer": "A",
        "explanations": {
          "B": "This is incorrect because...",
          "C": "This is wrong as...",
          "D": "This is not correct since..."
        }
      }]`;

    try {
      const result = await chatSession.sendMessage(prompt);
      const responseText = result.response.text();
      
      // Clean up the response text and ensure proper JSON structure
      let cleanedResponse = responseText
        .replace(/```json\n?|```/g, '')
        .trim()
        .replace(/\n\s*/g, ' ');
      
      // Ensure the response starts with [ and ends with ]
      if (!cleanedResponse.startsWith('[') || !cleanedResponse.endsWith(']')) {
        throw new Error('Invalid response format: Expected JSON array');
      }
      
      try {
        const questionsData = JSON.parse(cleanedResponse);
        
        if (!Array.isArray(questionsData)) {
          throw new Error('Invalid response format: Expected an array of questions');
        }
        
        const validatedQuestions = questionsData.map((question, index) => {
          if (!question.question || typeof question.question !== 'string') {
            throw new Error(`Question ${index + 1}: Missing or invalid question text`);
          }
          
          if (!Array.isArray(question.options) || question.options.length !== 4) {
            throw new Error(`Question ${index + 1}: Must have exactly 4 options`);
          }
          
          if (!question.options.every(opt => typeof opt === 'string' && /^[A-D]\. /.test(opt))) {
            throw new Error(`Question ${index + 1}: All options must be strings starting with A., B., C., or D.`);
          }
          
          if (!question.correctAnswer || !['A', 'B', 'C', 'D'].includes(question.correctAnswer)) {
            throw new Error(`Question ${index + 1}: Invalid or missing correct answer`);
          }
          
          if (!question.explanations || typeof question.explanations !== 'object' || 
              !['A', 'B', 'C', 'D'].every(letter => 
                letter !== question.correctAnswer ? typeof question.explanations[letter] === 'string' : true
              )) {
            throw new Error(`Question ${index + 1}: Missing or invalid explanations`);
          }
          
          return {
            question: question.question.trim(),
            options: question.options.map(opt => opt.trim()),
            correctAnswer: question.correctAnswer,
            explanations: question.explanations
          };
        });
        
        const newTestId = uuidv4();
        setTestId(newTestId);
        setQuestions(validatedQuestions);
        setTimeLeft(numQuestions * 2 * 60);
        setTestStarted(true);

        // Save test to database
        await db.insert(AptitudeTest).values({
          testId: newTestId,
          jobPosition,
          jobDesc,
          jobExperience,
          questions: JSON.stringify(validatedQuestions),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('YYYY-MM-DD')
        });
      } catch (parseError) {
        console.error('Error parsing questions data:', parseError);
        alert('Error: The generated questions were not in the correct format. Please try again.');
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Error: Unable to generate questions. Please check your inputs and try again.');
    }
    setLoading(false);
  };

  useEffect(() => {
    let timer;
    if (testStarted && timeLeft > 0 && !testEnded) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setTestEnded(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, timeLeft, testEnded]);

  const handleAnswerSelect = (questionIndex, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const endTest = async () => {
    setTestEnded(true);
    
    // Calculate score first
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const calculatedScore = (correctAnswers / questions.length) * 100;
    setScore(calculatedScore);

    try {
      // Import eq operator
      const { eq } = require('drizzle-orm');
      
      // Update the test record with answers and score
      const result = await db
        .update(AptitudeTest)
        .set({
          userAnswers: JSON.stringify(userAnswers),
          score: calculatedScore.toString()
        })
        .where(eq(AptitudeTest.testId, testId));
    } catch (error) {
      console.error('Error saving test results:', error);
      alert('Error saving your test results. Please try again.');
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore((correctAnswers / questions.length) * 100);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Aptitude Test</h2>
      <h2 className="text-gray-500">Create and start your AI Aptitude Test</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <div
          className="p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-sm transition-all cursor-pointer"
          onClick={() => {
            setTestStarted(false);
            setDialogOpen(true);
          }}
        >
          <h2 className="text-lg text-center">+ Add New Aptitude Test</h2>
        </div>
      </div>

      <AptitudeList />
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create New Aptitude Test</DialogTitle>
            <DialogDescription>
              Fill in the details below to generate your aptitude test questions
            </DialogDescription>
          </DialogHeader>
        <div className="mt-5 space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-2">Job Position</label>
            <Input
              type="text"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
              placeholder="Enter job position"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Job Description</label>
            <Input
              type="text"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Enter job description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Years of Experience</label>
            <Input
              type="number"
              min="0"
              max="50"
              value={jobExperience}
              onChange={(e) => setJobExperience(e.target.value)}
              placeholder="Enter years of experience"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number of Questions</label>
            <Input
              type="number"
              min="1"
              max="20"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              placeholder="Enter number of questions"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Question Types</label>
            {questionTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id={type.id}
                  checked={selectedTypes[type.id]}
                  onCheckedChange={() => handleTypeChange(type.id)}
                />
                <label htmlFor={type.id}>{type.label}</label>
              </div>
            ))}
          </div>

          <Button
            onClick={generateQuestions}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin mr-2" />
                Generating Questions
              </>
            ) : (
              'Start Test'
            )}
          </Button>
        </div>
        </DialogContent>
      </Dialog>

      {questions.length > 0 && (
        <div className="mt-5">
          {!testEnded && (
            <div className="mb-4 text-lg font-semibold">
              Time Remaining: {formatTime(timeLeft)}
            </div>
          )}

          {questions.map((question, index) => (
            <div key={index} className="mb-8 p-4 border rounded-lg">
              <h3 className="font-medium mb-3">{index + 1}. {question.question}</h3>
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={String.fromCharCode(65 + optIndex)}
                      onChange={(e) => handleAnswerSelect(index, e.target.value)}
                      disabled={testEnded}
                      className="mr-2"
                    />
                    <label>{String.fromCharCode(65 + optIndex)}. {option.replace(/^[A-D].s*/, '')}</label>
                  </div>
                ))}
              </div>

              {testEnded && (
                <div className="mt-4">
                  <p className="font-medium text-green-600">
                    Correct Answer: {question.correctAnswer}
                  </p>
                  {question.correctAnswer !== userAnswers[index] && (
                    <div className="mt-2">
                      <p className="text-red-600">Your Answer: {userAnswers[index]}</p>
                      <p className="mt-1 text-sm">
                        Explanation why {userAnswers[index]} is incorrect: 
                        {question.explanations[userAnswers[index]]}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {!testEnded ? (
            <Button onClick={endTest} className="mt-4">
              Submit Test
            </Button>
          ) : (
            <div className="mt-6 p-4 bg-secondary rounded-lg">
              <h3 className="text-xl font-bold">Test Results</h3>
              <p className="text-lg mt-2">Your Score: {score.toFixed(2)}%</p>
              <Button onClick={() => router.push('/dashboard')} className="mt-4">
                Back to Dashboard
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AptitudeTestComponent;