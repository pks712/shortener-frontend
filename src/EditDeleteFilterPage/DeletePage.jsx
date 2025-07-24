import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import React from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const DeletePage = ({ onClose, urlData, onDelete }) => {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`https://shortener-backend-qzvt.onrender.com/api/user/shorturl-delete/${urlData.shortId}`);
      if (res.status === 200) {
        toast.success("Deleted successfully");
        onDelete(urlData._id);   // ✅ table से हटाओ
        onClose();               // ✅ popup बंद करो
      }
    } catch (err) {
      toast.error("Failed to delete");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 400 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -400, x: -200 }}
        transition={{ duration: 0.7 }}
        className="relative w-[450px] h-[200px] bg-gradient-to-tl from-pink-500 to-blue-500 rounded-xl shadow-lg flex flex-col p-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-red-600">Confirm Deletion</h2>
          <button
            className="text-white text-2xl hover:bg-red-600 rounded"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>

        <h2 className="text-xl font-bold mb-1">Are you sure you want to delete?</h2>
        <p className="text-[16px] font-[400] text-white">This action cannot be undone.</p>

        <div className="flex gap-4 mt-auto justify-end">
          <Button
            className="!bg-gray-300 !text-black !px-4 !py-2 !rounded-md"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="!bg-red-500 !text-white !px-4 !py-2 !rounded-md !mr-2"
            onClick={handleDelete}
          >
            Yes, Delete
          </Button>
        </div>
      </motion.div>
      <ToastContainer/>
    </div>
  );
};

export default DeletePage;
