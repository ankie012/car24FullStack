import React from "react";
import CarCard from "./carCard";

const CarList = ({ Cars }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-1">
      {Cars.map((car, index) => (
        <CarCard key={index} car={car} />   
      ))} 
    </div>
  );
}; 

export default CarList;
