import React from 'react';

interface TextContentData {
  title?: string;
  content: string;
}

interface TextContentProps {
  data: TextContentData | string;
}

export default function TextContent({
  data,
}: TextContentProps): React.ReactElement {
  // Handle both string and object data formats
  if (typeof data === 'string') {
    return <div className="prose max-w-none">{data}</div>;
  }

  const { title, content } = data;

  return (
    <div className="w-full max-w-3xl mx-auto justify-baseline">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
      <div className="prose max-w-none">{content}</div>
    </div>
  );
}
