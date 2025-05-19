"use client";
import React, { useEffect, useState } from 'react';
import Header from '../components/Header//Header'; 
import TestDriveModal from '../components/TestDriveModal'
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const CarDetails = () => {
  const searchParams = useSearchParams();
  const carId = searchParams.get('id');
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!carId) {
        setError("No car ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/cars/${carId}/`);
        setCar(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch car details:", err);
        setError("Failed to load car details");
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl">Loading car details...</div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl text-red-500">{error || "Car not found"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <Header />
      <div className="flex flex-col items-center justify-center p-5 mt-2">
      <div className="flex flex-col md:flex-row max-w-7xl w-full justify-center items-start gap-6">

        {/* Left: Image and Tabs */}
        <div className="w-full md:w-3/5">
          <img
            src={`/assets/${car.images}`}
            alt={`${car.brand} ${car.model}`}
            className="w-full rounded-lg"
          />
          <div className="flex justify-around mt-2 bg-black rounded-lg p-3 text-white">
            {["Exterior", "Interior", "Features", "Highlights", "Tyres"].map((tab, i) => (
              <div
                key={i}
                className={`text-center px-2 py-1 ${tab === "Exterior" ? "text-orange-500 font-bold" : ""}`}
              >
                <div className="w-10 h-10 bg-gray-400 rounded-full mx-auto mb-1"></div>
                <p>{tab}</p>
              </div>
            ))}
          </div>

          {/* Great things about this car */}
          <div className="bg-yellow-50 border rounded-lg p-4 mt-4 space-y-3">
            <h3 className="text-md font-semibold mb-2">Great things about this car</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="font-bold">Smart connectivity</div>
                <div className="text-sm text-gray-600">with Apple CarPlay and Android Auto.</div>
              </div>
              <div>
                <div className="font-bold">Essential features</div>
                <div className="text-sm text-gray-600">AC, power windows, music system.</div>
              </div>
              <div>
                <div className="font-bold">2 airbags and ABS</div>
                <div className="text-sm text-gray-600">Superior safety and protection.</div>
              </div>
            </div>
          </div>

          {/* Car overview */}
          <div className="bg-white border rounded-lg p-4 mt-4 space-y-2 shadow-sm">
            <h3 className="text-md font-semibold mb-2">Car overview</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 text-sm text-gray-700">
              <div><strong>Reg. year</strong><br />{car.year}</div>
              <div><strong>Fuel</strong><br />{car.fuel_type}</div>
              <div><strong>KM driven</strong><br />{car.km_driven || "N/A"} {car.km_driven ? "km" : ""}</div>
              <div><strong>Transmission</strong><br />{car.transmission}</div>
              <div><strong>Engine capacity</strong><br />{car.engine?.cc || "N/A"}</div>
              <div><strong>Ownership</strong><br />{car.Owners?.[0] || "N/A"}</div>
              <div><strong>Make year</strong><br />{car.year}</div>
              <div><strong>Spare key</strong><br />{"Yes"}</div>
              <div><strong>Reg number</strong><br />{car.Reg_number}</div> 
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-2/5 max-w-xl bg-white rounded-lg p-5 shadow-md h-[600px]">
          <h2 className="text-xl font-bold m-0">{car.year} {car.brand} {car.model}</h2>
          <h3 className="text-base font-semibold text-gray-600 mt-1">{car.variant}</h3>
          <p className="text-sm text-gray-600 mt-3 flex justify-between items-center">
            📍 {car.location || "Mumbai"}
            <span className="text-orange-500 font-bold cursor-pointer">📞 Call us</span>
          </p>

          <div className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full mt-4 text-xs">
            ✅ CARS24 Assured
          </div>

          {/* EMI Box */}
          <div className="mt-5 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 mb-1">EMI starts at</p>
                <p className="text-xl font-bold text-black m-0">₹{car.emi || "7,816"}/mo</p>
              </div>
              <a href="#" className="text-sm font-bold text-black no-underline">Check eligibility →</a>
            </div>
          </div>

          {/* Price Box */}
          <div className="mt-5 p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-bold">₹{car.price.toLocaleString()} lakh</span>
              {car.Discount && (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">
                  ₹{car.Discount} OFF
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500 mt-1">+10,000 other charges</p>
              <a href="#" className="text-sm font-bold text-black no-underline">Price breakup →</a>
            </div>
          </div>

          <button
  onClick={() => setShowModal(true)}
  className="w-full mt-5 bg-orange-500 text-white border-none py-4 text-base rounded-lg cursor-pointer hover:bg-orange-600 transition-colors"
>
  Book free test drive
</button>

<TestDriveModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default CarDetails;
