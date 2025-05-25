"use client";
import { useState, useEffect } from "react";
import { FaExternalLinkAlt, FaChevronDown, FaFileAlt, FaExchangeAlt, FaQuestionCircle, FaBell, FaUserCircle, FaHeart, FaCalendarAlt, FaShoppingCart, FaBookmark, FaSignOutAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiLoginBoxLine } from "react-icons/ri";
import LocationDropdown from "./LocationDropdown";
import { useWishlist } from "../../context/WishlistContext";
import { useRouter } from "next/navigation";  

const Header = () => {
  const router = useRouter();
  const { wishlist } = useWishlist();
  const [location, setLocation] = useState("Mumbai");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showWishlistDropdown, setShowWishlistDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    
    setIsLoggedIn(loggedIn);
    if (email) {
      setUserEmail(email);
    }
  }, []);
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    
    // Update state
    setIsLoggedIn(false);
    setUserEmail('');
    
    // Redirect to home page
    window.location.href = '/';
  };


  return ( 
    <header className="flex items-center justify-between px-6 py-3 shadow-md bg-white relative">
      {/* Left - Logo */}
      <div className="flex items-center space-x-4">
        <a href="/" className="cursor-pointer">
          <img
            src="https://media.cars24.com/cars24/seo/static/1_20230830_1693395013.png"
            alt="CARS24"
            className="h-8"
          />
        </a>

        {/* Location Dropdown */}
        <LocationDropdown  /> 

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
        <div 
          className="relative"
          onMouseEnter={() => setShowWishlistDropdown(true)}
          onMouseLeave={() => setShowWishlistDropdown(false)}
        >
          <div className="flex items-center cursor-pointer">
            <FaHeart 
              size={20} 
              className={`${wishlist.length > 0 ? 'text-red-500' : 'text-gray-600'} cursor-pointer`} 
            />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          
          {/* Wishlist Dropdown */}
          {showWishlistDropdown && (
            <div 
              className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 py-2 max-h-96 overflow-y-auto"
              onMouseEnter={() => setShowWishlistDropdown(true)}
              onMouseLeave={() => setShowWishlistDropdown(false)}
            >
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="font-medium">My Wishlist ({wishlist.length})</h3>
              </div>
              
              {wishlist.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                  Your wishlist is empty
                </div>
              ) : (
                <>
                  {wishlist.map(car => (
                    <div 
                      key={car._id} 
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.location.href = `/viewcardetails?id=${car._id}`;
                      }}
                    >
                      <img 
                        src={`/assets/${car.images}`} 
                        alt={car.brand} 
                        className="w-16 h-12 object-cover rounded mr-3" 
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{car.brand} {car.model}</p>
                        <p className="text-xs text-gray-500">{car.year} • {car.fuel_type}</p>
                        <p className="text-sm font-semibold text-green-600">₹{car.price.toLocaleString()} lakh</p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setShowUserDropdown(true)}
          onMouseLeave={() => setShowUserDropdown(false)} 
        >
          <div className="flex items-center space-x-2 cursor-pointer">
            <FaUserCircle size={24} className="text-gray-600" />
            {isLoggedIn ? (
              <span className="text-sm">{userEmail}</span>
            ) : (
              <span>Hello & Sign in</span>
            )}
            <IoMdArrowDropdown size={16} />
          </div>
          
          {/* User Dropdown Menu */}
          
            <div className={`absolute right-0 mt-7 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50 transition-all duration-200 ease-in-out ${
                showUserDropdown ? "opacity-100 visible" : "opacity-0 invisible"
              }`}> 
              {/* Login/Signin Button or User Info */}
              <div className="p-3">
                {isLoggedIn ? (
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="font-medium text-gray-800 mb-1">Logged in as:</div>
                    <div className="text-sm text-gray-600 mb-3 truncate">{userEmail}</div>
                    <button 
                      onClick={handleLogout}
                      className="w-full h-10 py-2 bg-red-500 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors">
                      <FaSignOutAlt size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => window.location.href = '/login'}
                    className="w-full h-12 py-2 bg-orange-500 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-orange-600 transition-colors">
                    <RiLoginBoxLine size={18} />
                    <span>Login / Sign In</span>
                  </button>
                )}
              </div>

             <div className="py-2 px-4 m-4 rounded-lg bg-gray-50">
              {/* My Appointments Row */}
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-gray-600" />
                  <span className="text-gray-800">My Appointments</span>
                </div>
                <button 
                  onClick={() => window.location.href = '/my-bookings'}
                  className="h-5 px-3 py-1 bg-blue-500 flex items-center justify-between text-white rounded-md text-sm hover:bg-orange-200 transition-colors"
                >
                  View
                </button>
              </div>

              {/* My Bookings Row */}
              <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaBookmark className="text-gray-600" />
                  <span className="text-gray-800">My Bookings</span>
                </div>
                <button 
                  onClick={() => window.location.href = '/my-bookings'}
                  className="h-5 px-3 py-1 bg-blue-500 flex items-center justify-between text-white rounded-md text-sm hover:bg-orange-200 transition-colors"
                >
                  View
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
