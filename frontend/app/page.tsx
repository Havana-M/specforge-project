import {
  SparklesIcon,
  RectangleStackIcon,
  ArrowUpTrayIcon,
  ShieldCheckIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Top Navigation Bar - (This is already compact, so we'll leave it) */}
      <nav className="w-full bg-gray-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <SparklesIcon className="h-6 w-6 text-yellow-400" />
            <span className="text-xl font-bold">SpecForge</span>
          </div>
          <div className="flex space-x-6 items-center">
            <a href="#" className="hover:text-yellow-400">AI Spec Generator</a>
            <a href="#" className="hover:text-yellow-400">Upload Spec</a>
            <a href="#" className="hover:text-yellow-400">Interactive Docs</a>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-full">
              <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
              <span>Chat</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - (Made smaller) */}
      <header className="py-16 text-center px-4"> {/* Reduced padding from py-20 */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4"> {/* Reduced size from 5xl */}
          AI-powered API Specification
          <br /> and Documentation Platform
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8"> {/* Reduced size from xl */}
          Simplify API design and documentation with AI. Generate,
          validate, and document your API specifications effortlessly.
        </p>
      </header>

      {/* Feature Cards Section - (Made smaller) */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl"> {/* Reduced gap and margin */}
        
        {/* Card 1: AI Spec Generator */}
        <div className="bg-white rounded-lg shadow-lg p-5 flex flex-col items-start transition-transform hover:scale-105 border"> {/* Reduced padding */}
          <SparklesIcon className="h-8 w-8 text-blue-500 mb-3" /> {/* Reduced icon size */}
          <h2 className="text-xl font-bold text-gray-800 mb-2">AI Spec Generator</h2> {/* Reduced size from 2xl */}
          <p className="text-gray-600">Generate OpenAPI 3.0 specs from natural language.</p>
        </div>

        {/* Card 2: Rules */}
        <div className="bg-white rounded-lg shadow-lg p-5 flex flex-col items-start transition-transform hover:scale-105 border"> {/* Reduced padding */}
          <ShieldCheckIcon className="h-8 w-8 text-green-500 mb-3" /> {/* Reduced icon size */}
          <h2 className="text-xl font-bold text-gray-800 mb-2">Rules</h2> {/* Reduced size from 2xl */}
          <p className="text-gray-600">Validate your API specs against best practices.</p>
        </div>

        {/* Card 3: Interactive API Docs */}
        <div className="bg-white rounded-lg shadow-lg p-5 flex flex-col items-start transition-transform hover:scale-105 border"> {/* Reduced padding */}
          <RectangleStackIcon className="h-8 w-8 text-purple-500 mb-3" /> {/* Reduced icon size */}
          <h2 className="text-xl font-bold text-gray-800 mb-2">Interactive API Docs</h2> {/* Reduced size from 2xl */}
          <p className="text-gray-600">Generate and explore interactive API documentation.</p>
        </div>

        {/* Card 4: Upload & Validate Spec */}
        <div className="bg-white rounded-lg shadow-lg p-5 flex flex-col items-start transition-transform hover:scale-105 border"> {/* Reduced padding */}
          <ArrowUpTrayIcon className="h-8 w-8 text-orange-500 mb-3" /> {/* Reduced icon size */}
          <h2 className="text-xl font-bold text-gray-800 mb-2">Upload & Validate Spec</h2> {/* Reduced size from 2xl */}
          <p className="text-gray-600">Upload and validate OpenAPI 3.0 specification files.</p>
        </div>
      </section>

      {/* Get Started Button - (Made smaller) */}
      <Link
        href="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full text-lg mb-16 shadow-lg" /* Reduced padding and text size */
      >
        Get Started
      </Link>
    </div>
  );
}