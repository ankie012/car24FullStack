import React,{useState} from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const CarCard = ({ car }) => {

  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <Card className="p-4 shadow-lg rounded-2x1 border relative w-80">   
      {/* Heart Icon */} 
      <Heart
        onClick={toggleFavorite}
        className={`absolute top-4 right-4 cursor-pointer transition-colors duration-300 ${
          isFavorited ? "text-red-500 fill-red-500" : "text-gray-400"
        }`}
      />
      
      {/* Car Image */}
      <img src={`/assets/${car.images}`} alt={`${car.brand} ${car.model}`}  className="w-full h-40 object-cover rounded-lg" />
      
      
      <CardContent className="mt-4">
        {/* Car Name */}
        <h2 className="text-lg font-bold"> {car.brand}  {car.variant}</h2>
        
        {/* Car Details */}
        <p className="text-m text-gray-500">{car.year}  | {car.model} | {car.fuel_type} | {car.transmission} </p>
        
        {/* EMI & Price */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-md font-semibold">EMI ₹ 10k {car.emi}/m</p>
          <p className="text-lg font-bold text-green-600">₹{car.price.toLocaleString()} lakh</p>
        </div> 
        
        {/* Other Charges */}
        <p className="text-sm text-gray-400">+ other charges</p>
        
        {/* Assured & Highlights */}
        <div className="flex items-center gap-2 mt-3 text-sm text-blue-600">
          <span className="bg-blue-100 px-2 py-1 rounded-lg">CARS24 Assured</span>
          <span className="bg-orange-100 px-2 py-1 rounded-lg">Highlights</span>
        </div>
        
        {/* Location */}
        <p className="text-sm text-gray-500 mt-2">📍 Mumbai</p>
      </CardContent>
    </Card>
  );
};

export default CarCard;
