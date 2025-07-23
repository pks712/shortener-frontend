import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import {motion } from "framer-motion"


 
const FilterPage = ({setSearch,setStatus,setFromDate,setToDate,toDate,fromDate,status ,search}) => {
    const [open, setOpen] = useState(false);

  const options = ["All", "Active", "Expired"];

  return (
  

   
    <motion.div 
     initial={{opacity:0 ,x:-400 ,scale:0}}
    animate={{opacity:1 ,x:0 ,scale:1}}
   exit={{ opacity: 0, x: 400 ,scale:0 }} 
    transition={{duration:0.6}}
    
    
    className="max-w-6xl flex flex-col   p-4 bg-black text-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 ">Filter to Search Data</h2>

      {/* 🔍 Filters */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search short/original URL"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full
             focus:outline-none focus:ring-0
             focus:border-pink-500"
        />

        {/* Status Dropdown */}
       
        <div className="relative w-full">
    
      <div
        onClick={() => setOpen(!open)}
        className="bg-gray-800 text-white px-4 py-2 rounded cursor-pointer flex justify-between items-center "
      >
        <span>{status} Status</span>
        <span className="ml-2"><IoChevronDownOutline className="text-2xl" /></span>
      </div>

      {/* Dropdown List */}
      {open && (
        <div className="absolute left-0 w-full mt-1 bg-gradient-to-tl from-pink-500 to-blue-500 text-black rounded shadow z-50">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                setStatus(opt);
                setOpen(false);
              }}
              className={`px-4 py-2  hover:bg-gray-400 cursor-pointer ${
                status === opt ?"bg-gray-500 font-bold" : ""
              }`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
 

        {/* From Date */}
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-0
             focus:border-pink-500"
        />

        {/* To Date */}
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-0
             focus:border-pink-500"
        />
      </div>

   
    </motion.div>
  );
};

export default FilterPage;
