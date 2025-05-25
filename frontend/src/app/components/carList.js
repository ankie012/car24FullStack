import React from "react";
import CarCard from "./carCard";

const CarList = ({ Cars }) => {
  if (Cars.length === 0) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <p className="text-gray-500 text-lg">No cars found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 w-full">
      {Cars.map((car, index) => (
        <CarCard key={index} car={car} />   
      ))} 
    </div>
  );
}; 

export default CarList;
