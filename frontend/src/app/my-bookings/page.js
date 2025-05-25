"use client";
import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import { useRouter } from 'next/navigation';

const MyBookingsPage = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

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
      router.push('/login');
      return;
    }
    
    // Fetch user's bookings
    fetchBookings(email);
  }, [router]);
  
  const fetchBookings = async (email) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/test-drive-orders/?user_email=${email}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load your bookings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString; // Return the original string if parsing fails
    }
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTimeSlot = (timeSlot) => {
    switch (timeSlot) {
      case 'morning':
        return 'Morning (9 AM - 12 PM)';
      case 'afternoon':
        return 'Afternoon (12 PM - 3 PM)';
      case 'evening':
        return 'Evening (3 PM - 6 PM)';
      default:
        return timeSlot;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Test Drive Bookings</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-lg text-gray-600 mb-4">You don't have any test drive bookings yet.</p>
            <button 
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Cars
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {booking.car && (
                  <div className="relative">
                    <img 
                      src={`/assets/${booking.car.images}`} 
                      alt={`${booking.car.brand} ${booking.car.model}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {booking.car ? `${booking.car.year} ${booking.car.brand} ${booking.car.model}` : 'Car Details Not Available'}
                  </h2>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Booking Date:</span> {formatDate(booking.created_at)}</p>
                    <p><span className="font-medium">Test Drive Date:</span> {formatDate(booking.preferred_date)}</p>
                    <p><span className="font-medium">Time Slot:</span> {getTimeSlot(booking.preferred_time)}</p>
                    <p><span className="font-medium">Location:</span> {booking.city}</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button 
                      onClick={() => router.push(`/order-details?orderId=${booking._id}`)}
                      className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;