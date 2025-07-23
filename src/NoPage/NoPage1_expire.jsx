import React from 'react';
import {motion} from "framer-motion"
const NoPage1_expire = () => {

    const letter =[
         {char:"L" , className: "text-red-700 text-[40px] font-[400] " },
         {char:"i" , className: "text-red-700 text-[40px] font-[400]"},
         {char:"n" , className: "text-red-700 text-[40px] font-[400]"},
         {char:"k" , className: "text-red-700 text-[40px] font-[400]"},
         {char :"" ,className:" mr-2 ml-2"},
         {char:"E" , className: "text-red-700 text-[40px] font-[400]"},
         {char:"x" , className: "text-red-700 text-[40px] font-[400]"},
         {char:"p" , className: "text-red-700 text-[40px] font-[400]"},
         {char:"i" , className: "text-red-700 text-[40px] font-[400]"},
         {char:"r" , className: "text-red-700 text-[40px] font-[400]"},
         {char:"e" , className: "text-red-700 text-[40px] font-[400]"},
         {char:"d" , className: "text-red-700 text-[40px] font-[400]"}
        
    ]
  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-tl from-pink-600 to-blue-600'>
      <div className='container w-[450px] h-75 bg-gradient-to-tl from-pink-500 to-blue-500 rounded-lg overflow-hidden shadow-lg flex flex-col  items-center gap-5'
      
      style={{
    boxShadow: `
      0 0 0 rgb(255, 0, 102),   /* pink */
      0 0 10px rgb(102, 0, 51),   /* cyan */
      0 0 0 rgb(204, 0, 255)   /* purple */
    `
  }}
  >
<h1 className=' text-5xl font-[600] text-[#ec4811]  mt-5 mb-8'>
    Oops!
</h1>


<div className='flex mt-5'>
 {letter.map((item, index) => (
<motion.h1
  key={index}
         
            animate={{  opacity: [0.2, 1, 0.4, 1], y: [0, -10, 10, 0] }}
            transition={{ delay: index * 0.2,repeat:Infinity,  repeatDelay: 4 ,duration: 2 }}
            className={item.className}
          
         >
                  {item.char}
</motion.h1>

    ))} 
   
    </div>
      <p className="text-[20px] text-[#164545] font-[500] ">Sorry! This short link is no longer valid.</p>
      </div>
    </div>
  );
};

export default NoPage1_expire;
