import React, { useState } from "react";
import { MdOutlineHistory } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import { TbHandClick } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";



const MainBodyHeader = () => {
  const [value, setValue] = useState("one");
  const location = useLocation();
  const currentPath = location.pathname;

  const tabValue =
  currentPath === "/" || currentPath === "/dashboard/history"
    ? "/dashboard/history"
    : currentPath.startsWith("/dashboard/statspage")
    ? "/dashboard/statspage"
    : currentPath.startsWith("/dashboard/setting")
    ? "/dashboard/setting"
    : false;


  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };
  return (
    <div className="MainBodyContent flex items-center justify-center gap-15  bg-[rgba(18,14,24,1)] w-full ">
      <Box sx={{ width: "100%" }} className="flex items-center justify-center">
        <Tabs
          value={tabValue}
       
          onChange={handleChange}
       
          aria-label="wrapped label tabs example"
        >
          <Tab
            value="/dashboard/history"
            label={
             tabValue === "/dashboard/history"?
              
              
               <motion.div
      className={`flex items-center gap-2 hover:text-pink-500 ${
       tabValue === "/dashboard/history" ? "text-blue-600" : ""
      }`}

      animate={ { opacity: [0,1,0,1] ,scale:[0.5 ,1,0.5,1] }}
      transition={{ duration: 2 ,repeat:Infinity,repeatDelay:2}}
    >
     <Link to="/dashboard/history" className="flex items-center gap-2" >
             <MdOutlineHistory className="text-2xl" />
                <span className={`text-[18px]  `}>History</span>
            </Link>
    </motion.div>
               :
              <div className={`flex items-center gap-2 hover:text-pink-500 `}>
            <Link to="/dashboard/history" className="flex items-center gap-2" >
             <MdOutlineHistory className="text-2xl" />
                <span className="text-[18px]">History</span>
            </Link>  
              </div>
            }
            className="!text-white"
          >
         
          </Tab>

          <Tab
            value="/dashboard/statspage"
            label={ tabValue === "/dashboard/statspage"?   

             <motion.div
      className={`flex items-center gap-2 hover:text-pink-500 ${
       tabValue === '/dashboard/statspage' ? "text-blue-600" : ""
      }`}
     animate={ { opacity: [0,1,0,1] ,scale:[0.5 ,1,0.5,1] }}
      transition={{ duration: 2 ,repeat:Infinity,repeatDelay:2}}
    >
        <Link to="/dashboard/statspage" className="flex items-center gap-2" >    <IoIosStats className="text-2xl" />
                <span className="text-[18px]">Statistics</span> </Link> 
    </motion.div>


              
              
              :

              <div className={`flex items-center gap-2 mr-2 hover:text-pink-500 `}>
              
          <Link to="/dashboard/statspage"  className="flex items-center gap-2" >    <IoIosStats className="text-2xl" />{" "}
                <span className="text-[18px]">Statistics</span> </Link> 
              </div>
            }
            className="!text-white"
          />
         
          <Tab
            value='/dashboard/setting'
            label={
            currentPath.startsWith("/dashboard/setting") ?

               <motion.div
      className={`flex items-center gap-2 hover:text-pink-500 ${
        tabValue ==='/dashboard/setting' ? "text-blue-600" : ""
      }`}
    animate={ { opacity: [0,1,0,1] ,scale:[0.5 ,1,0.5,1] }}
      transition={{ duration: 2 ,repeat:Infinity,repeatDelay:2 }}
    >
           <Link to ="/dashboard/setting"  className="flex items-center gap-2">   <IoSettingsOutline className="text-2xl" />
                <span className="text-[18px]">Settings</span> </Link>
    </motion.div>
              
              :
              <div className={`flex items-center gap-2 mr-2 hover:text-pink-500`}>
            
          <Link to ="/dashboard/setting"  className="flex items-center gap-2"  >   <IoSettingsOutline className="text-2xl" />
                <span className="text-[18px]">Settings</span> </Link> 
              </div>
            }
            className="!text-white"
          />
        </Tabs>
      </Box>
    </div>
  );
};

export default MainBodyHeader;
