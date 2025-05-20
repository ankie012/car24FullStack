"use client";
import qs from "qs";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CarList from "./carList";
import SearchBar from "./carSearch";
import BudgetFilter from "./budgetFilter";
import FuelFilter from "./fuelFilter";
import BodyTypeFilter from "./carBodyTypeFilter";
import TransmissionFilter from "./TransmissionFilter";
import ColorFilter from "./ColorFilter";
import SeatsFilter from "./SeatsFilter";
import OwnerFilter from "./OwnerFilter";
import RTOFilter from "./RTOFilter";
import DiscountFilter from "./DiscountFilter"; 

const CarComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [minBudget, setMinBudget] = useState(100000);
  const [maxBudget, setMaxBudget] = useState(2500000);
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedBodyType, setSelectedBodyType] = useState(null);
  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(null);
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [selectedRTOs, setSelectedRTOs] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [filteredCars, setFilteredCars] = useState([]); // Cars from API

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchCarsWithFilters({ ...activeFilters, search: query }); // add `search` to your filter API request
  };


  const handleBudgetChange = (min, max) => {
    setMinBudget(min);
    setMaxBudget(max);
  }; 

  // 👇 Fetch cars from backend API based on filters
  useEffect(() => {
    const fetchFilteredCars = async () => {
      try {  
        const params = {
          min_price: minBudget,
          max_price: maxBudget,
          fuel_type: selectedFuels, // ✅ pass it as an array
          body_type: selectedBodyType,
          transmission: selectedTransmission , 
          colors: selectedColor || "",
          seater: selectedSeats || "",
          Owners: selectedOwners,
          RTO: selectedRTOs, 
          Discount: selectedDiscount || "", 
          search: searchQuery || ""
        }; 
         
        // Remove empty fields
        //Object.entries(params):This converts the object into an array of key-value pairs: 
        const filteredParams = Object.fromEntries( //This converts the filtered array back into an object
          Object.entries(params).filter(([_, v]) => v !== "" && v !== null)
        );    
        
        // Axios will convert filteredParams to query parameters in the URL
        const response = await axios.get("http://localhost:8000/filtercars/", {
          params: filteredParams, //This line tells Axios: “Attach the key-value pairs from filteredParams as query parameters in the request URL.”
          paramsSerializer: (paramss) =>{  
           return qs.stringify(paramss, { arrayFormat: "repeat" })  
          }, // 👈 this is crucial Because without it, the backend might receive wrong data like:?brand[]=Honda&brand[]=Toyota
                                                            // "repeat" format converts arrays like this:brand=Honda&brand=Toyota 
        }); 
       

        
        setFilteredCars(response.data);

      } catch (err) {
        console.error("Failed to fetch cars:", err); 
      }
    };

    fetchFilteredCars();
  }, [
    searchQuery,
    minBudget,
    maxBudget,
    selectedFuels,
    selectedBodyType,
    selectedTransmission,
    selectedColor,
    selectedSeats,
    selectedOwners,
    selectedRTOs,
    selectedDiscount
  ]);       
    
  return (
    <div className="flex min-h-screen">
      <div className="w-[20%] min-h-screen border-r p-4 bg-white">
        <BudgetFilter onBudgetChange={handleBudgetChange} />
        <FuelFilter onFuelChange={setSelectedFuels} carData={filteredCars} />
        <BodyTypeFilter onBodyTypeChange={setSelectedBodyType} carData={filteredCars} />
        <TransmissionFilter onTransmissionChange={setSelectedTransmission} carData={filteredCars} />
        <ColorFilter onColorChange={setSelectedColor} carData={filteredCars} />
        <SeatsFilter onSeatsChange={setSelectedSeats} carData={filteredCars} />
        <OwnerFilter onOwnerChange={setSelectedOwners} carData={filteredCars} />
        <RTOFilter onRTOChange={setSelectedRTOs} carData={filteredCars} />
        <DiscountFilter onDiscountChange={setSelectedDiscount} />
      </div>
      <div className="w-[80%] p-4">
        <h1 className="text-3xl font-bold text-center my-6">Car Listings</h1>
        <SearchBar onSearch={(q) => setSearchQuery(q)} />  
        {/* <CarList  Cars={filteredCars} />  */} 
        <CarList key={filteredCars.length} Cars={filteredCars} /> 
      </div>
    </div>
  );
};

export default CarComponent;
