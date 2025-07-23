import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { IoIosLogIn } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <div className='header fixed w-full bg-black lg:sticky left-0 top-0 z-[101]'>
      <div className="flex items-center justify-between w-full p-4 lg:p-5">
        {/* Logo */}
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Right Side (Toggle or Buttons) */}
        <div>
          {isDesktop ? (
            <div className="flex items-center gap-4 justify-end">
              <Link to="login">
                <Button className='!text-white !bg-gray-600 !rounded-full !w-[95px] !h-11 flex gap-2 hover:!bg-pink-500'>
                  Login <IoIosLogIn className='text-[20px]' />
                </Button>
              </Link>
              <Link to="register">
                <Button disableElevation className='!text-white !bg-blue-600 !rounded-full !w-[150px] !h-11 hover:!bg-pink-500'>
                  Register Now
                </Button>
              </Link>
            </div>
          ) : (
            <HiMenu
              onClick={toggleDrawer(true)}
              className='text-white text-3xl cursor-pointer'
            />
          )}
        </div>
      </div>

      {/* Drawer for mobile/tablet */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          className="bg-gradient-to-br from-pink-500 to-blue-500 h-full flex flex-col gap-2"
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <h2 className='text-xl font-semibold  text-white p-2'>Menu</h2>
<hr className='!w-full' />
          <Link to="login" className='p-2'>
            <Button fullWidth className='!text-white !bg-gray-700 !rounded-full !h-11 mb-4 hover:!bg-gray-800 '>
              Login <IoIosLogIn className='text-[20px] ml-2' />
            </Button>
          </Link>

          <Link to="register" className='p-2'>
            <Button fullWidth className='!text-white !bg-blue-600 !rounded-full !h-11 hover:!bg-pink-500'>
              Register Now
            </Button>
          </Link>
        </Box>
      </Drawer>

      <hr />
    </div>
  );
};

export default Header;
