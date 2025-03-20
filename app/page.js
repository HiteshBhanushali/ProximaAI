import React from 'react'
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Contect from './_components/Contect';
import Link from 'next/link';
import { FaGithub } from "react-icons/fa";

const page = () => {
  return (
    // <div className='p-10 flex flex-col items-center justify-center' >
    //   <h1 className='red font-bold text-[22px]'>Welcome to AI Mock Interview</h1>
    // <a  ><h1><Button>Start</Button></h1></a>
    // </div>

    <div>
      <Head>
        <title>Proxima AI</title>
        <meta name="description" content="Ace your next interview with AI-powered mock interviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen animate-fade-in">
        {/* Header Section */}
        <header className="w-full py-8 bg-gray-100 shadow-md animate-slide-in">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 animate-scale-in">
            <h1 className="text-3xl font-bold text-primary hover:animate-float">Proxima AI</h1>
            <nav className="flex flex-col sm:flex-row flex-wrap items-center justify-between mt-4 md:mt-0 space-y-4 sm:space-y-0 sm:space-x-4">
              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com">
                  <FaGithub className="w-10 h-8" />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0">
                <a href="#features" className="text-lg text-gray-800 mx-2 md:mx-4">Features</a>
                <a href="#testimonials" className="text-lg text-gray-800 mx-2 md:mx-4">Testimonials</a>
                <a href="#contact" className="text-lg text-gray-800 mx-2 md:mx-4">Contact</a>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-r from-gray-900 to-gray-400 px-6 md:px-0">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Ace Your Next Interview</h2>
          <p className="mt-4 text-lg md:text-xl text-white">Practice with AI-powered mock interviews and get personalized feedback</p>
          <div className="mt-4 grid grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <h3 className="text-3xl font-bold">95%</h3>
              <p>Success Rate</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold">10K+</h3>
              <p>Active Users</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold">50K+</h3>
              <p>Interviews Conducted</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col md:flex-row">
            <a
              href="/dashboard"
              className="px-6 py-3 mb-4 md:mb-0 md:mr-4 text-lg font-semibold bg-white !text-primary-600 rounded-lg shadow-lg hover:bg-gray-100"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-6 py-3 text-lg font-semibold border border-white rounded-lg hover:bg-white hover:text-black-600"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">Features</h2>
            <p className="mt-4 text-lg text-gray-800">
              Our Proxima AI platform offers a range of powerful features:
            </p>
            <div className="flex flex-wrap justify-center mt-8">
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-semibold text-black-600">Proxima AI Interviews</h3>
                  <p className="mt-2 text-gray-600">Experience realistic interview scenarios with our advanced AI.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-semibold text-black-600">Instant Feedback</h3>
                  <p className="mt-2 text-gray-600">Get instant, personalized feedback to improve your performance.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-semibold text-black-600">Comprehensive Reports</h3>
                  <p className="mt-2 text-gray-600">Receive detailed reports highlighting your strengths and weaknesses.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-semibold text-black-600">Aptitude Tests</h3>
                  <p className="mt-2 text-gray-600">Take comprehensive aptitude tests to assess your technical and soft skills.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-semibold text-black-600">Build Projects</h3>
                  <p className="mt-2 text-gray-600">Describe your learning goals and difficulty level to receive AI-generated project ideas with step-by-step guidance.</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-blue-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-semibold text-black-600">Resume Integration</h3>
                  <p className="mt-2 text-gray-600">Upload your resume and get personalized interview questions based on your experience.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-gray-50 px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">What Our Users Say</h2>
            <div className="flex flex-wrap justify-center mt-8">
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <p className="text-gray-600">
                    "The Proxima AI interviews were incredibly helpful. The instant feedback helped me identify and improve my weak areas."
                  </p>
                  <h4 className="mt-4 text-lg font-semibold text-blue-600">- Alex Johnson</h4>
                  <p className="text-sm text-gray-500">Software Engineer at Google</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <p className="text-gray-600">
                    "The aptitude tests and project feedback features gave me a comprehensive understanding of my capabilities."
                  </p>
                  <h4 className="mt-4 text-lg font-semibold text-blue-600">- Sarah Williams</h4>
                  <p className="text-sm text-gray-500">Product Manager at Microsoft</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-4 py-8">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <p className="text-gray-600">
                    "Resume integration feature provided tailored questions that helped me prepare better for my interviews."
                  </p>
                  <h4 className="mt-4 text-lg font-semibold text-blue-600">- Michael Chen</h4>
                  <p className="text-sm text-gray-500">Data Scientist at Amazon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-white px-6 md:px-0">
          <Contect />
        </section>
      </main>

      <footer className="py-8 bg-black text-white text-center">
        <p>© {new Date().getFullYear()} Proxima AI. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default page