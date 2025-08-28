import React from 'react';
import { Info } from 'lucide-react';

const DemoNotice: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-sm">
          <p className="text-blue-800 font-medium mb-1">Demo Mode</p>
          <p className="text-blue-700">
            This is a demonstration version. Your data will be stored locally and reset when you refresh the page. 
            To use the full version with persistent data, please set up Supabase configuration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoNotice;