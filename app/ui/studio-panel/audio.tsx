import React from 'react';

export default function Audio() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Audio Overview</h2>
      <div className="border p-4 rounded">
        <p className="font-medium">Deep Dive conversation</p>
        <p className="text-sm text-gray-500">Two hosts (English only)</p>
        <div className="mt-3 flex space-x-2">
          <button className="flex-1 py-2 border rounded">Customize</button>
          <button className="flex-1 py-2 bg-gray-200 rounded">Generate</button>
        </div>
      </div>
    </div>
  );
}
