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
    <div className="p-4">
      <h2 className="text-lg font-bold">Budget</h2>
      <div className="flex justify-between text-blue-600 font-semibold mb-2">
        <span>₹{values[0].toLocaleString()}</span>
        <span>₹{values[1].toLocaleString()}</span>
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
              className="w-4 h-4  bg-blue-700 rounded-full cursor-pointer"
            />
          );
        }}
      />

      <div className="flex justify-between text-gray-400 text-sm mt-2">
        <span>Minimum</span>
        <span>Maximum</span>
      </div>
    </div>
  );
};

export default BudgetFilter;
