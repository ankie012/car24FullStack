
import React from "react";
import CarCard from "./carCard";
import Cars from "./carObject";

const CarList = ({ Cars }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Cars.map((car, index) => (
        <CarCard key={index} car={car} />
      ))}
    </div>
  );
};

export default CarList;





