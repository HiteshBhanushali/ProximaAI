import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { projectId } = params;

    // Mock data for demonstration
    const projectInstructions = {
      instructions: `Project Stage Instructions:

1. Environment Setup
- Install required dependencies
- Configure development environment
- Set up version control

2. Implementation Steps
- Follow the architectural design
- Implement core features
- Add error handling

3. Testing
- Write unit tests
- Perform integration testing
- Conduct user acceptance testing

4. Deployment
- Prepare deployment environment
- Deploy application
- Monitor performance

Next Steps:
1. Review current implementation
2. Address any pending issues
3. Plan for the next stage
`,
      nextStage: "Implementation",
      nextStageInstructions: "Begin implementing the core features..."
    };

    return NextResponse.json(projectInstructions);
  } catch (error) {
    console.error('Error fetching project instructions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project instructions' },
      { status: 500 }
    );
  }
}