"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function InterviewPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [interviewType, setInterviewType] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setSelectedFile(file);
    } else {
      alert('Please upload a PDF or Word document');
    }
  };

  const handleStartInterview = async () => {
    if (!interviewType || !jobRole || !experienceLevel) {
      alert('Please fill in all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('interviewType', interviewType);
    formData.append('jobRole', jobRole);
    formData.append('experienceLevel', experienceLevel);
    if (selectedFile) {
      formData.append('resume', selectedFile);
    }

    // TODO: Implement API call to start interview with resume
    console.log('Starting interview with:', formData);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Start New Interview</h1>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="interviewType">Interview Type</Label>
            <select
              id="interviewType"
              className="w-full p-2 border rounded-md"
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="technical">Technical</option>
              <option value="behavioral">Behavioral</option>
            </select>
          </div>

          <div>
            <Label htmlFor="jobRole">Job Role</Label>
            <Input
              id="jobRole"
              type="text"
              placeholder="e.g. Frontend Developer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="experienceLevel">Experience Level</Label>
            <select
              id="experienceLevel"
              className="w-full p-2 border rounded-md"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
            >
              <option value="">Select Level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>

          <div>
            <Label htmlFor="resume">Upload Resume (Optional)</Label>
            <Input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: PDF, DOC, DOCX
            </p>
          </div>

          <Button
            onClick={handleStartInterview}
            className="w-full"
          >
            Start Interview
          </Button>
        </div>
      </Card>
    </div>
  );
}