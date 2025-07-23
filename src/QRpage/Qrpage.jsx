import React from 'react'
import { IoClose } from 'react-icons/io5'
import { QRCodeCanvas } from "qrcode.react";

import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import {motion } from "framer-motion"

const Qrpage = ({shortUrl ,onClose}) => {
 
  return (
 
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur  flex items-center justify-center">
          <motion.div 
          
            initial={{opacity:0 ,scale:0 ,rotate:0}}
    animate={{opacity:1 ,scale:1 ,rotate:360}}
   exit={{ opacity: 0, scale:0,rotate:-360 }} 
    transition={{duration:0.7}}
          
          className="relative w-[460px] h-[400px] bg-gradient-to-tl from-pink-500 to-blue-500 rounded-xl shadow-lg p-6 flex flex-col items-center">
     
   
     <button className="absolute top-7 right-5 text-white text-2xl hover:bg-red-600 rounded  "  onClick={onClose}>
       <IoClose />
     </button>
           <h1 className="text-[25px] font-semibold  text-white">Your QR Code is ready! 🎉</h1>
           <p className="text-[16px] text-white mt-2 text-center">You can scan it directly or share it with others.</p>



            < QRCodeCanvas value={shortUrl}  size ={150} className='mt-4 ' />
            <a  href ={shortUrl} className="mt-4 text-sm break-words text-center hover:text-pink-600 text-blue-900 ">{shortUrl}</a>
          

             <div className="flex w-full mt-6 gap-3 px-2 justify-between">
                      <a
                        href="https://wa.me/"
                        className="flex-1 flex items-center justify-center h-12 bg-white rounded-md hover:bg-green-100 transition group"
                      >
                        <FaWhatsapp className="text-green-600 text-2xl group-hover:scale-120" />
                      </a>
                      <a
                        href="https://facebook.com"
                        className="flex-1 flex items-center justify-center h-12 bg-white rounded-md hover:bg-blue-100 transition group"
                      >
                        <FaFacebookF className="text-blue-600 text-2xl group-hover:scale-120" />
                      </a>
                      <a
                        href="https://instagram.com"
                        className="flex-1 flex items-center justify-center h-12 bg-white rounded-md hover:bg-pink-100 transition group"
                      >
                        <FiInstagram className="text-pink-500 text-2xl group-hover:scale-120" />
                      </a>
                      <a
                        href="https://x.com"
                        className="flex-1 flex items-center justify-center h-12 bg-white rounded-md hover:bg-gray-400 transition group"
                      >
                        <FaXTwitter className="text-black text-2xl group-hover:scale-120" />
                      </a>
                    </div>
           </motion.div>
          
             </div>
              
  )
}

export default Qrpage