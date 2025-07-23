import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import { IoCloseOutline } from "react-icons/io5";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LayoutSetting = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.startsWith('/dashboard/setting')) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [location.pathname]);

const handleLogout = async () => {
  try {


    await axios.get("http://localhost:8080/api/user/logout", {
     withCredentials: true 
    });

    
   localStorage.removeItem("user");

    // Redirect to login page
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
    alert("लॉगआउट करते समय कुछ गड़बड़ हुई");
  }
}

  return (
    <div className="flex">
      {/* Sidebar */}
      {open && (
        <div className="w-[250px] bg-gradient-to-tl from-pink-700 to-blue-800 text-white  fixed lg:sticky left-0  top-0 max-h-[395px] min-h-[395px]   ">
          <div className="flex justify-between items-center mt-4 p-4">
            <h1 className="text-[23px] font-bold">Setting</h1>
            <IoCloseOutline
              className="text-2xl cursor-pointer rounded hover:bg-red-500 hover:text-white"
              onClick={() => {setOpen(false)
                navigate("/dashboard/history")
              }}
            />
          </div>

          <Link to="profile" >
            <ListItemButton className="hover:!bg-gradient-to-tl from-pink-700 to-blue-700 !text-white !rounded-md" >
              Profile
            </ListItemButton>
          </Link>

          <Link to="security">
            <ListItemButton className="hover:!bg-gradient-to-tl from-pink-700 to-blue-700 !text-white !rounded-md">
              Security & Authentication
            </ListItemButton>
          </Link>

          <Link to="accesshistory">
            <ListItemButton className="hover:!bg-gradient-to-tl from-pink-700 to-blue-700 !text-white !rounded-md">
              Access History
            </ListItemButton>
          </Link>



          <Button className='!text-white !bg-gray-500 hover:!bg-red-600 !mt-5 !w-[200px] !h-12 !ml-5' onClick={handleLogout}> Logout</Button>
        </div>
      )}

      {/* Content Area */}
    {open && (<div className="overflow-y-auto max-h-[395px] custom-scrollbar overflow-x-hidden">
        <Outlet />
      </div>)}
    </div>

  );
};

export default LayoutSetting;
