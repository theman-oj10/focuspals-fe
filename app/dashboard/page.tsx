import React from 'react';
import Sidebar from './(components)/sidebar';
import Chat from './(components)/chat';
import StudioPanel from './(components)/studio-panel';

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Left Sidebar */}
            <Sidebar />
            {/* Main Content Area */}
            <Chat />

            {/* Right Studio Panel */}
            <StudioPanel />
        </div>
    );
}
