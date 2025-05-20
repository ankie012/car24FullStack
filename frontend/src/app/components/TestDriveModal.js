// components/TestDriveModal.jsx
"use client";
import React, { useState, useEffect, useCallback } from 'react';

const TestDriveModal = ({ isOpen, onClose }) => { 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [error, setError] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  // Define resetForm using useCallback to avoid recreation on each render
  const resetForm = useCallback(() => {
    setPhoneNumber(''); 
    setOtp('');
    setOtpSent(false);
    setVerified(false);
    setError('');
    setGeneratedOtp('');
  }, []);  

  // Reset the form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  // Early return if modal is not open
  if (!isOpen) return null;

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and format as needed
    const formattedValue = value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(formattedValue);
    setError('');
  };  
  
  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    const formattedValue = value.replace(/\D/g, '').slice(0, 6);
    setOtp(formattedValue);
    setError('');
  };

  const sendOtp = () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return; 
    }

    setLoading(true);
    
    // Generate a random 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setGeneratedOtp(newOtp);
      setOtpSent(true);
      setLoading(false); 
      // You can also show this in the UI for demo purposes
      alert(`Your OTP is: ${newOtp} (This alert is only for testing purposes)`);
    }, 1500);
  };

  const verifyOtp = () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    
    // Verify OTP - in a real app, this would be done on the server
    setTimeout(() => {
      // For demo purposes, we'll check against our generated OTP
      // In production, this verification would happen on the server
      if (otp === generatedOtp || otp === '123456') { // Allow 123456 as a fallback test OTP
        setVerified(true);
        setError('');
      } else {
        setError('Invalid OTP. Please try again.');
      }
      setLoading(false);
    }, 1500);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[60%] p-5 relative flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src="/test_drive_book_img.png"
            alt="Cars" 
            className="rounded-lg object-cover h-full"
          /> 
        </div>  
        <div className="w-full md:w-1/2 px-4 relative">
          <button onClick={handleClose} className="absolute top-2 right-2 text-xl">&times;</button>
          
          {verified ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="bg-green-100 rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div> 
              <h2 className="text-xl font-bold mb-2 text-center">Test Drive Booked Successfully!</h2>
              <p className="text-sm text-gray-600 mb-6 text-center">
                We've sent a confirmation to your phone number. Our representative will contact you shortly.
              </p>
              <button 
                onClick={handleClose}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition-colors"
              >
                Close
              </button> 
            </div>
          ) : (
            <>
              <h2 className="text-lg font-bold mb-2">Log in to</h2>
              <p className="text-sm text-gray-600 mb-4">conveniently book a test drive</p>
              
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              
              {!otpSent ? (
                <>
                  <div className="relative"> 
                    <span className="absolute left-3 top-2.5 text-gray-500">+91</span>
                    <input
                      type="text"
                      value={phoneNumber} 
                      onChange={handlePhoneChange}
                      placeholder="Enter 10-digit number"
                      className="w-full border border-gray-300 rounded p-2 pl-12 mb-4" 
                    /> 
                  </div>
                  <div className="flex items-center mb-4">
                    <input 
                      type="checkbox" 
                      checked={whatsappUpdates} 
                      onChange={() => setWhatsappUpdates(!whatsappUpdates)} 
                      className="mr-2" 
                    />
                    <span className="text-sm">Get instant updates from CARS24 on your <strong>WhatsApp</strong>.</span>
                  </div>
                  <button 
                    onClick={sendOtp} 
                    disabled={loading || phoneNumber.length !== 10}
                    className={`w-full p-3 rounded ${
                      loading || phoneNumber.length !== 10 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white transition-colors'
                    }`}
                  >
                    {loading ? 'Sending...' : 'GET OTP'}
                  </button> 
                </>
              ) : (
                <>
                  <p className="text-sm mb-2">OTP sent to +91-{phoneNumber}</p>
                  <input
                    type="text"
                    value={otp}
                    onChange={handleOtpChange}
                    placeholder="Enter 6-digit OTP"
                    className="w-full border border-gray-300 rounded p-2 mb-4"
                  />
                  <div className="flex justify-between mb-4">
                    <button 
                      onClick={() => setOtpSent(false)}
                      className="text-blue-600 text-sm"
                    >
                      Change Number
                    </button>
                    <button 
                      onClick={sendOtp}
                      className="text-blue-600 text-sm" 
                    >
                      Resend OTP
                    </button> 
                  </div>
                  <button 
                    onClick={verifyOtp}
                    disabled={loading || otp.length !== 6}
                    className={`w-full p-3 rounded ${
                      loading || otp.length !== 6 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white transition-colors'
                    }`}
                  >
                    {loading ? 'Verifying...' : 'VERIFY & BOOK TEST DRIVE'}
                  </button>
                </>
              )}
              
              <p className="text-xs text-gray-500 mt-4">
                By logging in, you agree to CARS24's <a href="#" className="text-blue-600">Privacy Policy</a> and <a href="#" className="text-blue-600">Terms & Conditions</a>.
              </p>
            </>
          )} 
        </div>
      </div>
    </div>
  );
};

export default TestDriveModal;
