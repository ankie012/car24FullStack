"use client";
import { useState } from "react";
import { FaExternalLinkAlt, FaChevronDown, FaFileAlt, FaExchangeAlt, FaQuestionCircle,FaBell,FaUserCircle, FaHeart, FaCalendarAlt, FaShoppingCart, FaBookmark } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiLoginBoxLine } from "react-icons/ri";
// import { FaBell } from "react-icons/fa";

const Header = () => {
  const [location, setLocation] = useState("Mumbai");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
   
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
          className="relative"
          onMouseEnter={() => setShowUserDropdown(true)}
          onMouseLeave={() => setShowUserDropdown(false)} 
        >
          <div className="flex items-center space-x-2 cursor-pointer">
            <FaUserCircle size={24} className="text-gray-600" />
            <span>Hello & Sign in</span> 
            <IoMdArrowDropdown size={16} />
          </div>
          
          {/* User Dropdown Menu */}
          
            <div className={`absolute right-0 mt-7 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50 transition-all duration-200 ease-in-out ${
                showUserDropdown ? "opacity-100 visible" : "opacity-0 invisible"
              }`}> 
              {/* Login/Signin Button */}
              <div className="p-3 ">
                <button className="w-full h-12 py-2 bg-orange-500 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-orange-600 transition-colors">
                  <RiLoginBoxLine size={18} />
                  <span>Login / Sign In</span>
                </button> 
              </div>

             <div className="py-2 px-4 m-4 rounded-lg bg-gray-50">
              {/* My Appointments Row */}
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-gray-600" />
                  <span className="text-gray-800">My Appointments</span>
                </div>
                <button className="h-5 px-3 py-1 bg-blue-500 flex items-center justify-between text-white rounded-md text-sm hover:bg-orange-200 transition-colors">
                  Sell
                </button>
              </div>

              {/* My Bookings Row */}
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaBookmark className="text-gray-600" />
                  <span className="text-gray-800">My Bookings</span>
                </div>
                <button className="h-5 px-3 py-1 bg-blue-500 flex items-center justify-between text-white rounded-md text-sm hover:bg-orange-200 transition-colors">
                  Buy
                </button>
              </div>

              {/* My Orders Row */}
              <div className="p-3 border-b border-gray-200 flex items-center space-x-2">
                <FaShoppingCart className="text-gray-600" />
                <span className="text-gray-800">My Orders</span>
              </div>
              {/* Communications preference row */}  
              <div className="p-3  flex items-center space-x-2 ">
                <FaBell className="text-gray-600" /> 
                <span className="text-gray-800">Communicatons preference</span>
              </div>

             </div> 

             {/* Additional Menu Items */}
            <div className="py-2 px-4 m-4 rounded-lg ">
              {/* Resources with dropdown icon */}
              <div className="p-3 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded-md">
                <div className="flex items-center space-x-2">
                  <FaExternalLinkAlt className="text-gray-600" />
                  <span className="text-gray-800">Resources</span>
                </div>
                <FaChevronDown className="text-gray-500" />
              </div>

              {/* RC Transfer Status */}
              <div className="p-3 border-b border-gray-200 flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-md">
                <FaFileAlt className="text-gray-600" />
                <span className="text-gray-800">RC Transfer Status</span>
              </div>

              {/* Become Our Partner */}
              <div className="p-3 border-b border-gray-200 flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-md">
                <FaExchangeAlt className="text-gray-600" />
                <span className="text-gray-800">Become Our Partner</span>
              </div>

              {/* FAQ */}
              <div className="p-3 flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-md">
                <FaQuestionCircle className="text-gray-600" />
                <span className="text-gray-800">FAQ</span>
              </div>
            </div>

            </div> 
          
        </div>
      </div>
    </header> 
  );
};

export default Header;
