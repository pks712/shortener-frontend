import React from 'react'
import { motion } from "framer-motion"

const StaisticsHeading = () => {
  const letters = [
    { char: "L", className: "text-pink-600" },
    { char: "i", className: "text-pink-500" },
    { char: "n", className: "text-pink-400" },
    { char: "k", className: "bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent" },
      { char: " ", className: "w-4" },
    { char: "S", className:"bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent" },
    { char: "t", className: "bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent" },
    { char: "a", className: "bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent" },
    { char: "t", className:"bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent" },
    { char: "s", className:"bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent" },
    { char: "t", className: "bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent" },
    { char: "i", className:"bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent" },
    { char: "c", className: "bg-gradient-to-r from-pink-500 to-blue-400 bg-clip-text text-transparent" },
    { char: "s", className: "bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent" },
  ];

  return (
     <div className="flex  top-5">
          <div className="heading ">
    <motion.div
      initial={{ opacity: 0, x: 150 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2, type: "spring" }}
      className="text-[30px]  font-bold  mt-10"
    >
      {letters.map((item, index) => (
        <motion.span
          key={index}
          className={item.className}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 3,
           
            ease: "easeInOut",
          }}
        >
          {item.char}
        </motion.span>
      ))}
    </motion.div>
    </div>
    </div>
  )
}

export default StaisticsHeading;
