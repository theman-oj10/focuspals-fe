'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface TextContentProps {
  data: {
    title?: string;
    content: string;
  };
}

export default function TextContent({ data }: TextContentProps) {
  return (
    <div className="w-full h-full max-w-3xl mx-auto p-6 overflow-auto">
      {data.title && <h1 className="text-2xl font-bold mb-6">{data.title}</h1>}

      <div className="prose prose-blue max-w-none">
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </div>
    </div>
  );
}
