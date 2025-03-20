# System Architecture

```plantuml
@startuml

skinparam {
    BackgroundColor White
    ArrowColor Black
    BorderColor Black
}

cloud "Client Layer" {
    [Web Browser]
}

package "Frontend (Next.js)" {
    [UI Components]
    [State Management]
    [Route Handler]
    [API Client]
}

package "Backend Services" {
    [Auth Service]
    [Interview Service]
    [Project Service]
    [Aptitude Service]
    [Newsletter Service]
}

package "AI Integration" {
    [AI Model Client]
    [Question Generator]
    [Response Analyzer]
    [Feedback Engine]
}

package "Data Layer" {
    [Database Client]
    [Data Models]
    [Query Builder]
}

cloud "External Services" {
    [Clerk Auth]
    [AI Model API]
    [Neon PostgreSQL]
}

' Client Layer Connections
[Web Browser] --> [UI Components]: HTTP/WebSocket

' Frontend Connections
[UI Components] --> [State Management]
[UI Components] --> [Route Handler]
[Route Handler] --> [API Client]

' Backend Service Connections
[API Client] --> [Auth Service]: REST API
[API Client] --> [Interview Service]: REST API
```

## Architecture Overview
### AI Integration
- AI Model Client: Core AI service integration
- Question Generator: Generates interview/test questions
- Response Analyzer: Analyzes user responses
- Feedback Engine: Provides AI-powered feedback