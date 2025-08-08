import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import Button from '@mui/material/Button'
import Logo from '../Home/Header/Logo'
import { IoClose } from 'react-icons/io5'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
const Register = () => {
  const [openRegister, setOpenRegister] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const location = useLocation()
  const navigate = useNavigate();
  //register data
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  //close register modal

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setOpenRegister(false)
      setIsClosing(false)
      navigate("/")
    }, 700) // should match animation duration
  }

  useEffect(() => {
    if (location.pathname === "/register") {
      setOpenRegister(true)
    } else {
      setOpenRegister(false)
    }
  }, [location.pathname])

  if (!openRegister && !isClosing) return null

  const handleRegisterData = async(e) => {
  e.preventDefault();
    try {
      const res = await axios.post("https://shortener-backend-qzvt.onrender.com/api/user/register", {
   name,
    email,
    password
      });
       if (res.status === 201) {
          navigate("/login");
        }

      toast.success("Registration successful");
    } catch (err) {
      console.error("Error fetching URLs:", err);
    }
  }



  return (
    <>
    <ToastContainer/>
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={
          isClosing
            ? { opacity: 0, scale: 0, rotate: -360 }
            : { opacity: 1, scale: 1, rotate: 360 }
        }
        transition={{ duration: 0.7 }}
        className="relative w-[460px] h-[470px] bg-gradient-to-tl from-pink-600 to-blue-800 rounded-xl shadow-lg p-6"
      >

        <Logo />
        <button
          className="absolute top-6 right-6 text-white text-2xl hover:bg-red-600 rounded"
          onClick={handleClose}
        >
          <IoClose />
        </button>

        <h1 className='text-[30px] font-[600] mt-2 text-pink-500'>Create new Account</h1>

        <form className='flex flex-col'>

          {/* Username */}
          <label className="block mb-4 mt-4">
            <div className="flex items-center gap-4 justify-center h-12 px-3 border-2 border-gray-500 bg-white/10 backdrop-blur-md rounded-md">
              <input
                type="text"
                required
                placeholder="Username"
                className='w-full h-8 outline-none bg-transparent'
                 value={name}
  onChange={(e) => setName(e.target.value)}
              />
            </div>
          </label>

          {/* Email */}
          <label className="block mb-4 mt-5">
            <div className="flex items-center gap-4 justify-center h-12 px-3 border-2 border-gray-500 bg-white/10 backdrop-blur-md rounded-md">
              <input
                type="email"
                placeholder="mail@site.com"
                required
                className="w-full h-8 outline-none bg-transparent"
                value={email}
  onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>

          {/* Password */}
          <label className="block mb-4 mt-5">
            <div className="flex items-center gap-4 justify-center h-12 px-3 border-2 border-gray-500 bg-white/10 backdrop-blur-md rounded-md">
              <input
                type="password"
                required
                placeholder="Password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                className="w-full h-8 outline-none bg-transparent text-black placeholder:text-white/70"
                 value={password}
  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>

          <div className='flex items-center justify-center'>
            <Button className='!text-white !bg-blue-700 !mt-2 !w-[180px] !h-12 !normal-case !text-[18px] hover:!bg-blue-500' onClick={handleRegisterData}>
              Register
            </Button>
          </div>

          <span className='flex items-center justify-center mt-5'>
            Already have an account?
            <Link to="/login" className='text-blue-600 underline hover:text-gray-800 ml-2 cursor-pointer'>Login</Link>
          </span>

        </form>
      </motion.div>
    </div>
    </>
  )
}

export default Register
