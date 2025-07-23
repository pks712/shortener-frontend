import Button from '@mui/material/Button'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Security = () => {

 const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');




const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      const res = await axios.put("http://localhost:8080/api/user/change-password", {
        currentPassword,
        newPassword
      }, {
        withCredentials: true
      });

      alert(res.data.message);
      window.location.href = "/login"; 
    } catch (err) {
      alert(err.response?.data?.message || "Password change failed");
    }


  }


  return (
    
  <div className="container   px-4 pt-6 backdrop-blur-md bg-white/10 border border-white/20 
 min-h-screen text-white w-[1080px]">
      <h1 className="text-3xl font-semibold ">Security & authentication</h1>
  <h2 className="text-[23px] font-semibold mt-2">Change password</h2>
  <p className='text-[16px] font-[350] mt-2 mb-8'>You will be required to login after changing your password</p>

<div className='inputs mt-2 flex flex-col'>
  <label htmlFor='name' className='text-[18px]'>Current password</label>
<input  
  id="name"
    type="text"
    placeholder="Enter your name"
     value={currentPassword}
  onChange={(e) => setCurrentPassword(e.target.value)}
    className="px-3 py-2 mt-2 mb-6  border border-gray-300 rounded w-full text-white"/>

    <label htmlFor='name' className='text-[18px]'>New password</label>
<input  
  id="name"
    type="text"
    placeholder="Enter your name"
     value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
    className="px-3 py-2 mt-2 mb-6 border border-gray-300 rounded w-full text-white"/>


    <label htmlFor='name' className='text-[18px]'>Confirm new password</label>
<input  
  id="name"
    type="text"
    placeholder="Enter your name"
      value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
    className="px-3 py-2 mt-2 mb-6 border border-gray-300 rounded w-full text-white"/>
    <div>
        <Button className='!text-white !bg-blue-500 !mt-5 !w-[200px] !h-12' onClick={handleChangePassword}> Change password</Button>
    </div>
 
</div>
</div>

   
  )
}

export default Security