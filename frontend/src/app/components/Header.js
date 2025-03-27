"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = () => {
  const [location, setLocation] = useState("Mumbai");
  const [showDropdown, setShowDropdown] = useState(false);
  const [carssss, setCarssss] = useState([]);




  const [cars, setCars] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000);


  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/api/rupesh/', { timeout: 5000 }) // 5 seconds timeout
  //     .then(response => {
  //       console.log(response.data);
  //       const cars = response.data;

  //       setCarssss(cars);

  //       console.log(carssss)

  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);



  useEffect(() => {
    fetchCars();
}, [minPrice, maxPrice]);

const fetchCars = async () => {
    try {
        const response = await fetch(`http://localhost:8000/cars/?min_price=${minPrice}&max_price=${maxPrice}`);
        const data = await response.json();
        setCars(data);
    } catch (error) {
        console.error("Error fetching cars:", error);
    }
};



  const countries = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"];

  return (
    <>


      {/* <div>
        cars data is coming

        <div className="container mx-auto p-4">
  {carssss.map((car, index) => (
    <div key={index} className="card bg-white shadow-lg rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-semibold text-gray-800">{car.brand}</h2>
      <p className="text-xl font-bold text-gray-700 mt-2">₹ {car.price}</p>
    </div>
  ))}
</div>

</div> */}



<div>
            <h2>Car Listings</h2>
            <label>Min Price:</label>
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />

            <label>Max Price:</label>
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

            <button onClick={fetchCars}>Filter</button>

            <ul>
                {cars.map((car) => (
                    <li key={car._id}>{car.name} - ${car.price}</li>
                ))}
            </ul>
        </div>


    </>

  );
};

export default Header;
