import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    const { currentStage, projectId } = await request.json();

    // Mock stage progression logic - in a real app this would interact with a database
    const stages = [
      'Planning',
      'Development',
      'Testing',
      'Deployment'
    ];

    const currentIndex = stages.indexOf(currentStage);
    const nextIndex = currentIndex + 1;

    if (nextIndex >= stages.length) {
      return NextResponse.json(
        { error: 'Project is already at final stage' },
        { status: 400 }
      );
    }

    const nextStage = stages[nextIndex];
    const stageInstructions = {
      description: `Instructions for ${nextStage} stage`,
      steps: [
        `1. Begin ${nextStage} phase`,
        '2. Follow best practices',
        '3. Document progress'
      ],
      resources: [
        'Relevant documentation',
        'Helpful tutorials'
      ]
    };

    return NextResponse.json({
      current_stage: nextStage,
      stage_instructions: stageInstructions,
      next_stage: nextIndex + 1 < stages.length ? stages[nextIndex + 1] : null
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing next stage:', error);
    return NextResponse.json(
      { error: 'Failed to progress to next stage' },
      { status: 500 }
    );
  }
}