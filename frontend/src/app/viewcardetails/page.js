import React from 'react';
import Header from '../components/Header/Header';

const CarDetails = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <Header />
      <div className="flex flex-col items-center justify-center p-5 mt-2">
      <div className="flex flex-col md:flex-row max-w-7xl w-full justify-center items-start gap-6">

        {/* Left: Image and Tabs */}
        <div className="w-full md:w-3/5">
          <img
            src="https://media.cars24.com/hello-ar/dev/uploads/6742ab179e921fd52a296cb4/425fbb30-e587-4a6d-bc2d-5b2afbede6a8/slot/10039033787-6717d07cc47d4fdbbc88ed2479edda02-Exterior-7.jpg?w=700&h=403&format=auto"
            alt="MG Hector"
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
              <div><strong>Reg. year</strong><br />Sep 2019</div>
              <div><strong>Fuel</strong><br />CNG</div>
              <div><strong>KM driven</strong><br />49,919 km</div>
              <div><strong>Transmission</strong><br />Manual</div>
              <div><strong>Engine capacity</strong><br />1197cc</div>
              <div><strong>Ownership</strong><br />2nd</div>
              <div><strong>Make year</strong><br />Jun 2019</div>
              <div><strong>Spare key</strong><br />Yes</div>
              <div><strong>Reg number</strong><br />DL5C*9425</div>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-2/5 max-w-xl bg-white rounded-lg p-5 shadow-md h-[600px]">
          <h2 className="text-xl font-bold m-0">2019 Hyundai Grand i10</h2>
          <h3 className="text-base font-semibold text-gray-600 mt-1">SPORTZ 1.2 KAPPA VTVT</h3>
          <p className="text-sm text-gray-600 mt-3 flex justify-between items-center">
            📍 Gaur City mall, Multilevel parking, Greater Noida
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
                <p className="text-xl font-bold text-black m-0">₹7,816/mo</p>
              </div>
              <a href="#" className="text-sm font-bold text-black no-underline">Check eligibility →</a>
            </div>
          </div>

          {/* Price Box */}
          <div className="mt-5 p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-bold">₹4 lakh</span>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">₹54.2K OFF</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500 mt-1">+10,000 other charges</p>
              <a href="#" className="text-sm font-bold text-black no-underline">Price breakup →</a>
            </div>
          </div>

          <button className="w-full mt-5 bg-orange-500 text-white border-none py-4 text-base rounded-lg cursor-pointer hover:bg-orange-600 transition-colors">
            Book free test drive
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CarDetails;
