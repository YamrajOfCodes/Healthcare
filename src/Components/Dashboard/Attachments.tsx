"use client";
import React, { useState } from 'react';
import { Upload, File, X, Download } from 'lucide-react';

interface AttachmentFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  url: string;
}

const Attachments = () => {
  const [files, setFiles] = useState<AttachmentFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const filePromises = newFiles.map(file => {
      return new Promise<AttachmentFile>((resolve) => {
        // Here you would typically upload to your server
        // For now, we'll create a temporary URL
        const fileObj: AttachmentFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          size: formatFileSize(file.size),
          uploadDate: new Date().toLocaleDateString(),
          url: URL.createObjectURL(file)
        };
        resolve(fileObj);
      });
    });

    Promise.all(filePromises).then(newFileObjects => {
      setFiles(prev => [...prev, ...newFileObjects]);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-black" />
        <h3 className="text-lg text-black font-semibold mb-2">Drag and drop files here</h3>
        <p className="text-black mb-4">or</p>
        <label className="cursor-pointer">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Browse Files
          </span>
          <input
            type="file"
            className="hidden"
            multiple
            onChange={handleFileInput}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
        </label>
        <p className="text-sm text-black mt-2">
          Supported files: PDF, JPG, PNG, DOC
        </p>
      </div>

      {/* File List */}
      <div className="space-y-4">
        {files.map(file => (
          <div key={file.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <File className="h-8 w-8 text-black" />
              <div>
                <p className="font-medium text-black">{file.name}</p>
                <p className="text-sm text-black">
                  {file.size} • {file.uploadDate}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.open(file.url)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                title="Download"
              >
                <Download className="h-5 w-5 text-black" />
              </button>
              <button
                onClick={() => removeFile(file.id)}
                className="p-2 hover:bg-red-100 rounded-full transition-colors"
                title="Remove"
              >
                <X className="h-5 w-5 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attachments; 