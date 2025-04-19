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
          body_type: selectedBodyType || "",
          transmission: selectedTransmission || "",
          colors: selectedColor || "",
          seater: selectedSeats || "",
          owners: selectedOwners,
          RTO: selectedRTOs,
          Discount: selectedDiscount || "",
          search: searchQuery || ""
        }; 

        // Remove empty fields
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([_, v]) => v !== "" && v !== null)
        );  

        

        const response = await axios.get("http://localhost:8000/filtercars/", {
          params: filteredParams,
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "repeat" }), // 👈 this is crucial
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
    <div className="container mx-auto flex justify-center">
      <div className="border w-[18%] p-4 h-[100%]">
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
      <div>
        <h1 className="text-3xl font-bold text-center my-6">Car Listings</h1>
        <SearchBar onSearch={setSearchQuery} />
        <CarList key={filteredCars.length} Cars={filteredCars} />
      </div>
    </div>
  );
};

export default CarComponent;
