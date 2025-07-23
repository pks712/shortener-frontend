import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from "react-icons/fa";
import Button from '@mui/material/Button';
import { IoClose } from "react-icons/io5";
const FreeLinkOver = ({onClose}) => {
   

  return (
    <div className='fixed inset-0 z-[9999] bg-black/40 backdrop-blur  flex items-center justify-center'>
    <div className="min-h-[300px]  w-[460px]  bg-gradient-to-r from-blue-700 to-pink-600 text-white rounded-lg shadow-lg p-6 mt-6 relative flex flex-col items-center justify-center">
       
         
        <FaExclamationTriangle className="text-yellow-300 text-[40px] mb-3" />
      

      
      <div className='flex flex-col items-center justify-center'>
      
      <h1 className="text-[22px] font-bold mb-2">Free Link Limit Reached</h1>
      
      <p className="text-[14px] mb-4 text-center max-w-[400px]">
        You've reached the maximum limit of <span className="font-semibold">3 free links</span>.
        To create more, please register or upgrade your account to unlock unlimited access.
      </p>
      
     
   <Link to ="register"  >  <Button className="!bg-white !text-blue-700 !font-semibold !px-5 !py-2 !rounded-full hover:!bg-blue-100 !transition" onClick={onClose}>
          Register Now
        </Button>
     </Link> 
      </div>

 <div className='absolute top-0 right-2'>
  <span
    onClick={onClose}
    className="absolute top-2 right-3 text-white hover:bg-red-500 rounded text-[22px]"
  >
    <IoClose className='text-2xl text-white' />
  </span>
</div>

    </div>
  
    </div>
  );
};

export default FreeLinkOver;
