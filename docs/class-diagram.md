# Class Diagram

```plantuml
@startuml

skinparam class {
    BackgroundColor White
    ArrowColor Black
    BorderColor Black
}

class User {
    -id: string
    -email: string
    -firstName: string
    -lastName: string
    -createdAt: datetime
    -updatedAt: datetime
    +createUser(email: string, firstName: string, lastName: string): User
    +updateUser(firstName: string, lastName: string): void
    +getProfile(): UserProfile
    +submitNewsletter(name: string, email: string, message: string): void
}

class Newsletter {
    -id: int
    -newName: string
    -newEmail: string
    -newMessage: string
    -createdAt: datetime
    +createNewsletter(name: string, email: string, message: string): Newsletter
    +getMessage(): string
}

class MockInterview {
    -id: int
    -userId: string
    -jobRole: string
    -experienceLevel: string
    -status: string
    -createdAt: datetime
    -updatedAt: datetime
    +createInterview(userId: string, jobRole: string, experienceLevel: string): MockInterview
    +updateStatus(status: string): void
    +getQuestions(): Question[]
    +submitAnswer(questionId: int, content: string): UserAnswer
}

class Question {
    -id: int
    -interviewId: int
    -content: string
    -type: string
    -difficulty: string
    -createdAt: datetime
    +createQuestion(interviewId: int, content: string, type: string, difficulty: string): Question
    +getContent(): string
    +getDifficulty(): string
    +getUserAnswers(): UserAnswer[]
}

class UserAnswer {
    -id: int
    -questionId: int
    -userId: string
    -content: string
    -feedback: string
    -score: float
    -createdAt: datetime
    +submitAnswer(content: string): void
    +provideFeedback(feedback: string, score: float): void
    +getFeedback(): string
    +getScore(): float
}

class AptitudeTest {
    -id: int
    -userId: string
    -category: string
    -score: float
    -completedAt: datetime
    -createdAt: datetime
    +createTest(userId: string, category: string): AptitudeTest
    +submitTest(score: float): void
    +getScore(): float
    +getCategory(): string
}

class InterviewManager {
    +scheduleInterview(user: User, jobRole: string, experienceLevel: string): MockInterview
    +generateQuestions(interview: MockInterview): Question[]
    +evaluateAnswer(answer: UserAnswer): void
    +provideFeedback(answer: UserAnswer): string
}

class TestManager {
    +createAptitudeTest(user: User, category: string): AptitudeTest
    +evaluateTest(test: AptitudeTest): void
    +generateReport(test: AptitudeTest): string
}

' Relationships
User "1" -- "*" Newsletter: submits >
User "1" -- "*" MockInterview: takes >
User "1" -- "*" UserAnswer: provides >
User "1" -- "*" AptitudeTest: attempts >
MockInterview "1" -- "*" Question: contains >
Question "1" -- "*" UserAnswer: has >
InterviewManager -- MockInterview: manages >
InterviewManager -- Question: generates >
InterviewManager -- UserAnswer: evaluates >
TestManager -- AptitudeTest: manages >

@enduml
```

## Class Details

### User
Represents the system user with authentication and profile information.
- Manages user profile data
- Handles newsletter submissions
- Links to interviews, answers, and tests

### Newsletter
Handles newsletter subscriptions and contact form data.
- Stores contact form submissions
- Manages message content

### MockInterview
Manages interview sessions and their lifecycle.
- Tracks interview progress
- Contains questions
- Manages user responses

### Question
Represents interview questions with their properties.
- Stores question content and metadata
- Links to user answers
- Manages difficulty levels

### UserAnswer
Handles user responses to interview questions.
- Stores answer content
- Manages feedback and scoring
- Links to questions and users

### AptitudeTest
Manages aptitude test sessions and results.
- Tracks test progress
- Stores scores
- Manages test categories

### InterviewManager
Service class that handles interview-related operations.
- Schedules interviews
- Generates questions
- Evaluates answers
- Provides feedback

### TestManager
Service class for managing aptitude tests.
- Creates tests
- Evaluates responses
- Generates reports

## Relationships

### User Relationships
- One User can submit multiple Newsletters
- One User can take multiple MockInterviews
- One User can provide multiple UserAnswers
- One User can attempt multiple AptitudeTests

### Interview Relationships
- One MockInterview contains multiple Questions
- One Question can have multiple UserAnswers
- InterviewManager manages MockInterviews, Questions, and UserAnswers

### Test Relationships
- TestManager manages AptitudeTests
- Each AptitudeTest belongs to one User