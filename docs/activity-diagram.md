# Activity Diagram

```plantuml
@startuml

skinparam activity {
    BackgroundColor White
    BorderColor Black
    ArrowColor Black
}

|User|
|System|
|AI Model|

|User|
start
:Sign In with Clerk Auth;

|System|
:Authenticate via Clerk;
if (Valid?) then (yes)
  :Create Session;
  :Initialize Dashboard;
else (no)
  :Display Auth Error;
  stop
endif

|User|
:Select Activity;

switch (Activity Type)
case (Mock Interview)
  :Select Job Role;
  :Choose Experience Level;
  :Set Interview Preferences;
  |System|
  :Create Interview Session;
  :Store Interview Details;
  |AI Model|
  :Generate Customized Questions;
  |System|
  :Present Questions;
  |User|
  :Provide Answers;
  |AI Model|
  :Analyze Responses;
  :Generate Detailed Feedback;
  |System|
  :Store Interview Results;

case (Aptitude Test)
  :Choose Test Category;
  :Set Difficulty Level;
  |System|
  :Initialize Test Session;
  |AI Model|
  :Generate Test Questions;
  |System|
  :Present Questions;
  |User|
  :Submit Answers;
  |AI Model|
  :Evaluate Responses;
  :Calculate Score;
  |System|
  :Store Test Results;

case (Project Management)
  :Select Project Action;
  if (New Project?) then (yes)
    :Input Project Details;
    :Specify Requirements;
    |System|
    :Validate Project Data;
    |AI Model|
    :Generate Project Plan;
    :Suggest Timeline;
    |System|
    :Create Project;
  else (no)
    :Select Existing Project;
    :Update Project Status;
    |System|
    :Save Changes;
  endif
endswitch

|System|
:Update User Profile;
:Generate Performance Analytics;

|User|
:View Results/Feedback;
:Access Performance Report;
:Logout;

stop

@enduml
```

## Activity Flow Description
### User Flow
- Sign in using Clerk Authentication
- Choose activity type (Mock Interview/Aptitude Test/Project)
- Provide necessary details and preferences
- Complete assigned tasks
- View results and performance analytics

### System Flow
- Handle Clerk authentication
- Manage user sessions
- Process and validate user inputs
- Store results in Neon PostgreSQL
- Generate performance analytics

### AI Model Flow
- Generate customized questions for interviews and tests
- Process and analyze user responses
- Provide detailed feedback and evaluations
- Generate project plans and timelines
- Calculate performance metrics