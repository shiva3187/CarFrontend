import React, { useState } from 'react';
import { useCar } from '../../context/CarContext';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const { searchCars } = useCar();

  const handleSearch = () => {
    searchCars(keyword);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search cars..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
