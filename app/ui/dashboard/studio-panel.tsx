import React from 'react';
import Audio from './audio';
import Notes from './notes';
import VideoStream from '@/lib/video-stream';

export default function StudioPanel() {
    return (
        <div className="w-1/4 border-l bg-white p-4 flex flex-col justify-between">
            {/* Audio Overview */}
            <Audio />

            {/* Notes Section */}
            <Notes />

            <VideoStream />
        </div>
    );
}