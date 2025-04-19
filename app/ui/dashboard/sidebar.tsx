"use client";

import React, { useState } from "react";
import { FileText } from "lucide-react";

interface SidebarProps {
    onAddClick?: () => void;
    uploadedFiles?: File[];
}

export default function Sidebar({ onAddClick, uploadedFiles = [] }: SidebarProps) {
    const [checkedFiles, setCheckedFiles] = useState<{[key: string]: boolean}>({});
    
    const toggleFileCheck = (fileId: string) => {
        setCheckedFiles(prev => ({
            ...prev,
            [fileId]: !prev[fileId]
        }));
    };

    return (
        <div className="w-1/5 p-4 border-r bg-white flex flex-col h-full">
            <h1 className="text-xl font-semibold mb-4">Sources</h1>
            <div className="space-y-2">
                <button 
                    className="w-full py-2 px-3 bg-gray-100 rounded"
                    onClick={onAddClick}
                >+ Add</button>
                <button className="w-full py-2 px-3 bg-gray-100 rounded">Discover</button>
            </div>

            {uploadedFiles.length > 0 ? (
                <div className="mt-6 flex-1 overflow-auto">
                    <h2 className="text-md font-medium mb-2">Upload Log</h2>
                    <div className="space-y-2">
                        {uploadedFiles.map((file, index) => {
                            // Use the file name + index as a unique identifier
                            const fileId = `${file.name}-${index}`;
                            
                            // Initialize as checked if not already in state
                            if (checkedFiles[fileId] === undefined) {
                                checkedFiles[fileId] = true;
                            }
                            
                            return (
                                <div 
                                    key={index} 
                                    className="p-3 bg-gray-50 rounded border border-gray-100 flex items-center justify-between"
                                >
                                    <div className="flex items-center flex-1 overflow-hidden mr-2">
                                        <FileText className="h-4 w-4 mr-2 text-blue-500" />
                                        <p className="text-sm font-medium truncate">{file.name}</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={checkedFiles[fileId]}
                                        onChange={() => toggleFileCheck(fileId)}
                                        className="h-4 w-4 accent-blue-500 cursor-pointer"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="mt-10 text-center text-gray-400 text-sm flex-1">
                    <p>Saved sources will appear here</p>
                    <p className="mt-2">Add PDFs, websites, text, videos, or audio files</p>
                </div>
            )}
        </div>
    );
}