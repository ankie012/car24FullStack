import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); // Pass search input back to parent component
  };

  return (
    <div className="flex justify-center my-6">
      <div className="relative w-full max-w-lg">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          placeholder="Search for your favourite cars"
          value={query}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 text-lg"
        />
      </div>
    </div>
  );
};

export default SearchBar;