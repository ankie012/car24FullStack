import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { MdMyLocation } from 'react-icons/md'; // from Material Icons
import { FiChevronDown } from "react-icons/fi"; 

const cities = [
  { name: "Delhi NCR", image: "https://media.cars24.com/cars24/cities/real-life/1734087220_delhi-ncr.png" },
  { name: "Bangalore", image: "https://media.cars24.com/cars24/cities/real-life/1689877204_bangalore.png" },
  { name: "Mumbai", image: "https://media.cars24.com/cars24/cities/real-life/1689877480_mumbai.png" },
  { name: "Hyderabad", image: "https://media.cars24.com/cars24/cities/real-life/1689877575_hyderabad.png" },
  { name: "Ahmedabad", image: "https://media.cars24.com/cars24/cities/real-life/1698908297_ahmedabad.png" },
  { name: "Chennai", image: "https://media.cars24.com/cars24/cities/real-life/1689877235_chennai.png" },
  { name: "Pune", image: "https://media.cars24.com/cars24/cities/real-life/1689877651_pune.png" },
  { name: "New Delhi", image: "https://media.cars24.com/cars24/cities/real-life/1689876922_new-delhi.png" },
  { name: "Gurgaon", image: "https://media.cars24.com/cars24/cities/real-life/1689877281_gurgaon.png" },
  { name: "Noida", image: "https://media.cars24.com/cars24/cities/real-life/1689877703_noida.png" },
  { name: "Ghaziabad", image: "https://media.cars24.com/cars24/cities/real-life/1689877613_ghaziabad.png" },
  { name: "Lucknow", image: "https://media.cars24.com/cars24/cities/real-life/1689877380_lucknow.png" },
  { name: "Jaipur", image: "https://media.cars24.com/cars24/cities/real-life/1689877349_jaipur.png" },
  { name: "Kolkata", image: "https://media.cars24.com/cars24/cities/real-life/1736164616_kolkata.png" },
  { name: "Kochi", image: "https://media.cars24.com/cars24/cities/real-life/1689877437_kochi.png" },
  { name: "Nashik", image: "https://media.cars24.com/cars24/cities/real-life/1692768228_nashik.png" },
  { name: "Nagpur", image: "https://media.cars24.com/cars24/cities/real-life/1692768616_nagpur.png" },
  { name: "Coimbatore", image: "https://media.cars24.com/cars24/cities/real-life/1689938536_coimbatore.png" },
  { name: "Indore", image: "https://media.cars24.com/cars24/cities/real-life/1689877315_Indore.png" },
  { name: "Patna", image: "https://media.cars24.com/cars24/cities/real-life/1689938159_patna.png" },
  { name: "Chandigarh", image: "https://media.cars24.com/cars24/cities/real-life/1689938928_chandigarh.png" },
  { name: "Surat", image: "https://media.cars24.com/cars24/cities/real-life/1689937663_surat.jpg" },
  { name: "Ludhiana", image: "https://media.cars24.com/cars24/cities/real-life/1690199522_ludhiana.png" },
  { name: "Rajkot", image: "https://media.cars24.com/cars24/cities/real-life/1689938595_rajkot.png" },
  { name: "Vadodara", image: "https://media.cars24.com/cars24/cities/real-life/1692325701_vadodara.jpeg" },
  { name: "Agra", image: "https://media.cars24.com/cars24/cities/real-life/1695727088_agra.png" },
]; 

const LocationDropdown = () => {
  const [selectedCity, setSelectedCity] = useState("Patna");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef(null); 

  // Filtered cities based on search input
  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

    const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
        const { latitude, longitude } = position.coords;

        try {
            const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();

            const city = data.address.city || data.address.town || data.address.village || data.address.state; 

            if (city) {
            setSelectedCity(city);
            setIsOpen(false);
            } else {
            alert("Could not detect city");
            }
        } catch (error) {
            alert("Error fetching location info");
        }
        },
        () => {
        alert("Unable to retrieve your location");
        }
    );
    }; 


  return (
    <>
      {/* Trigger Button */}
      <div
        className="w-[9rem]  h-[2.7rem] gap-[0.1rem] flex justify-center items-center cursor-pointer bg-[#f8fafc] rounded-lg "
        onClick={() => setIsOpen(true)}
      >
        <FaMapMarkerAlt size={15} />
        <span className="text-lg font-medium ml-2">{selectedCity}</span>
        <FiChevronDown className="ml-2 text-gray-800 font-black mt-1" size={24} /> 
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-80">
          <div
            ref={modalRef}
            className="bg-white w-[100%] max-w-4xl rounded-2xl p-6 relative max-h-[80vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <IoMdClose size={24} />
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold mb-4">Select your city</h2>

            {/* Search & Current Location */}
            <div className="flex justify-between items-center mb-4">
              <div className="w-[78%] rounded-lg border px-4 py-2 outline-none border-gray-300 bg-slate-50 flex items-center focus-within:border-orange-500">
                <FaSearch className="mr-3 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search for your city"
                  className="w-full bg-slate-50 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button onClick={handleUseCurrentLocation} className="ml-1 text-orange-600 flex items-center">
                <MdMyLocation size={18} className="mr-1" />
                <span className="text-base leading-none mr-1">Use current location</span>
              </button>
            </div>

            {/* City Grid */}
            <h2 className="text-base font-semibold mb-4">Popular cities</h2>
            <div className="grid grid-cols-8 gap-5">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <div
                    key={city.name}
                    onClick={() => {
                      setSelectedCity(city.name);
                      setIsOpen(false);
                    }}
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="relative">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="w-20 h-20 object-cover rounded-xl shadow"
                      />
                      {selectedCity === city.name && (
                        <FaCheckCircle className="absolute bottom-1 right-1 text-blue-600 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="mt-2 mb-3 text-sm text-center">{city.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-8 text-center"> 
                  No city found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationDropdown;

