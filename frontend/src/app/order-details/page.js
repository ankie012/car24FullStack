"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header/Header';

const OrderDetailsPage = () => {
  const searchParams = useSearchParams();
  const carId = searchParams.get('carId');
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
    preferredDate: '',
    preferredTime: 'morning',
    additionalNotes: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    
    setIsLoggedIn(loggedIn);
    if (email) {
      setUserEmail(email);
    }
    
    // If not logged in, redirect to login
    if (!loggedIn) {
      window.location.href = '/login';
      return;
    }
    
    // Fetch car details if carId is provided
    if (carId) {
      fetchCarDetails();
    } else {
      setLoading(false);
    }
  }, [carId]);
  
  const fetchCarDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/cars/${carId}/`);
      if (response.ok) {
        const data = await response.json();
        setCarDetails(data);
      } else {
        console.error('Failed to fetch car details');
      }
    } catch (error) {
      console.error('Error fetching car details:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Format the data for the API
      const orderData = {
        user_email: userEmail,
        car_id: carId,
        name: formData.name,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        preferred_date: formData.preferredDate, // This is already in ISO format from the date input
        preferred_time: formData.preferredTime,
        additional_notes: formData.additionalNotes || ''
      };
      
      console.log('Submitting order:', orderData);
      
      // Send data to the backend API
      const response = await fetch('http://localhost:8000/api/test-drive-orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      const responseData = await response.json();
      
      if (response.ok) {
        console.log('Order created successfully:', responseData);
        setOrderPlaced(true);
      } else {
        console.error('Failed to create order:', responseData);
        alert(`Failed to book test drive: ${responseData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-xl">Loading...</div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Test Drive Booking</h1>
        
        {orderPlaced ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="bg-green-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Test Drive Booked Successfully!</h2>
            <p className="text-gray-600 mb-6">
              We've received your test drive request. Our team will contact you shortly to confirm the details.
            </p>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to {userEmail}
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Car Details */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Car Details</h2>
                
                {carDetails ? (
                  <div>
                    <img 
                      src={`/assets/${carDetails.images}`} 
                      alt={`${carDetails.brand} ${carDetails.model}`}
                      className="w-full rounded-md mb-4"
                    />
                    <h3 className="text-lg font-medium">{carDetails.year} {carDetails.brand} {carDetails.model}</h3>
                    <p className="text-gray-600">{carDetails.variant}</p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold">₹{carDetails.price.toLocaleString()} lakh</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Fuel Type:</span>
                        <span>{carDetails.fuel_type}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Transmission:</span>
                        <span>{carDetails.transmission}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span>{carDetails.location || "Mumbai"}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">No car selected or car details not available.</p>
                )}
              </div>
            </div>
            
            {/* Order Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Your Information</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={userEmail}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                        PIN Code
                      </label>
                      <input
                        id="pincode"
                        name="pincode"
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Date
                      </label>
                      <input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Time
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        required
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="morning">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
                        <option value="evening">Evening (3 PM - 6 PM)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      rows="3"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md shadow-sm transition-colors"
                    >
                      Book Test Drive
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;