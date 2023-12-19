'use client';
import React from 'react';

const NoRecordsFound: React.FC = ({}) => (
  <div className='flex items-center justify-center align-center w-full bg-white shadow-lg space-y-3 p-5 rounded'>
    <h3 className='font-black text-gray-800 md:text-3xl text-xl text-red-500'>
      No Records Found
    </h3>
  </div>
);

export default NoRecordsFound;
