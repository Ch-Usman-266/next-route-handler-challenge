'use client';
import React, { useEffect, useState } from 'react';
import WellnessCardItem from '../WellnessCardItem';
import SearchBar from '../SearchBar';
import MultiSelectDropdown from '../MultiSelectDropdown';
import NoRecordsFound from '../NoRecordsCard';
import { SearchTerm, Record } from '../../types';

const WellnessCardList = () => {
  const [searchTerm, setSearchTerm] = useState<SearchTerm>('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [resources, setResources] = useState<Record[]>([]);

  const handleSearchButtonClick = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const handleApplyFilterButtonClick = (newSelectedFilters: string[]) => {
    setSelectedFilters(newSelectedFilters);
  };

  const handleClearFilterButtonClick = () => {
    setSelectedFilters([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParams = new URLSearchParams();
        if (searchTerm) {
          searchParams.set('searchTerm', searchTerm);
        }
        if (selectedFilters && selectedFilters.length !== 0) {
          selectedFilters.forEach((filter) => {
            searchParams.append('filters', filter);
          });
        }

        const response = await fetch(
          `/api/records?${searchParams.toString()}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [searchTerm, selectedFilters]);

  return (
    <div
      className='min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-28 px-10 '
      data-testid='wellness-card-list'
    >
      <div className='grid grid-cols-5 gap-4 p-5 '>
        <div className='col-span-3'>
          <SearchBar
            searchTerm={searchTerm}
            onSearchButtonClick={handleSearchButtonClick}
          />
        </div>
        <div className='col-span-2'>
          <MultiSelectDropdown
            selectedFilters={selectedFilters}
            onApplyFilterButtonClick={handleApplyFilterButtonClick}
            onClearFilterButtonClick={handleClearFilterButtonClick}
          />
        </div>
      </div>
      <div className='py-5 md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0'>
        {resources.length > 0 &&
          resources.map(({ id, title, description, grades }) => (
            <WellnessCardItem
              key={id}
              title={title}
              description={description}
              grades={grades}
            />
          ))}
      </div>
      {resources.length === 0 && <NoRecordsFound />}
    </div>
  );
};

export default WellnessCardList;
