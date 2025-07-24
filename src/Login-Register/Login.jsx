import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import Button from '@mui/material/Button'
import Logo from '../Home/Header/Logo'
import { IoClose } from 'react-icons/io5'
import axios from 'axios';
import {ToastContainer ,toast } from 'react-toastify';
const Login = () => {
  const [openLogin, setOpenLogin] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogin = () => {
    setIsClosing(true)
    setTimeout(() => {
      setOpenLogin(false)
      setIsClosing(false)
      navigate("/")
    }, 700)
  }

  useEffect(() => {
    if (location.pathname === "/login") {
      setOpenLogin(true)
    } else {
      setOpenLogin(false)
    }
  }, [location.pathname])

  if (!openLogin && !isClosing) return null;


const handleLoginData = async(e) => {
  e.preventDefault();

try {
        const res = await axios.post("https://shortener-backend-qzvt.onrender.com/api/user/login" ,{email ,password},  { withCredentials: true });
      toast.success("Login successful");
      localStorage.setItem("user", JSON.stringify(res.data.user));

        if (res.status === 200) {
          navigate("/dashboard");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");
      }

}




  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={isClosing
          ? { opacity: 0, scale: 0, rotate: -360 }
          : { opacity: 1, scale: 1, rotate: 360 }}
        transition={{ duration: 0.7 }}
        className="relative w-[470px] h-[470px] bg-gradient-to-tl from-pink-600 to-blue-800 rounded-xl shadow-lg p-6"
      >

        <Logo />
        <button className="absolute top-6 right-6 text-white text-2xl hover:bg-red-600 rounded" onClick={handleLogin}>
          <IoClose />
        </button>

        <h1 className='text-[30px] font-[600] mt-4 text-pink-500'>Login with your Account</h1>

        <form className='flex flex-col'>
          {/* Email */}
          <div>
            <label className="block mb-4 mt-6">
              <div className="flex items-center gap-4 justify-center h-12 px-3 border-2 border-gray-500 bg-white/10 backdrop-blur-md rounded-md">
                <input
                  type="email"
                  placeholder="mail@site.com"
              className="w-full h-8 outline-none bg-transparent"
                   value={email}
  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </label>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-4 mt-6">
              <div className="flex items-center gap-4 justify-center h-12 px-3 border-2 border-gray-500 bg-white/10 backdrop-blur-md rounded-md">
                <input
                  type="password"
                  placeholder="Password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  className="w-full h-8 outline-none bg-transparent text-white placeholder:text-white/70"
                   value={password}
  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </label>
          </div>

          <div className='flex items-center justify-center'>
            <Button className='!text-white !bg-blue-700 !mt-4 !w-[180px] !h-12 ' onClick={handleLoginData}>Login</Button>
          </div>

          <span className='flex items-center justify-center mt-6'>
            Don’t have an account?
            <Link to="/register" className='text-blue-600 underline hover:text-gray-800 ml-2 cursor-pointer'>
              Register
            </Link>
          </span>
        </form>
      </motion.div>
    </div>
  )
}

export default Login
