import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';

const sampleAttentionLevels = [45, 50, 65, 70, 75, 82, 78, 85, 90, 87];

// Custom progress bar component with controlled animations and colors
interface CustomProgressProps {
  value: number;
  max: number;
  height?: string;
  className?: string;
}

function CustomProgress({
  value,
  max,
  height = '0.75rem',
  className = '',
}: CustomProgressProps) {
  const percentage = (value / max) * 100;

  // Determine color based on attention level
  const getProgressColor = (level: number) => {
    if (level < 30) return '#ef4444'; // red-500
    if (level < 70) return '#eab308'; // yellow-500
    return '#22c55e'; // green-500
  };

  return (
    <div
      className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}
      style={{ height }}
    >
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{
          width: `${percentage}%`,
          backgroundColor: getProgressColor(value),
        }}
      />
    </div>
  );
}

export default function AttentionLevelTracker() {
  const [attentionLevel, setAttentionLevel] = useState(75);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // TODO: Change to Websocket
    const interval = setInterval(() => {
      setIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % sampleAttentionLevels.length;
        setAttentionLevel(sampleAttentionLevels[newIndex]);
        return newIndex;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Get label based on attention level
  const getAttentionLabel = (level: number) => {
    if (level < 30) return 'Take a break!';
    if (level < 70) return 'We can do better';
    if (level < 90) return 'LOCKED IN';
    return 'LFG';
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <Brain className="h-4 w-4" /> Current Attention Level
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{attentionLevel}%</div>
            <div
              className="text-sm font-medium"
              style={{
                color:
                  attentionLevel < 30
                    ? '#ef4444'
                    : attentionLevel < 70
                    ? '#eab308'
                    : '#22c55e',
              }}
            >
              {getAttentionLabel(attentionLevel)}
            </div>
          </div>

          <CustomProgress value={attentionLevel} max={100} height="0.75rem" />

          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
