import React from 'react'
import Skeleton from '@mui/material/Skeleton';
export const SkeletonCard = () => {
  return (
    // <div className="animate-pulse bg-[#1f1f1f] p-4 rounded-lg shadow w-full max-w-[500px] mx-auto mb-4">
    //   <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
    //   <div className="h-3 bg-gray-700 rounded w-1/2 mb-4"></div>
    //   <div className="h-[40px] bg-gray-800 rounded w-full"></div>
    // </div
    // 
    // >
     <Skeleton animation="wave" className='!h-15' />
  );
};
