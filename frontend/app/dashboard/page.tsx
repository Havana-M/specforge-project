// This file is frontend/app/dashboard/page.tsx
"use client"; 

import { useState } from 'react';
import { useSpec } from '../../context/SpecContext'; // <-- NEW: Import shared memory
import yaml from 'js-yaml'; // <-- NEW: Import YAML parser

export default function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("# Your generated spec will appear here...");
  const { setSpec } = useSpec(); // <-- NEW: Get the setSpec function

  const handleGenerate = async () => {
    console.log("Button clicked! Sending prompt:", prompt);
    setOutput("Generating... please wait."); 
    setSpec(null); // Clear any old spec

    try {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      console.log("Received AI response string");
      
      // The AI sends back a YAML string. We need to
      // 1. Display it in the text box
      // 2. Parse it into an object for Swagger UI
      // 3. Save that object to our shared memory

      const aiResponseString = data.ai_response;
      setOutput(aiResponseString); // 1. Display it

      // 2. Parse it
      const parsedSpec = yaml.load(aiResponseString); 
      
      // 3. Save it to shared memory
      setSpec(parsedSpec); // <-- NEW: Save to shared state
      console.log("Spec saved to global context.");

    } catch (error) {
      console.error('Error fetching data:', error);
      const errorMessage = (error as Error).message;
      setOutput("# Error: Could not generate spec.\n" + errorMessage);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4">
        AI Spec Generator
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Describe your API in plain English, and the AI will craft a production-ready OpenAPI specification for you.
      </p>

      <div className="space-y-6">
        <textarea
          className="w-full h-48 p-4 rounded-xl bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 'A to-do list API with endpoints for adding, deleting, and updating tasks.'"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>

        <button
          className="w-full py-3 rounded-xl text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all"
          onClick={handleGenerate}
        >
          Generate Specification
        </button>

        <div className="w-full h-96 p-4 rounded-xl bg-gray-900 text-gray-200 font-mono overflow-y-auto border border-gray-700">
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}