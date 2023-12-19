'use client';
import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchButtonClick: (newSearchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchButtonClick,
}) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchButtonClick = () => {
    onSearchButtonClick(inputValue);
  };
  return (
    <div
      className='flex items-center w-11/12 h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden'
      data-testid='search-bar-input'
    >
      <input
        className='w-full outline-none text-sm text-gray-700 p-5'
        type='text'
        id='search'
        placeholder='Search something..'
        value={inputValue || ''}
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className='bg-green-600 text-white px-6 text-lg font-semibold py-4'
        onClick={handleSearchButtonClick}
        data-testid='search-bar-button'
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
