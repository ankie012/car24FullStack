"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const WishlistContext = createContext();

// Create a provider component
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error parsing wishlist from localStorage:', error);
        setWishlist([]);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  // Add a car to the wishlist
  const addToWishlist = (car) => {
    setWishlist(prev => {
      // Check if car is already in wishlist
      if (prev.some(item => item._id === car._id)) {
        return prev;
      }
      return [...prev, car];
    });
  };
  
  // Remove a car from the wishlist
  const removeFromWishlist = (carId) => {
    setWishlist(prev => prev.filter(car => car._id !== carId));
  };
  
  // Check if a car is in the wishlist
  const isInWishlist = (carId) => {
    return wishlist.some(car => car._id === carId);
  };
  
  // Clear the entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };
  
  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook to use the wishlist context
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}