"use client"

import { X, Upload, FileText, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect } from "react"

export default function AddSourcesModal({ onClose }: { onClose?: () => void }) {
  // Add event listener for Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    };

    // Add event listener
    document.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs">
                <span className="bg-green-500 text-white text-[10px] px-1 rounded">Plus</span>
              </div>
              <span className="font-medium">NotebookLM</span>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
              <X size={20} />
            </button>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold mb-4">Add sources</h2>

          {/* Discover sources button */}
          <div className="flex justify-end mb-4">
            <Button variant="outline" className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Discover sources
            </Button>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 mb-1">
              Sources let NotebookLM base its responses on the information that matters most to you.
            </p>
            <p className="text-gray-500 text-sm">
              (Examples: marketing plans, course reading, research notes, meeting transcripts, sales documents, etc.)
            </p>
          </div>

          {/* Upload area */}
          <Card className="border border-dashed border-gray-300 bg-gray-50 rounded-lg p-12 mb-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Upload className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Upload sources</h3>
              <p className="text-gray-600 mb-1">
                Drag & drop or <span className="text-blue-500 cursor-pointer">choose file</span> to upload
              </p>
              <p className="text-gray-500 text-sm">Supported file types: PDF, txt, Markdown, Audio (e.g. mp3)</p>
            </div>
          </Card>

          {/* Source options */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Google Drive */}
            <Card className="bg-gray-50 border-gray-200 p-4">
              <div className="flex flex-col items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 14L4 6H20L12 14Z" fill="#4285F4" />
                  <path d="M4 6V18L8 14L4 6Z" fill="#34A853" />
                  <path d="M20 6L16 14L20 18V6Z" fill="#FBBC05" />
                  <path d="M8 14L12 18L16 14L12 14H8Z" fill="#EA4335" />
                </svg>
                <span className="text-sm">Google Drive</span>
              </div>
            </Card>

            {/* Google Docs */}
            <Card className="bg-gray-50 border-gray-200 p-4">
              <div className="flex flex-col items-center gap-2">
                <FileText className="h-6 w-6 text-blue-500" />
                <span className="text-sm">Google Docs</span>
              </div>
            </Card>

            {/* Google Slides */}
            <Card className="bg-gray-50 border-gray-200 p-4">
              <div className="flex flex-col items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="4" width="16" height="16" rx="2" fill="#FBBC05" />
                  <rect x="8" y="8" width="8" height="8" fill="white" />
                </svg>
                <span className="text-sm">Google Slides</span>
              </div>
            </Card>

            {/* Link */}
            <Card className="bg-gray-50 border-gray-200 p-4">
              <div className="flex flex-col items-center gap-2">
                <LinkIcon className="h-6 w-6 text-blue-500" />
                <span className="text-sm">Link</span>
              </div>
            </Card>

            {/* Website */}
            <Card className="bg-gray-50 border-gray-200 p-4">
              <div className="flex flex-col items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" stroke="black" strokeWidth="2" />
                  <path d="M12 4C14.5 7 15 9.5 15 12C15 14.5 14.5 17 12 20" stroke="black" strokeWidth="2" />
                  <path d="M12 4C9.5 7 9 9.5 9 12C9 14.5 9.5 17 12 20" stroke="black" strokeWidth="2" />
                  <path d="M4 12H20" stroke="black" strokeWidth="2" />
                </svg>
                <span className="text-sm">Website</span>
              </div>
            </Card>

            {/* YouTube */}
            <Card className="bg-gray-50 border-gray-200 p-4">
              <div className="flex flex-col items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.5 6.5C22.3 5.9 22 5.4 21.6 5C21.2 4.6 20.7 4.3 20.1 4.1C18.4 3.5 12 3.5 12 3.5C12 3.5 5.6 3.5 3.9 4.1C3.3 4.3 2.8 4.6 2.4 5C2 5.4 1.7 5.9 1.5 6.5C0.9 8.2 0.9 12 0.9 12C0.9 12 0.9 15.8 1.5 17.5C1.7 18.1 2 18.6 2.4 19C2.8 19.4 3.3 19.7 3.9 19.9C5.6 20.5 12 20.5 12 20.5C12 20.5 18.4 20.5 20.1 19.9C20.7 19.7 21.2 19.4 21.6 19C22 18.6 22.3 18.1 22.5 17.5C23.1 15.8 23.1 12 23.1 12C23.1 12 23.1 8.2 22.5 6.5Z"
                    fill="#FF0000"
                  />
                  <path d="M9.75 15.5L15.75 12L9.75 8.5V15.5Z" fill="white" />
                </svg>
                <span className="text-sm">YouTube</span>
              </div>
            </Card>

            {/* Paste text */}
            <Card className="bg-gray-50 border-gray-200 p-4">
              <div className="flex flex-col items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <rect x="8" y="2" width="8" height="4" rx="1" stroke="black" strokeWidth="2" />
                  <path d="M8 10H16" stroke="black" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 14H16" stroke="black" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-sm">Paste text</span>
              </div>
            </Card>

            {/* Copied text */}
            <Card className="bg-gray-50 border-gray-200 p-4">
              <div className="flex flex-col items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16C17.1046 21 18 20.1046 18 19V18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 3H9C7.89543 3 7 3.89543 7 5V15C7 16.1046 7.89543 17 9 17H19C20.1046 17 21 16.1046 21 15V9M15 3L21 9M15 3V9H21"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm">Copied text</span>
              </div>
            </Card>
          </div>

          {/* Source limit */}
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-500">Source limit</span>
            <Progress value={0} className="h-2 flex-1 bg-gray-100" />
            <span className="text-sm text-gray-500">0 / 300</span>
          </div>
        </div>
      </div>
    </div>
  )
}
