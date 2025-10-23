// This file is frontend/app/rules/page.tsx
"use client"; // This page will be interactive later

export default function RulesPage() {
  
  // A placeholder list of rules
  const rules = [
    { name: 'info-contact', description: 'API info should have a contact email.' },
    { name: 'no-http-verbs-in-path', description: 'Path segments should not contain HTTP verbs (e.g., /getUsers).' },
    { name: 'path-must-be-lowercase', description: 'All path segments should be lowercase.' },
    { name: 'operation-id-required', description: 'All operations must have an operationId.' },
    { name: 'no-trailing-slashes', description: 'API paths should not have trailing slashes.' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-4">
        API Linter & Rules
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        This page will check your uploaded OpenAPI spec against a set of industry best practices and rules.
      </p>

      {/* Placeholder button */}
      <button
        className="w-full py-3 rounded-xl text-lg font-semibold text-white bg-gray-700 cursor-not-allowed mb-8"
        disabled
      >
        Run Linter on Uploaded Spec (Coming Soon)
      </button>

      {/* List of Enabled Rules */}
      <h2 className="text-2xl font-semibold text-white mb-4">Enabled Rules</h2>
      <div className="space-y-4">
        {rules.map((rule) => (
          <div 
            key={rule.name}
            className="p-4 rounded-xl bg-gray-900 border border-gray-700"
          >
            <h3 className="text-lg font-mono text-blue-400">{rule.name}</h3>
            <p className="text-gray-300">{rule.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}