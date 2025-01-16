"use client"

import React from 'react';
import { Trash2, AlertCircle } from 'lucide-react';

const DeleteConfirmationPopup = ({ isOpen, onClose, onConfirm, itemName = "patient" }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute -top-1/2 inset-0   bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full animate-in fade-in duration-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Confirm Deletion
            </h3>
          </div>

          {/* Content */}
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this {itemName}? This action cannot be undone.
          </p>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <Trash2 className="w-12 h-12 text-red-500 opacity-80" />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;