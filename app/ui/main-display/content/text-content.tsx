import React from 'react';

interface TextContentProps {
  data: string;
}

const TextContent: React.FC<TextContentProps> = ({ data }) => {
  return <div className="prose max-w-none">{data}</div>;
};

export default TextContent;
