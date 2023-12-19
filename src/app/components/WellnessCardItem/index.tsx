'use client';
import React from 'react';

interface WellnessCardItemProps {
  title: string;
  description: string;
  grades: string[];
}

const WellnessGradePill: React.FC<{ grade: string }> = ({ grade }) => {
  return (
    <span className='w-1/2 mr-3 px-3 py-2 rounded z-10 bg-red-500 text-xs font-medium text-white'>
      {grade}
    </span>
  );
};

const WellnessCardItem: React.FC<WellnessCardItemProps> = ({
  title,
  description,
  grades,
}) => (
  <div
    className='w-full bg-white shadow-lg space-y-3 p-5 rounded'
    data-testid='wellness-card-item'
  >
    <h3 className='font-black text-gray-800 md:text-3xl text-xl'>{title}</h3>
    <p className='md:text-lg text-gray-500 text-base'>{description}</p>
    <div className='flex align-center'>
      <h3 className='font-black text-gray-800 md:text-lg text-xl mr-5'>
        {'Grades: '}
      </h3>
      <div>
        {grades?.map((grade, index) => (
          <WellnessGradePill key={index} grade={grade} />
        ))}
      </div>
    </div>
  </div>
);

export default WellnessCardItem;
