import React from "react";
import Button from "@mui/material/Button";
import { MdContentCopy } from "react-icons/md";
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import useClipboardCopy from "../coustemHook/useClipboardCopy";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const UrlPopPage = ({ shortUrl, onClose }) => {
  const { copyToClipboard } = useClipboardCopy();

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0, y: -300 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0, rotate: 360 }}
        transition={{ duration: 0.7 }}
        className="relative w-[460px] h-[400px] bg-gradient-to-tl from-pink-500 to-blue-500 rounded-xl shadow-lg p-6 flex flex-col items-center"
      >
        <button
          className="absolute top-7 right-5 text-white text-2xl hover:bg-red-600 rounded"
          onClick={onClose}
        >
          <IoClose />
        </button>

        <h1 className="text-[25px] font-semibold text-white">
          Your link is ready! 🎉
        </h1>
        <p className="text-[16px] text-white mt-2 text-center">
          Copy the link below to share it or choose a platform
          <br /> to share.
        </p>

        <div className="w-full h-[150px] bg-[#36404d] mt-6 rounded-lg flex flex-col items-center justify-center gap-3 px-3">
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[18px] text-white break-all text-center hover:text-pink-400"
          >
            {shortUrl}
          </a>
          <Button
            className="!text-white !bg-blue-700 !mt-2 !w-[150px] !h-12 !normal-case !text-[16px] hover:!bg-blue-500"
            onClick={() => {
              toast.success("Copied successfully");
              copyToClipboard(shortUrl);
            }}
          >
            <MdContentCopy className="text-[16px] mr-2" /> Copy link
          </Button>
        </div>

        <div className="flex w-full mt-6 gap-3 px-2 justify-between">
          <a href="https://wa.me/" className="flex-1 flex items-center justify-center h-12 bg-white rounded-md hover:bg-green-100 transition">
            <FaWhatsapp className="text-green-600 text-2xl" />
          </a>
          <a href="https://facebook.com" className="flex-1 flex items-center justify-center h-12 bg-white rounded-md hover:bg-blue-100 transition">
            <FaFacebookF className="text-blue-600 text-2xl" />
          </a>
          <a href="https://instagram.com" className="flex-1 flex items-center justify-center h-12 bg-white rounded-md hover:bg-pink-100 transition">
            <FiInstagram className="text-pink-500 text-2xl" />
          </a>
          <a href="https://x.com" className="flex-1 flex items-center justify-center h-12 bg-white rounded-md hover:bg-gray-200 transition">
            <FaXTwitter className="text-black text-2xl" />
          </a>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default UrlPopPage;
