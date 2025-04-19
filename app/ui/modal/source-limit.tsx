'use client';

import { FileText } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SourceLimitProps {
  current: number;
  max: number;
}

export default function SourceLimit({ current, max }: SourceLimitProps) {
  const percentage = (current / max) * 100;

  return (
    <div className="flex items-center gap-3">
      <FileText className="h-5 w-5 text-gray-500" />
      <span className="text-sm text-gray-500">Source limit</span>
      <Progress value={percentage} className="h-2 flex-1 bg-gray-100" />
      <span className="text-sm text-gray-500">
        {current} / {max}
      </span>
    </div>
  );
}
