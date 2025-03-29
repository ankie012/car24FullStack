
import React from "react";
import CarCard from "./carCard";

import { useEffect, useState } from 'react';
import axios from "axios";

const CarList = ({ Cars }) => {
const [cardata, setCardata] = useState([]);


useEffect(() => {
  axios.get('http://127.0.0.1:8000/api/viewapi/')
    .then(res => {
      setCardata(res.data);
      console.log(res.data); // Log the response data directly here
    })
    .catch(err => {
      console.error('Error fetching data:', err);
    });
}, []); 


console.log(cardata);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {cardata.map((car, index) => (
        <CarCard key={index} car={car} />
      ))}
    </div>
  );
};

export default CarList;





