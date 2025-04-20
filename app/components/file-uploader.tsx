'use client';

import { useState, useRef } from 'react';
import { useFileUpload } from '../hooks/useFileUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, CheckCircle2, Upload, X } from 'lucide-react';

interface FileUploaderProps {
  endpoint?: string;
  additionalData?: Record<string, string | number | boolean>;
  title?: string;
  description?: string;
  autoUpload?: boolean;
  accept?: string;
  maxSize?: number; // in MB
}

export function FileUploader({
  endpoint,
  additionalData,
  title = 'Upload File',
  description = 'Click or drag and drop to upload',
  autoUpload = true,
  accept,
  maxSize = 10, // Default max size 10MB
}: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { 
    file, 
    setFile, 
    uploading,
    error,
    response,
    reset,
    upload,
    progress
  } = useFileUpload({
    endpoint,
    additionalData,
    autoUpload,
    onSuccess: () => {
      // You can add custom success handling here
    },
    onError: () => {
      // You can add custom error handling here
    }
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      setSizeError(`File size exceeds the ${maxSize}MB limit.`);
      return false;
    }
    
    if (accept) {
      const fileType = file.type;
      const acceptTypes = accept.split(',').map(type => type.trim());
      
      // Check if the file type matches any of the accepted types
      const isAccepted = acceptTypes.some(type => {
        if (type.startsWith('.')) {
          // Check file extension
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        } else if (type.includes('/*')) {
          // Check mime type category (e.g., "image/*")
          const category = type.split('/')[0];
          return fileType.startsWith(`${category}/`);
        } else {
          // Check exact mime type
          return fileType === type;
        }
      });
      
      if (!isAccepted) {
        setSizeError('File type not accepted.');
        return false;
      }
    }
    
    setSizeError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFile = e.dataTransfer.files[0];
      if (validateFile(newFile)) {
        setFile(newFile);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];
      if (validateFile(newFile)) {
        setFile(newFile);
      }
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };
  
  const handleRemoveFile = () => {
    reset();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        {!file && (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`
              flex flex-col items-center justify-center h-32 p-4 border-2 border-dashed rounded-md
              ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
              ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
            `}
            onClick={handleButtonClick}
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              Drag & drop or click to select
            </p>
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleChange}
              accept={accept}
              disabled={uploading}
            />
          </div>
        )}

        {sizeError && (
          <div className="mt-2 text-sm text-red-500 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {sizeError}
          </div>
        )}

        {file && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 p-2 bg-gray-100 rounded">
                  <span className="text-xs font-medium uppercase">{file.name.split('.').pop()}</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRemoveFile}
                disabled={uploading}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {uploading && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Uploading...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {response && (
              <div className="mt-2 text-sm text-green-500 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Upload complete
              </div>
            )}

            {error && (
              <div className="mt-2 text-sm text-red-500 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error.message}
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="autoUpload" 
            checked={autoUpload} 
            onCheckedChange={(checked) => {
              // This would require lifting state management to parent component
              // Here we'll simply log it
              console.log('Auto-upload setting changed:', checked);
            }}
          />
          <label 
            htmlFor="autoUpload" 
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Auto-upload
          </label>
        </div>

        {file && !autoUpload && (
          <Button 
            onClick={upload} 
            disabled={uploading || !!response}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 