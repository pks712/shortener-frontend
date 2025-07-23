import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react';
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { useTheme } from './useThemeContext';
import {motion} from "framer-motion"
const BodyRightSidebar = () => {
  const{theme , toggleTheme} = useTheme();
  const[activeMode , setActiveMode] = useState("dark")
 
 useEffect(() => {
    setActiveMode(theme);
  }, [theme]);

 const  handleLightClick =()=>{
toggleTheme("light")


  }
  const handleDarkClick =()=>{
toggleTheme("dark")

  }
  return (
    <motion.div 
     initial={{ opacity: 1, y:-100 }}
              animate={{opacity: [1, 1, 1], y: [-100, 100, -100] }}
              transition={{ delay: 0.8, repeat:Infinity,duration: 5, ease: "easeInOut" }}
    
    className='w-full SideBar'>

   
    <div className="w-15 flex justify-end items-center mt-50">
        <div  className=' border border-gray-500 h-65 w-15 bg-gray-600 rounded-full flex flex-col justify-center items-center gap-9'>
<Button className={`light rotate-90 !mb-6 !rounded-full  !h-11 !w-[130px] !text-white  ${activeMode == "light"? "!bg-blue-500" :""}`} onClick={handleLightClick}><span className='text-2xl text-white'><CiLight /></span>Ligth</Button>
<Button className={`dark rotate-90  !rounded-full !h-11 !w-[130px] !text-white ${activeMode == "dark"? "!bg-blue-500":""} `}onClick={handleDarkClick}><span className='text-2xl !text-white'><CiDark /></span>Dark</Button>
        </div>

    </div>
     </motion.div>
  )
}

export default BodyRightSidebar