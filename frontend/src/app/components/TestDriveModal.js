// components/TestDriveModal.jsx
"use client";
import React from 'react';

const TestDriveModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-5 relative flex flex-row">
        <div className="w-1/2 hidden md:block">
          <img
            src="/modal-car-bg.jpg" // Use your actual background image here
            alt="Cars"
            className="rounded-lg object-cover h-full"
          />
          <div className="absolute top-5 left-5 text-white text-xl font-bold">A whole new world of Cars</div>
        </div>
        <div className="w-full md:w-1/2 px-4 relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-xl">&times;</button>
          <h2 className="text-lg font-bold mb-2">Log in to</h2>
          <p className="text-sm text-gray-600 mb-4">conveniently book a test drive</p>
          <input
            type="text"
            placeholder="+91- 999 999 9999"
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <div className="flex items-center mb-4">
            <input type="checkbox" checked readOnly className="mr-2" />
            <span className="text-sm">Get instant updates from CARS24 on your <strong>WhatsApp</strong>.</span>
          </div>
          <button className="w-full bg-gray-300 text-white p-3 rounded cursor-not-allowed">GET OTP</button>
          <p className="text-xs text-gray-500 mt-4">
            By logging in, you agree to CARS24's <a href="#" className="text-blue-600">Privacy Policy</a> and <a href="#" className="text-blue-600">Terms & Conditions</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestDriveModal;
