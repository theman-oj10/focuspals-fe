"use client"

import { useEffect } from "react"
import ModalHeader from "@/app/ui/modal/modal-header"
import DiscoverSourcesButton from "@/app/ui/modal/discover-sources-button"
import UploadArea from "@/app/ui/modal/upload-area"
import SourceOptions from "@/app/ui/modal/source-options"
import SourceLimit from "@/app/ui/modal/source-limit"

interface AddSourcesModalProps {
  onClose?: () => void;
  onFilesUploaded?: (files: File[]) => void;
}

export default function AddSourcesModal({ onClose, onFilesUploaded }: AddSourcesModalProps) {
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

  // Handle file selection from UploadArea
  const handleFilesSelected = (files: File[]) => {
    console.log("Files selected in parent:", files);
    // Here you would handle the files, perhaps upload them to a server
    if (onFilesUploaded) {
      onFilesUploaded(files);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="p-6">
          {/* Modal Header */}
          <ModalHeader title="Upload sources" onClose={onClose} />

          {/* Discover sources button */}
          <DiscoverSourcesButton />

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 mb-1">
              Upload learning materials that you wish to absorb!
            </p>
            <p className="text-gray-500 text-sm">
              (Examples: course reading, research notes, meeting transcripts, sales documents, etc.)
            </p>
          </div>

          {/* Upload Area */}
          <UploadArea 
            onFilesSelected={handleFilesSelected} 
            onUploadComplete={onClose}
          />

          {/* Source Options */}
          <SourceOptions />

          {/* Source Limit */}
          <SourceLimit current={0} max={300} />
        </div>
      </div>
    </div>
  )
}
