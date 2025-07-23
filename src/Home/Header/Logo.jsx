import React from 'react'
import { motion } from "framer-motion";
const Logo = () => {
    

     const letters = [
    { char: "S", className: "text-pink-400" },
    { char: "h", className: "text-pink-400" },
    {
      char: "o",
      className: "bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent",
    },
    {
      char: "r",
      className: "bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent",
    },
    {
      char: "t",
      className: "bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent",
    },
    {
      char: "l",
      className: "bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-text text-transparent",
    },
    {
      char: "y",
      className: "bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent",
    },
  ];

  return (
   <div className="relative inline-block">
      <h1 className="text-3xl font-bold flex">
        {letters.map((item, index) => (
          <motion.span
            key={index}
         
            animate={{  opacity: [0.2, 1, 0.4, 1], y: [0, -10, 10, 0] }}
            transition={{ delay: index * 0.2,repeat:Infinity,  repeatDelay: 4 ,duration: 2 }}
            className={item.className}
          >
            {item.char}
          </motion.span>
        ))}
      </h1>

      {/* R Badge */}
      <span className="absolute top-0.5 -right-4 border border-white rounded-full text-[10px] w-3 h-3 flex items-center justify-center text-white">
        R
      </span>
    </div>
  );
};


export default Logo