// This file is frontend/app/upload/page.tsx
"use client";

import { useState } from 'react';
import { useSpec } from '../../context/SpecContext'; // <-- NEW: Import shared memory
import yaml from 'js-yaml'; // <-- NEW: Import YAML parser

type ValidationResult = {
  status: 'success' | 'error' | 'idle';
  message: string;
};

export default function UploadPage() {
  const [fileContent, setFileContent] = useState("# Your uploaded spec will appear here...");
  const [fileName, setFileName] = useState("No file selected");
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    status: 'idle',
    message: '',
  });
  const { setSpec } = useSpec(); // <-- NEW: Get the setSpec function

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setFileName(file.name);
      setValidationResult({ status: 'idle', message: 'Reading file...' });
      setSpec(null); // Clear any old spec

      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        setFileContent(text);
        
        // --- NEW: Parse the file and save to global state ---
        try {
          const parsedSpec = yaml.load(text); // Try to parse as YAML (or JSON)
          setSpec(parsedSpec); // <-- NEW: Save to shared state
          console.log("Uploaded spec saved to global context.");
        } catch (error) {
          console.error("Error parsing file:", error);
          setValidationResult({ status: 'error', message: 'File is not valid YAML or JSON.' });
          return; // Stop if parsing fails
        }
        // --------------------------------------------------
        
        // Now, call the /lint endpoint (this code is the same as before)
        try {
          const response = await fetch('http://localhost:8000/lint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spec_string: text }),
          });

          if (!response.ok) throw new Error('Network response was not ok');

          const data = await response.json();

          if (data.error) {
            setValidationResult({ status: 'error', message: data.error });
          } else {
            setValidationResult({ status: data.status, message: data.message });
          }

        } catch (error) {
          console.error('Error linting file:', error);
          setValidationResult({
            status: 'error',
            message: `Failed to connect to linter: ${(error as Error).message}`,
          });
        }
      };
      
      reader.readAsText(file);
    } else {
      setFileName("No file selected");
      setFileContent("# Your uploaded spec will appear here...");
      setValidationResult({ status: 'idle', message: '' });
      setSpec(null); // Clear spec if no file
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4">
        Upload & Validate Spec
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Upload your OpenAPI (YAML or JSON) file. It will be validated and saved for the 'API Docs' page.
      </p>

      <div className="space-y-6">
        {/* File Input */}
        <div className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700">
          <label 
            htmlFor="file-upload" 
            className="flex items-center justify-center px-4 py-6 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-800 transition-all"
          >
            <span className="text-gray-400">{fileName}</span>
            <input 
              id="file-upload" 
              name="file-upload" 
              type="file" 
              className="sr-only"
              onChange={handleFileChange}
              accept=".yaml,.yml,.json,.txt"
            />
          </label>
        </div>

        {/* Validation Status Box */}
        {validationResult.status !== 'idle' && (
          <div
            className={`
              w-full p-4 rounded-xl border
              ${validationResult.status === 'success' ? 'bg-green-900 border-green-700 text-green-200' : ''}
              ${validationResult.status === 'error' ? 'bg-red-900 border-red-700 text-red-200' : ''}
            `}
          >
            <p className="font-bold text-lg">
              {validationResult.status === 'success' ? 'Validation Passed!' : 'Validation Failed'}
            </p>
            <p className="font-mono text-sm">{validationResult.message}</p>
          </div>
        )}

        {/* Output Area */}
        <div className="w-full h-96 p-4 rounded-xl bg-gray-900 text-gray-200 font-mono overflow-y-auto border border-gray-700">
          <pre>{fileContent}</pre>
        </div>
      </div>
    </div>
  );
}