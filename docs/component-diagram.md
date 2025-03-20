# Component Diagram

```plantuml
@startuml

skinparam component {
    BackgroundColor White
    BorderColor Black
    ArrowColor Black
}

package "Frontend" {
    [UI Components] as UI
    [State Management] as State
    [Route Handler] as Router
    [API Client] as APIClient
}

package "Backend Services" {
    [Auth Service] as AuthService
    [Interview Service] as InterviewService
    [Project Service] as ProjectService
    [Aptitude Service] as AptitudeService
    [Newsletter Service] as NewsletterService
}

package "AI Integration" {
    [Gemini AI Client] as GeminiAI
    [Question Generator] as QuestionGen
    [Response Analyzer] as ResponseAnalyzer
    [Feedback Engine] as FeedbackEngine
}

package "Data Layer" {
    [Database Client] as DBClient
    [Data Models] as Models
    [Query Builder] as QueryBuilder
}

database "PostgreSQL" as DB

interface "HTTP/REST" as REST
interface "WebSocket" as WS
interface "Auth API" as AuthAPI
interface "AI API" as AIAPI
interface "DB Interface" as DBI

' Frontend Dependencies
UI ..> State
UI ..> Router
State ..> APIClient
Router ..> APIClient
APIClient ..> REST
APIClient ..> WS

' Backend Service Dependencies
REST ..> AuthService
REST ..> InterviewService
REST ..> ProjectService
REST ..> AptitudeService
REST ..> NewsletterService

AuthService ..> AuthAPI
AuthService ..> DBClient
InterviewService ..> GeminiAI
InterviewService ..> DBClient
ProjectService ..> GeminiAI
ProjectService ..> DBClient
AptitudeService ..> GeminiAI
AptitudeService ..> DBClient
NewsletterService ..> DBClient

' AI Integration Dependencies
GeminiAI ..> AIAPI
GeminiAI ..> QuestionGen
GeminiAI ..> ResponseAnalyzer
GeminiAI ..> FeedbackEngine

' Data Layer Dependencies
DBClient ..> DBI
DBClient ..> Models
DBClient ..> QueryBuilder
DBI ..> DB

@enduml
```

## Component Details

### Frontend Components
- UI Components: Reusable UI elements and page layouts
- State Management: Handles application state and data flow
- Route Handler: Manages client-side routing
- API Client: Handles communication with backend services

### Backend Services
- Auth Service: Manages user authentication and session handling
- Interview Service: Handles mock interview sessions and feedback
- Project Service: Manages project generation and tracking
- Aptitude Service: Handles aptitude test creation and evaluation
- Newsletter Service: Manages newsletter subscriptions

### AI Integration
- Gemini AI Client: Main interface for AI operations
- Question Generator: Creates interview questions and tests
- Response Analyzer: Evaluates user responses
- Feedback Engine: Generates detailed feedback and suggestions

### Data Layer
- Database Client: Handles database operations
- Data Models: Defines data structure and relationships
- Query Builder: Constructs and optimizes database queries