import React from 'react';

export default function Notes() {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Notes</h2>
        <button className="text-sm text-blue-500">+ Add note</button>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button className="text-sm bg-gray-100 py-2 rounded">
          Study guide
        </button>
        <button className="text-sm bg-gray-100 py-2 rounded">
          Briefing doc
        </button>
        <button className="text-sm bg-gray-100 py-2 rounded">FAQ</button>
        <button className="text-sm bg-gray-100 py-2 rounded">Timeline</button>
      </div>
      <div className="text-center text-gray-400 text-sm">
        Saved notes will appear here
      </div>
    </div>
  );
}
