import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdCircleNotifications } from "react-icons/md";
import { AnimatePresence } from "framer-motion";

import Logo from "../../Home/Header/Logo";
import InputUrlCom from "../../Home/BodyParts/BodyHeader/InputUrlCom";
import MainBodyHeader from "../Body/MainBody/MainBodyHeader";
import NotificationPage from "../../NotificationPage/NotificationPage";

const Layout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openNotifiPage, setOpenNotifiPage] = useState(false);

  return (
    <div className="relative mainlayout w-full min-h-screen  bg-black md:w-full">
      
 
      <div className="lg:sticky top-0 z-[101] bg-black h-[152px] w-full">
        <div className="flex items-center justify-between gap-4 pb-2 w-full">
          
          {/* Logo */}
          <div className="pb-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Input */}
          <div>
            <InputUrlCom />
          </div>

          {/* Welcome + Notification */}
          <div className="flex gap-2 pb-4">
            <Button className="!flex flex-col !items-center !px-4 !py-2 !bg-gray-900 !text-white !rounded-full hover:!bg-gray-800 !w-[150px] !h-15">
              <span className="capitalize text-[12px] text-gray-400">Welcome</span>
              <span className="capitalize flex">{user?.name || "User"}</span>
            </Button>

            <Button className="!rounded-full" onClick={() => setOpenNotifiPage(true)}>
              <MdCircleNotifications className="text-5xl text-blue-600 bg-white rounded-full hover:!bg-pink-500" />
            </Button>
          </div>
        </div>
      </div>

    
      <div className="lg:sticky top-[152px] z-[100] w-full">
        <MainBodyHeader />
      </div>

      {/* NOTIFICATION PAGE */}
      <AnimatePresence>
        {openNotifiPage && (
          <NotificationPage onClose={() => setOpenNotifiPage(false)} />
        )}
      </AnimatePresence>

      {/* PAGE CONTENT */}
      <Outlet />
    </div>
  );
};

export default Layout;
