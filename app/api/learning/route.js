import { chatSession } from "@/utils/GeminiAIModal";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { user_request, project_stage, previous_response, difficulty } = await req.json();

    // Initial request - create project stages and first stage instructions
    if (!project_stage && !previous_response) {
      const initialPrompt = `Based on this learning request: "${user_request}" with difficulty level "${difficulty || 'Normal'}", create a detailed technical project plan focusing strictly on development and implementation stages. ${difficulty === 'Proxima Special' ? '\nNote: This is a special project focusing on unsolved problems and challenges that require innovative solutions.' : ''}
        1. Break down the project into logical stages that directly relate to technical implementation (avoid non-technical stages like portfolio creation or job preparation)
        2. Each stage must focus on concrete development tasks such as:
           - Setting up development environment
           - Implementing core features
           - Building user interfaces
           - Integrating APIs or services
           - Testing and debugging
           - Deployment and optimization
        3. For the first stage, provide detailed step-by-step technical instructions in markdown format with:
           - Clear headings using # for main sections
           - Proper code blocks using triple backticks with language specification
           - Lists using - or numbers
           - Important notes in blockquotes using >
        4. Include all necessary commands and code snippets
        5. Format the response as a JSON with fields: project_stages (array), current_stage (string), stage_instructions (string in markdown), and next_stage (string)`;

      const result = await chatSession.sendMessage(initialPrompt);
      const response = result.response.text();
      
      try {
        const cleanedResponse = response
          .replace(/```json\n?|```/g, '') // Remove code block markers
          .replace(/<!DOCTYPE[^>]*>/g, '') // Remove DOCTYPE
          .replace(/<[^>]+>/g, '') // Remove HTML tags
          .trim();

        const parsedResponse = JSON.parse(cleanedResponse);
        
        if (!Array.isArray(parsedResponse.project_stages) ||
            typeof parsedResponse.current_stage !== 'string' ||
            !parsedResponse.stage_instructions ||
            typeof parsedResponse.next_stage !== 'string') {
          throw new Error('Invalid response format: Missing required fields');
        }

        // Ensure stage_instructions is a properly formatted markdown string
        if (Array.isArray(parsedResponse.stage_instructions)) {
          parsedResponse.stage_instructions = parsedResponse.stage_instructions
            .map(instruction => instruction.trim())
            .join('\n\n');
        }

        return NextResponse.json(parsedResponse);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError, '\nResponse:', response);
        throw new Error(`Failed to parse AI response: ${parseError.message}`);
      }
    }

    // Subsequent requests - provide instructions for the next stage
    const nextStagePrompt = `The user has completed the "${project_stage}" stage of their learning project.
      Original request: "${user_request}"
      Previous stages: ${JSON.stringify(previous_response.project_stages)}
      Current stage to work on: "${previous_response.next_stage}"
      
      Provide detailed instructions for the current stage in markdown format including:
      1. Clear headings using # for main sections
      2. Step-by-step guidance with proper lists
      3. Code blocks using triple backticks with language specification
      4. Important notes in blockquotes using >
      5. Format the response as a JSON with fields: project_stages (array), current_stage (string), stage_instructions (string in markdown), and next_stage (string)`;

    const result = await chatSession.sendMessage(nextStagePrompt);
    const response = result.response.text();
    
    try {
      const cleanedResponse = response
        .replace(/```json\n?|```/g, '')
        .replace(/<!DOCTYPE[^>]*>/g, '')
        .replace(/<[^>]+>/g, '')
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
        .trim();

      const parsedResponse = JSON.parse(cleanedResponse);
      
      if (!Array.isArray(parsedResponse.project_stages) ||
          typeof parsedResponse.current_stage !== 'string' ||
          !parsedResponse.stage_instructions ||
          typeof parsedResponse.next_stage !== 'string') {
        throw new Error('Invalid response format: Missing required fields');
      }

      // Ensure stage_instructions is a properly formatted markdown string
      if (Array.isArray(parsedResponse.stage_instructions)) {
        parsedResponse.stage_instructions = parsedResponse.stage_instructions
          .map(instruction => instruction.trim())
          .join('\n\n');
      }

      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError, '\nResponse:', response);
      throw new Error(`Failed to parse AI response: ${parseError.message}`);
    }

  } catch (error) {
    console.error('Error processing learning request:', error);
    return NextResponse.json(
      { error: 'Failed to process learning request' },
      { status: 500 }
    );
  }
}