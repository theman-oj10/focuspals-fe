import React from 'react';
import VideoStream from './video-stream';
import AttentionChart from './attention-chart';
import AttentionLevelTracker from './attention-level-display';

export default function StudioPanel() {
  return (
    <div className="w-1/4 border-l bg-white p-4 flex flex-col justify-between">
      <AttentionLevelTracker />
      <AttentionChart />
      <VideoStream />
    </div>
  );
}
