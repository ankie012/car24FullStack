

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const seatOptions = [
  { seats: 4, image: { url: "https://media.cars24.com/india/buy/facets_v4/seats/4_Seater.png" } },
  { seats: 5, image: { url: "https://media.cars24.com/india/buy/facets_v4/seats/5_Seater.png" } },
  { seats: 6, image: { url: "https://media.cars24.com/india/buy/facets_v4/seats/6_Seater.png" } },
  { seats: 7, image: { url: "https://media.cars24.com/india/buy/facets_v4/seats/7_Seater.png" } },
  { seats: 8, image: { url: "https://media.cars24.com/india/buy/facets_v4/seats/8_Seater.png" } },
  { seats: 9, image: { url: "https://media.cars24.com/india/buy/facets_v4/seats/9_Seater.png" } }
];

const SeatsFilter = ({ onSeatsChange, carData = [] }) => {
  const [selectedSeats, setSelectedSeats] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSeatClick = (seats) => {
    const updatedSeats = selectedSeats === seats ? null : seats;
    setSelectedSeats(updatedSeats);
    onSeatsChange(updatedSeats);
  };

  // Count cars per seat number
  const seatCounts = seatOptions.reduce((acc, { seats }) => {
    acc[seats] = carData?.filter((car) => car.seats === seats).length || 0;
    return acc;
  }, {});

  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-2 text-lg font-bold"
      >
        <span>Seats</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {seatOptions.map(({ seats, image }) => (
            <div
              key={seats}
              className={`flex flex-col items-center justify-center border p-2 rounded-lg cursor-pointer ${
                selectedSeats === seats ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handleSeatClick(seats)}
            >
              <img src={image.url} alt={`${seats} Seater`} className="w-10 h-10" />
              <span className="text-xs font-medium mt-1">{seats} Seater</span>
              <span className="text-xs text-gray-500">({seatCounts[seats]})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeatsFilter;