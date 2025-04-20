import React, { useState } from 'react';
import VideoStream from './video-stream';
import AttentionChart from './attention-chart';
import AttentionLevelTracker from './attention-level-display';
import GamificationPanel from '../gamification/gamification-panel';
import SessionTimer from './session-timer';
import { Activity, Trophy } from 'lucide-react';

export interface StudioPanelProps {
  onAttentionChange?: (attentionData: {
    attentionLevel: number;
    shouldSwitchContent: boolean;
  }) => void;
  isContentLoaded?: boolean;
  currentContentType?: string;
}

export default function StudioPanel({onAttentionChange,
  isContentLoaded,
  currentContentType,
}: StudioPanelProps) {
  const [activeTab, setActiveTab] = useState('focus'); // 'focus' or 'gamification'

  return (
    <div className={`w-96 bg-white shadow-md overflow-y-auto flex flex-col h-full ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <h2 className="font-bold text-2xl">Studio</h2>
      </div>
      
      {/* Session Timer - Always visible at the top */}
      <div className="px-6 pt-6">
        <SessionTimer />
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 px-2 mt-4">
        <button
          className={`flex-1 py-4 px-2 font-medium text-sm flex items-center justify-center transition-all ${
            activeTab === 'focus' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('focus')}
        >
          <Activity className={`mr-2 h-4 w-4 ${activeTab === 'focus' ? 'text-blue-600' : 'text-gray-500'}`} />
          Focus Metrics
        </button>
        <button
          className={`flex-1 py-4 px-2 font-medium text-sm flex items-center justify-center transition-all ${
            activeTab === 'gamification' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('gamification')}
        >
          <Trophy className={`mr-2 h-4 w-4 ${activeTab === 'gamification' ? 'text-blue-600' : 'text-gray-500'}`} />
          Achievements
        </button>
      </div>
      
      {/* Tab content */}
      <div className="flex-grow overflow-y-auto p-6">
        {activeTab === 'focus' && (
          <div className="flex flex-col h-full space-y-6">
            <AttentionLevelTracker
            onAttentionChange={onAttentionChange}
            isContentLoaded={isContentLoaded}
            currentContentType={currentContentType}
          />
          <AttentionChart />
          <VideoStream />
          </div>
        )}
        
        {activeTab === 'gamification' && (
          <GamificationPanel />
        )}
      </div>
    </div>
  );
}
