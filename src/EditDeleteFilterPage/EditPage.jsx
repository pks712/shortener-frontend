import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { BiSolidEditAlt } from "react-icons/bi";
import { IoClose } from 'react-icons/io5';
import { motion } from "framer-motion";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";

const EditPage = ({ onClose,  urlData ,onUpdate }) => {
 
  const [openEditInput, setOpenEditInput] = useState(false);
  const [newShortId, setNewShortId] = useState( urlData?.shortId); // 👈 editable slug

  
  const handleUpdate = async () => {
  if (!urlData) 
    {alert("No short URL data provided");};
    try {
      console.log("url data" ,urlData)
      if (!newShortId.trim()) {
        toast.error("Short URL cannot be empty");
        return;
      }

      const res = await axios.patch(
         `https://shortener-backend-4w6z.onrender.com/api/user/short-url/${ urlData.shortId}`,
        { newShortId },
        { withCredentials: true }
      );
if (res.status === 200) {
  toast.success("Short URL updated successfully");
  onUpdate({ ...res.data.url, _id: urlData._id }); // _id ensure karo
  onClose();
 
}

    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  return (
   
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 400 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 400, y: 200 }}
        transition={{ duration: 0.7 }}
        className="relative w-[460px] h-[400px] bg-gradient-to-tl from-pink-500 to-blue-500 rounded-xl shadow-lg flex flex-col p-6"
      >
        <div>
          <h1 className="text-[30px] font-semibold text-white">Edit link</h1>
          <button
            className="absolute top-4 right-5 text-white text-2xl hover:bg-red-600 rounded"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>

        <span className="text-[20px] font-[400] mt-3">Short URL</span>

        <div className="flex flex-col gap-4">
          {openEditInput ? (
            <div className="flex gap-2 items-center mt-4">
              <input
                type="text"
                className="w-[210px] h-12 bg-pink-900 rounded-md focus:outline-blue-500 placeholder:text-white placeholder:p-3 text-white"
                value="bit.ly"
                disabled
              />
              <span className="text-2xl">/</span>
              <input
                type="text"
                className="w-[210px] h-12 bg-pink-900 rounded-md focus:outline-blue-500 placeholder:text-white placeholder:p-3 text-white"
                value={newShortId}
                onChange={(e) => setNewShortId(e.target.value)}
              />
            </div>
          ) : (
            <div className="flex items-center gap-4 mt-2">
              <span className="w-[150px] h-12 bg-pink-900 mt-2 rounded flex items-center justify-center">
                bit.ly/{ urlData.shortId}
              </span>
              <Button
                className="!text-white !bg-blue-700 !mt-2 !w-[180px] !h-12 !normal-case !text-[16px] hover:!bg-blue-500 group overflow-hidden"
                onClick={() => setOpenEditInput(true)}
              >
                <span className="group-hover:scale-110 flex items-center">
                  <BiSolidEditAlt className="text-2xl text-white" /> Edit back-half
                </span>
              </Button>
            </div>
          )}

          <div className="mt-4">
            <span className="text-[20px] font-[400] mt-3">Original URL</span>
            <div className="w-full h-12 bg-pink-900 mt-2 rounded flex items-center">
              <span className="ml-2 text-[18px] truncate text-white">
                { urlData.originalUrl}
              </span>
            </div>

            <div className="flex gap-2 justify-end mt-8">
              <Button
                className="!text-white !bg-gray-400 !mt-2 !w-[100px] !h-12 !normal-case !text-[16px] hover:!bg-gray-600 group"
                onClick={onClose}
              >
                <span className="group-hover:scale-120">Cancel</span>
              </Button>
              <Button
                className="!text-white !bg-blue-700 !mt-2 !w-[100px] !h-12 !normal-case !text-[16px] hover:!bg-blue-500 group"
                onClick={handleUpdate}
              >
                <span className="group-hover:scale-120"  >Save</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
       <ToastContainer/>
    </div>
  );
};

export default EditPage;
