"use client";
import { useState } from "react";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import Login from './Login';

const Header = () => {
  const [location, setLocation] = useState("Mumbai");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false); 
  const countries = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];

  return ( 
    <header className="flex items-center justify-between px-6 py-3 shadow-md bg-white relative">
      {/* Left - Logo */}
      <div className="flex items-center space-x-4">
        <img
          src="https://media.cars24.com/cars24/seo/static/1_20230830_1693395013.png"
          alt="CARS24"
          className="h-8"
        />

        {/* Location Dropdown */}
        <div className="relative">
          <div
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="text-lg font-medium">{location}</span> 
            <IoMdArrowDropdown size={18} />  
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <ul
              className="absolute left-0 mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-200"
              onMouseLeave={() => setShowDropdown(false)} // Ensures it doesn't close until mouse leaves dropdown
            >
              {countries.map((city, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setLocation(city);
                    setShowDropdown(false); // Close dropdown after selection
                  }}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Center - Navigation */}
      <nav className="flex space-x-6 text-gray-700">
        <div className="flex items-center space-x-1 cursor-pointer text-orange-500">
          <span>Buy used car</span>
          <IoMdArrowDropdown size={16} />
        </div> 
        <div className="flex items-center space-x-1 cursor-pointer">
          <span>Sell car</span>
          <IoMdArrowDropdown size={16} />
        </div>
        <div className="flex items-center space-x-1 cursor-pointer">
          <span>Car finance</span>
          <IoMdArrowDropdown size={16} />
        </div>
        <div className="flex items-center space-x-1 cursor-pointer">
          <span>New cars</span>
          <IoMdArrowDropdown size={16} />
        </div>
        <div className="flex items-center space-x-1 cursor-pointer">
          <span>Car services</span>
          <IoMdArrowDropdown size={16} />
        </div>
      </nav>

      {/* Right - Icons & Account */}
      <div className="flex items-center space-x-4">
        <FaHeart size={20} className="text-gray-600 cursor-pointer" />

        <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => setShowLogin(true)}
      >
        <FaUserCircle size={24} className="text-gray-600" />
        <span>Hello, Ankit</span>
        <IoMdArrowDropdown size={16} />
      </div>

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button 
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <Login />  
          </div>
        </div>
      )}

      </div>
    </header> 
  );
};

export default Header;
