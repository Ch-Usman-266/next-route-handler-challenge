'use client';
import React, { useState } from 'react';
import { FilterValue } from '../../types';

const FILTERS: { value: FilterValue; label: string }[] = [
  { value: '3-5', label: '3 - 5' },
  { value: '6-8', label: '6 - 8' },
  { value: '9-12', label: '9 - 12' },
];

interface MultiSelectDropdownProps {
  selectedFilters: string[];
  onApplyFilterButtonClick: (newSearchTerm: string[]) => void;
  onClearFilterButtonClick: () => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  selectedFilters,
  onApplyFilterButtonClick,
  onClearFilterButtonClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<string[]>(selectedFilters);

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const handleApplyFilterButtonClick = () => {
    onApplyFilterButtonClick(filters);
  };

  const handleClearFilterButtonClick = () => {
    onClearFilterButtonClick();
    setFilters([]);
    toggleFilters();
  };

  const handleCheckboxChange = (filterValue: string) => {
    setFilters((prevFilters) => {
      if (prevFilters.includes(filterValue)) {
        return prevFilters.filter((value) => value !== filterValue);
      } else {
        return [...prevFilters, filterValue];
      }
    });
  };

  return (
    <>
      {isOpen && (
        <div
          className={`bg-white max-w-md w-screen overflow-hidden rounded-lg border border-gray-200 ${
            isOpen ? 'shadow-lg' : ''
          } text-gray-700 `}
          data-testid='multi-select-dropdown'
        >
          <>
            <form className='flex border-t border-gray-200 lg:border-t-0'>
              <fieldset className='w-full'>
                <legend className='block w-full bg-gray-50 px-5 py-3 text-xs font-medium'>
                  Grade
                </legend>

                <div className='space-y-2 px-5 py-6'>
                  {FILTERS.map((filter) => (
                    <div className='flex items-center' key={filter.label}>
                      <input
                        id={filter.label}
                        type='checkbox'
                        name={filter.label}
                        className='h-5 w-5 rounded border-gray-300'
                        checked={filters.includes(filter.value)}
                        onChange={() => handleCheckboxChange(filter.value)}
                      />

                      <label
                        htmlFor={filter.label}
                        className='ml-3 text-sm font-medium'
                      >
                        {filter.label}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </form>
            <div className=''>
              <div className='flex justify-between border-t border-gray-200 px-5 py-3'>
                <button
                  name='reset'
                  type='button'
                  className='rounded text-xs font-medium text-gray-600 underline'
                  onClick={handleClearFilterButtonClick}
                >
                  Reset All
                </button>

                <button
                  name='commit'
                  type='button'
                  className='rounded bg-blue-600 px-5 py-3 text-xs font-medium text-white active:scale-95'
                  onClick={handleApplyFilterButtonClick}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </>
        </div>
      )}
      <button
        onClick={toggleFilters}
        className={`bg-blue-600 text-white px-5 py-3 rounded-full ${
          isOpen ? 'mt-3' : ''
        }`}
      >
        {isOpen ? 'Hide Filters' : 'Show Filters'}
      </button>
    </>
  );
};

export default MultiSelectDropdown;
