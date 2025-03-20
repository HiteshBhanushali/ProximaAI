# Sequence Diagram

```plantuml
@startuml

skinparam sequence {
    ParticipantBackgroundColor White
    ParticipantBorderColor Black
    ArrowColor Black
    LifeLineBorderColor Black
}

actor User
participant "Frontend" as FE
participant "Backend" as BE
participant "Clerk Auth" as Auth
participant "Database" as DB
participant "AI Model" as AI

== User Authentication ==

User -> FE: Click Sign In
FE -> Auth: Redirect to Auth Page
Auth --> User: Display Auth Form
User -> Auth: Enter Credentials
Auth -> Auth: Validate Credentials
Auth --> BE: Generate JWT Token
BE -> DB: Store Session
DB --> BE: Confirm Storage
BE --> FE: Return Auth Status
FE --> User: Redirect to Dashboard

== Mock Interview ==

User -> FE: Start Mock Interview
FE -> BE: Create Interview Session
BE -> DB: Save Interview Details
DB --> BE: Return Session ID
BE -> AI: Generate Interview Questions
AI --> BE: Return Customized Questions
BE -> DB: Store Questions
DB --> BE: Confirm Storage
BE --> FE: Session Created

loop For Each Question
    FE -> BE: Get Next Question
    BE -> DB: Fetch Question
    DB --> BE: Return Question
    BE --> FE: Display Question
    User -> FE: Submit Answer
    FE -> BE: Process Answer
    BE -> AI: Analyze Response
    AI -> AI: Generate Detailed Feedback
    AI -> AI: Score Response
    AI -> AI: Suggest Improvements
    AI --> BE: Return Comprehensive Feedback
    BE -> DB: Store Answer & Feedback
    DB --> BE: Confirm Storage
    BE --> FE: Show Feedback
    FE --> User: Display Results
end

== Aptitude Test ==

User -> FE: Start Aptitude Test
FE -> BE: Create Test Session
BE -> AI: Request Test Questions
AI -> AI: Generate Questions by Difficulty
AI -> AI: Create Answer Options
AI --> BE: Return Test Content
BE -> DB: Store Test Questions
DB --> BE: Confirm Storage
BE --> FE: Test Ready

loop For Each Question
    FE -> BE: Get Question
    BE -> DB: Fetch Question
    DB --> BE: Return Question
    BE --> FE: Display Question
    User -> FE: Submit Answer
    FE -> BE: Process Answer
    BE -> AI: Evaluate Answer
    AI -> AI: Calculate Score
    AI -> AI: Generate Explanation
    AI --> BE: Return Evaluation
    BE -> DB: Store Result
    DB --> BE: Confirm Storage
    BE --> FE: Show Result
    FE --> User: Display Feedback
end

== Project Generation ==

User -> FE: Request Project Generation
FE -> BE: Submit Requirements
BE -> AI: Process Project Request

loop Project Stages
    AI -> AI: Generate Stage Instructions
    AI -> AI: Create Technical Details
    AI -> AI: Define Milestones
    AI --> BE: Return Stage Plan
    BE -> DB: Store Stage Details
    DB --> BE: Confirm Storage
    BE --> FE: Display Stage Info
    FE --> User: Show Instructions
    
    User -> FE: Submit Stage Progress
    FE -> BE: Update Progress
    BE -> AI: Review Progress
    AI -> AI: Analyze Implementation
    AI -> AI: Generate Feedback
    AI --> BE: Return Stage Feedback
    BE -> DB: Update Project Status
    DB --> BE: Confirm Update
    BE --> FE: Show Progress Update
    FE --> User: Display Stage Completion
end

@enduml
```

## Sequence Details

### Authentication Flow
- User initiates sign-in process
- Clerk Auth handles authentication
- Backend validates and stores session
- Frontend redirects to dashboard

### Mock Interview Process
- User starts interview session
- AI Model generates customized questions
- System manages question flow
- AI Model provides comprehensive answer analysis
- Results and feedback are stored and displayed

### Aptitude Test Process
- User initiates test session
- AI Model generates questions and options
- System manages test flow
- AI Model evaluates answers and provides explanations
- Results and feedback are stored and displayed

### Project Generation Process
- User submits project requirements
- AI Model breaks down into stages
- Each stage includes detailed instructions
- System tracks progress and provides feedback
- AI Model reviews implementation and suggests improvements