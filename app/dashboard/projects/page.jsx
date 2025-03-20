"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import ReactMarkdown from 'react-markdown';

const ProjectsPage = () => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [loading, setLoading] = useState(false);
  const [projectPlan, setProjectPlan] = useState(null);
  const [currentStageInstructions, setCurrentStageInstructions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/learning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_request: `${projectName}\n\n${projectDesc}`,
          project_stage: null,
          previous_response: null,
          difficulty: difficulty
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const data = await response.json();
      // Format the stage instructions if they're in array format
      if (Array.isArray(data.stage_instructions)) {
        data.stage_instructions = data.stage_instructions.map(instruction => {
          if (typeof instruction === 'string') {
            // Remove array formatting artifacts and clean up the text
            return instruction.replace(/^["\s]+|["\s]+$/g, '')
                            .replace(/\\n/g, '\n')
                            .trim();
          }
          return instruction;
        }).join('\n');
      }
      setProjectPlan(data);
      setOpenDialog(false);
      toast.success('Project created successfully');
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleNextStage = async () => {
    try {
      const response = await fetch('/api/learning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_request: `${projectName}\n\n${projectDesc}`,
          project_stage: projectPlan.current_stage,
          previous_response: projectPlan
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch next stage');
      }
      
      const nextStageData = await response.json();
      setProjectPlan(nextStageData);
      toast.success('Progressed to next stage');
    } catch (error) {
      console.error('Error progressing to next stage:', error);
      toast.error('Failed to progress to next stage');
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Projects</h2>
      <h2 className="text-gray-500">Create and manage your learning projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <div
          className="p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-sm transition-all cursor-pointer"
          onClick={() => setOpenDialog(true)}
        >
          <h2 className="text-lg text-center">+ Add New Project</h2>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Enter project details below</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
            <Textarea
              placeholder="Project Description"
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              required
            />
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Proxima Special">Proxima Special</option>
            </select>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                'Create Project'
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {projectPlan && projectPlan.project_stages && (
        <div className="mt-8 space-y-6">
          <div className="bg-secondary/30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Project Stages</h3>
            <div className="space-y-4">
              {projectPlan.project_stages.map((stage, index) => (
                <div key={index} className={`bg-background rounded-lg p-4 ${projectPlan.current_stage === stage ? 'border-2 border-primary' : ''}`}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{stage}</h4>
                    {projectPlan.current_stage === stage && (
                      <span className="text-sm text-primary font-medium">Current Stage</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary/30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Current Stage: {projectPlan.current_stage}</h3>
            <Collapsible className="w-full">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-background rounded-lg hover:bg-secondary/50">
                <span>View Instructions</span>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 mt-2 bg-background rounded-lg">
                <div className="p-6 bg-background rounded-lg shadow-sm border border-primary/20 space-y-4">
                      <ReactMarkdown
                        components={{
                          code: ({node, inline, className, children, ...props}) => {
                            const language = className ? className.replace('language-', '') : '';
                            if (inline) {
                              return <code className="bg-secondary/50 px-1 py-0.5 rounded font-mono text-sm" {...props}>{children}</code>
                            }
                            return (
                              <div className="code-block-wrapper my-4">
                                <div className="code-header bg-primary/10 px-4 py-2 rounded-t-lg flex justify-between items-center">
                                  <span className="text-xs font-medium text-primary">{language || 'code'}</span>
                                </div>
                                <div className="bg-secondary/50 rounded-b-lg p-4 overflow-x-auto border border-primary/10">
                                  <pre className="text-sm font-mono text-foreground whitespace-pre-wrap" {...props}>{children}</pre>
                                </div>
                              </div>
                            )
                          },
                          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-primary/30" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mb-4 mt-8 text-primary flex items-center gap-2 before:content-['→'] before:text-primary/60" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-xl font-medium mb-3 mt-6 text-foreground/90 flex items-center gap-2 before:content-['•'] before:text-primary" {...props} />,
                          p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-foreground/90 pl-4 border-l-2 border-primary/10" {...props} />,
                          ul: ({node, ...props}) => <ul className="mb-6 space-y-3 pl-6" {...props} />,
                          ol: ({node, ...props}) => <ol className="mb-6 space-y-3 pl-6 counter-reset list-counter" {...props} />,
                          li: ({node, ...props}) => (
                            <li className="relative pl-6 before:absolute before:left-0 before:content-['•'] before:text-primary before:font-bold" {...props} />
                          ),
                          blockquote: ({node, ...props}) => (
                            <blockquote className="my-6 pl-6 border-l-4 border-primary py-3 pr-4 bg-primary/5 rounded-r-lg italic" {...props} />
                          ),
                          table: ({node, ...props}) => (
                            <div className="my-6 overflow-x-auto rounded-lg border-2 border-primary/20 shadow-sm">
                              <table className="min-w-full divide-y-2 divide-primary/20" {...props} />
                            </div>
                          ),
                          th: ({node, ...props}) => <th className="px-6 py-3 bg-primary/10 font-semibold text-primary text-left" {...props} />,
                          td: ({node, ...props}) => <td className="px-6 py-3 border-t border-primary/10" {...props} />
                        }}
                      >
                        {projectPlan.stage_instructions}
                      </ReactMarkdown>
</div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="bg-secondary/30 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Next Stage</h3>
            <Button 
              onClick={handleNextStage}
              className="w-full justify-between"
              disabled={!projectPlan.next_stage || projectPlan.current_stage === projectPlan.project_stages[projectPlan.project_stages.length - 1]}
            >
              <span>{projectPlan.next_stage || 'Project Complete'}</span>
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;