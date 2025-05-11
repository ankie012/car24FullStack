"use client";
import React, { useState,useEffect } from "react";
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
import KmDrivenFilter from "./KmDrivenFilter";
// import Cars from "./carObject";


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


  const [Cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/viewapi/')
      .then(res => {
        setCars(res.data);
        console.log('API response:', res.data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, []);


console.log('Carsssssss',Cars)


  const handleBudgetChange = (min, max) => {
    setMinBudget(min);
    setMaxBudget(max);
  };

  const filteredCars = Cars.filter((car) => {
    console.log('hahahahahha',car)
    const carDiscount = parseInt(car.discount); // Convert discount string (e.g., "5%") to a number

    return (
      (car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.year.toString().includes(searchQuery)) &&
      car.price >= minBudget &&
      car.price <= maxBudget &&
      (selectedFuels.length === 0 || selectedFuels.includes(car.fuel_type)) &&
      (!selectedBodyType || car.body_type === selectedBodyType) &&
      (!selectedTransmission || car.transmission === selectedTransmission) &&
      (!selectedColor || car.colors === selectedColor) &&
      (!selectedSeats || car.seater === selectedSeats) &&
      (selectedOwners.length === 0 || selectedOwners.includes(car.owners)) &&
      (selectedRTOs.length === 0 || selectedRTOs.includes(car.RTO)) &&
      (!selectedDiscount || carDiscount >= selectedDiscount) // Filter discount correctly
    );
  });

  return (
    <div className="container mx-auto flex justify-center">
      <div className="border w-1/5 p-4">
        <BudgetFilter onBudgetChange={handleBudgetChange} />
        <FuelFilter onFuelChange={setSelectedFuels} carData={Cars} />
        <BodyTypeFilter onBodyTypeChange={setSelectedBodyType} carData={Cars} />
        <TransmissionFilter onTransmissionChange={setSelectedTransmission} carData={Cars} />
        <ColorFilter onColorChange={setSelectedColor} carData={Cars} />
        <SeatsFilter onSeatsChange={setSelectedSeats} carData={Cars} />
        <OwnerFilter onOwnerChange={setSelectedOwners} carData={Cars} />
        <RTOFilter onRTOChange={setSelectedRTOs} carData={Cars} />
        <DiscountFilter onDiscountChange={setSelectedDiscount} />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-center my-6">Car Listings</h1>
        <SearchBar onSearch={setSearchQuery} />
        <CarList Cars={filteredCars} />
      </div>
    </div>
  );
};

export default CarComponent;
