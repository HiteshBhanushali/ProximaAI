# Proxima AI

<div align="center">
An advanced AI-powered interview preparation platform with real-time feedback and interactive features.
</div>

## Overview
Proxima AI is a cutting-edge interview preparation platform that combines modern UI/UX with powerful AI capabilities. Built with Next.js 14, Tailwind CSS, and the Gemini API, it offers a seamless and interactive experience for job seekers to practice and enhance their interview skills. The platform leverages advanced AI algorithms to simulate realistic interview scenarios, provide instant feedback, and help users improve their interview performance systematically.

## Key Features

### AI-Powered Interviews
- **Dynamic Question Generation**: Utilizes Gemini API to generate contextually relevant questions based on the selected job role and experience level
- **Real-time Feedback**: Instant analysis of responses for clarity, relevance, and completeness
- **Adaptive Difficulty**: Questions adapt based on user performance and confidence levels
- **Multi-format Support**: Handles technical, behavioral, and situational interview questions

### Interactive UI/UX
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Intuitive Navigation**: User-friendly interface with clear progression paths
- **Real-time Animations**: Smooth transitions and feedback indicators
- **Accessibility Features**: WCAG 2.1 compliant with screen reader support

### Advanced Interview Features
- **Webcam Integration**: 
  - HD video recording capability
  - Body language and facial expression analysis
  - Gesture recognition for engagement metrics
  - Downloadable session recordings

- **Voice Analysis**:
  - Speech clarity assessment
  - Pace and tone evaluation
  - Filler word detection
  - Confidence level analysis

### Personalization & Learning
- **Custom Learning Paths**:
  - Industry-specific question sets
  - Role-based competency assessment
  - Skill gap analysis
  - Personalized improvement recommendations

- **Progress Tracking**:
  - Detailed performance metrics
  - Improvement trends
  - Skill proficiency scores
  - Interview readiness index

### Analytics & Insights
- **Performance Dashboard**:
  - Session-wise analysis
  - Response quality metrics
  - Communication effectiveness scores
  - Comparative performance analysis

- **Improvement Metrics**:
  - Skill development tracking
  - Weak area identification
  - Success rate analytics
  - Personalized improvement suggestions

## Project Architecture
### Frontend Architecture
- **Pages & Routing**: Next.js 14 App Router for efficient page navigation
- **Components**: Reusable UI components built with React and Shadcn UI
- **State Management**: React hooks and context for local state management
- **Styling**: Tailwind CSS for responsive and maintainable styling
- **Animations**: Framer Motion for smooth transitions and interactions

### Backend Architecture
- **API Routes**: Next.js API routes for serverless backend functionality
- **Database**: PostgreSQL with Neon for serverless database operations
- **ORM**: Drizzle for type-safe database queries and migrations
- **Authentication**: Clerk for secure user authentication and management
- **AI Integration**: Google Gemini API for intelligent interview interactions

## Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion
- **UI Components**: Shadcn UI
- **Authentication**: Clerk
- **Database**: PostgreSQL with Neon (Serverless)
- **ORM**: Drizzle
- **AI Integration**: Google Gemini API

## User Flow
### 1. Onboarding
- User registration and profile creation
- Skill assessment and goal setting
- Industry and role selection
- Experience level configuration

### 2. Interview Preparation
- **Pre-interview Setup**:
  - Select interview type (Technical/Behavioral)
  - Choose specific focus areas
  - Configure session duration
  - Test audio/video settings

- **During Interview**:
  - Real-time question presentation
  - Response recording and analysis
  - Immediate feedback on key metrics
  - Progress indicators

- **Post-interview**:
  - Comprehensive performance report
  - Detailed feedback on each response
  - Improvement suggestions
  - Practice recommendations

### 3. Progress Tracking
- View historical performance
- Track improvement metrics
- Access saved sessions
- Review feedback history

## Getting Started
### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (or Neon account)
- Clerk account for authentication
- Gemini API key

### Environment Setup
1. Clone the repository
2. Copy `.env.local.example` to `.env.local`
3. Configure the following environment variables:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
   DATABASE_URL=
   GEMINI_API_KEY=
   ```

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run database migrations:
   ```bash
   npm run db:migrate
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Docker Support
The project includes Docker support for containerized deployment:

1. Build the image:
   ```bash
   docker build -t proxima-ai .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 proxima-ai
   ```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support
Show your support by giving the project a ⭐️!

## Contact
For questions or feedback, reach out to:
- Email: [hbhanushali2017@gmail.com](mailto:hbhanushali2017@gmail.com)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
