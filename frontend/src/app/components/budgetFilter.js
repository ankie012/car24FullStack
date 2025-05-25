import React, { useState } from "react";
import { Range } from "react-range";

const BudgetFilter = ({ onBudgetChange }) => {
  const STEP = 20000;
  const MIN = 100000;
  const MAX = 5200000; 

  const [values, setValues] = useState([MIN, MAX]);

  const handleChange = (newValues) => {
    const minGap = 200000;
    let [min, max] = newValues;
  
    if (max - min < minGap) {
      if (values[0] !== min) {
        // User moved the left thumb
        min = max - minGap;
      } else {
        // User moved the right thumb
        max = min + minGap;
      }
    }
    
    // Clamp to bounds
    min = Math.max(MIN, min);
    max = Math.min(MAX, max);
    
    const updatedValues = [min, max];
    setValues(updatedValues);
    console.log("Sending budget range:", min, max);

    onBudgetChange(updatedValues[0], updatedValues[1]);
  };
  

  return (
    <div className="p-3">
      <h2 className="text-base font-bold mb-3">Budget</h2>
      <div className="flex justify-between text-blue-600 font-semibold mb-2 text-sm">
        <span>₹{(values[0]/100000).toFixed(1)} Lakh</span>
        <span>₹{(values[1]/100000).toFixed(1)} Lakh</span>
      </div>

      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={handleChange}
        
        renderTrack={({ props, children }) => {
          const { key, ...restProps } = props;
          return (
            <div
              key={key}
              {...restProps}
              className="h-2 bg-blue-200 rounded"
            >
              {children}
            </div>
          );
        }}

        renderThumb={({ props }) => {
          const { key, ...restProps } = props;
          return (
            <div
              key={key}
              {...restProps}
              className="w-5 h-5 bg-blue-700 rounded-full cursor-pointer shadow-md"
            />
          );
        }}
      />

      <div className="flex justify-between text-gray-500 text-xs mt-2">
        <span>₹1 Lakh</span>
        <span>₹52 Lakh</span>
      </div>
    </div>
  );
};

export default BudgetFilter;
