// This file is frontend/app/docs/page.tsx
"use client"; 

import { useSpec } from '../../context/SpecContext'; // <-- NEW: Import shared memory
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css"; 

export default function DocsPage() {
  // NEW: Get the 'spec' object from our shared memory
  const { spec } = useSpec();

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold text-white mb-8">
        Interactive API Docs
      </h1>

      <div className="bg-white rounded-lg p-4">
        {/* NEW: We now check if a spec exists.
          If it does, we pass the 'spec' object to SwaggerUI.
          If not, we show a placeholder.
        */}
        {spec ? (
          <SwaggerUI spec={spec} />
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p className="text-xl font-semibold">No Specification Loaded</p>
            <p>Please go to the "AI Generator" or "Upload Spec" page to load an API spec first.</p>
          </div>
        )}
      </div>
    </div>
  );
}