import React from "react";
import CarCard from "./carCard";

const CarList = ({ Cars }) => {

   if (!Cars || Cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-[60vw] h-[60vh] text-gray-500">
        <img src="/no_cars_found.png" alt="No results" className="w-[40%] h-[59%] mb-4 opacity-70" />
        <h2 className="text-xl font-semibold">No cars found</h2>
        <p className="text-sm mt-2">Try adjusting your filters or search query.</p>
      </div>
    ); 
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-1">
      {Cars.map((car, index) => (
        <CarCard key={index} car={car} />   
      ))} 
    </div>
  );
}; 

export default CarList;
