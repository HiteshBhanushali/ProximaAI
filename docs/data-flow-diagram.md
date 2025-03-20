# Data Flow Diagram

```plantuml
@startuml

!define BLUE #1E90FF
!define GREEN #32CD32
!define ORANGE #FFA500
!define PURPLE #9370DB
!define RED #FF6B6B
!define YELLOW #FFD700
!define CYAN #00CED1
!define PINK #FF69B4
!define TEAL #008080

skinparam {
    BackgroundColor White
    ArrowColor #666666
    BorderColor #333333
    ComponentFontSize 14
    ComponentFontStyle bold
    PackageFontSize 16
    PackageFontStyle bold
    PackageBackgroundColor transparent
    ComponentBackgroundColor White
    CloudBackgroundColor #F0F8FF
    DatabaseBackgroundColor #F5F5F5
    InterfaceBackgroundColor White
    ArrowFontSize 12
}

skinparam rectangle {
    RoundCorner 20
    BackgroundColor White
    BorderColor #333333
    BorderThickness 2
}

rectangle "User Interface" #BLUE {
    [Web Browser] as browser
    [Mobile App] as mobile
}

rectangle "Authentication Layer" #PURPLE {
    [Clerk Auth Service] as auth
    [Session Manager] as session
}

rectangle "Application Layer" #GREEN {
    [Interview Module] as interview
    [Aptitude Module] as aptitude
    [Project Module] as project
    [Newsletter Module] as newsletter
}

rectangle "AI Processing Layer" #ORANGE {
    [Question Generator] as qgen
    [Response Analyzer] as analyzer
    [Feedback Engine] as feedback
    [Project Planner] as planner
}

database "Data Storage" #RED {
    [User Data] as userdb
    [Question Bank] as qbank
    [Response History] as history
    [Project Data] as projectdb
}

cloud "External Services" #CYAN {
    [AI Model API] as aiapi
    [Email Service] as email
}

' User Interface Data Flows
browser -[#BLUE]-> auth : "1. Authentication Request"
mobile -[#BLUE]-> auth : "1. Authentication Request"

' Authentication Flows
auth -[#PURPLE]-> session : "2. Validate Credentials"
session -[#PURPLE]-> userdb : "3. Store Session Data"

' Application Module Flows
browser -[#GREEN]-> interview : "4. Start Interview"
browser -[#GREEN]-> aptitude : "4. Take Aptitude Test"
browser -[#GREEN]-> project : "4. Manage Projects"
browser -[#GREEN]-> newsletter : "4. Subscribe Newsletter"

' AI Processing Flows
interview -[#ORANGE]-> qgen : "5. Generate Questions"
aptitude -[#ORANGE]-> qgen : "5. Generate Questions"
project -[#ORANGE]-> planner : "5. Create Project Plan"

qgen -[#YELLOW]-> qbank : "6. Store Questions"
qgen <-[#YELLOW]-> aiapi : "6. AI Model Interaction"

' Response Processing Flows
interview -[#TEAL]-> analyzer : "7. Process Responses"
aptitude -[#TEAL]-> analyzer : "7. Evaluate Answers"
project -[#TEAL]-> planner : "7. Analyze Project"

analyzer -[#RED]-> feedback : "8. Generate Feedback"
planner -[#RED]-> feedback : "8. Generate Recommendations"

' Storage Flows
feedback -[#PINK]-> history : "9. Store Results"
project -[#PINK]-> projectdb : "9. Store Project Data"
newsletter -[#PINK]-> userdb : "9. Store Subscription"

' Notification Flows
feedback ..> email : "10. Send Notifications"
newsletter ..> email : "10. Send Updates"

@enduml
```

## Data Flow Description

### User Interface Layer
- Web Browser and Mobile App interfaces capture user interactions
- Sends authentication requests and receives responses
- Provides interface for all system functionalities

### Authentication Layer
- Handles user authentication and session management
- Validates credentials and maintains secure sessions
- Stores session data in the database

### Application Layer
- Manages core application modules:
  - Interview: Handles mock interview sessions
  - Aptitude: Manages aptitude testing
  - Project: Handles project management
  - Newsletter: Manages subscriptions

### AI Processing Layer
- Question Generator: Creates customized questions
- Response Analyzer: Processes user responses
- Feedback Engine: Generates personalized feedback
- Project Planner: Creates and analyzes project plans

### Data Storage Layer
- User Data: Stores user profiles and settings
- Question Bank: Maintains question repository
- Response History: Records user responses and feedback
- Project Data: Stores project-related information

### External Services
- AI Model API: Provides AI processing capabilities
- Email Service: Handles notification delivery

### Data Flow Sequence
1. Authentication Request: User initiates system access
2. Credential Validation: Auth service verifies user
3. Session Management: Create and store user session
4. Module Interaction: User accesses system features
5. AI Processing: Generate questions and plans
6. Data Storage: Store questions and AI interactions
7. Response Processing: Analyze user inputs
8. Feedback Generation: Create personalized feedback
9. Data Persistence: Store results and project data
10. Notifications: Send updates and feedback to users