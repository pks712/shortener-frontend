import Button from '@mui/material/Button'
import React from 'react'
import useAuth from '../../../coustemHook/UserData/useFetchuUsers'
 import axios from "axios";

const AccessHistory = () => {

  const user = useAuth();

const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm("क्या आप वाकई अपना अकाउंट डिलीट करना चाहते हैं?");
  if (!confirmDelete) return;

  try {
    

    await axios.delete("https://shortener-backend-qzvt.onrender.com/api/user/delete-account", {
      withCredentials: true 
    });

 localStorage.removeItem("user");

    window.location.href = "/login"; 
  } catch (error) {
    console.error(error);
    alert("अकाउंट डिलीट नहीं हुआ, कुछ गड़बड़ है।");
  }
};

  return (
  <div className="container  ml-0 px-4 pt-6 backdrop-blur-md bg-white/10 border border-white/20 
 max-h-[450px] text-white w-[1150px]">
      <h1 className="text-3xl font-semibold">Access history</h1>
      <p className='text-[16px] font-[350] mt-2 mb-8'>Access history
You're viewing recent activity on your account. Logging out will apply to all devices currently connected to Bitly.</p>

<div className='container'>
  <div className='flex'>
<div className='w-[60%] flex flex-col'>
  <h2 className='text-[18px] font-[500]'>Email Address Added</h2>
  <span className='text-gray-400'>{user?.email || ""}</span>
    <span className='text-gray-400'>Email successfully linked to your account.</span>

</div>
<div className='w-[40%] mt-4 flex justify-end mr-6'>
{user?.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}
</div>
</div>
<hr className='mt-5'></hr>
<div className='flex mt-5'>
<div className='w-[60%] flex flex-col'>
  <h2 className='text-[18px] font-[500]'>Log In</h2>

    <span className='text-gray-400'> You logged into your account on </span>

</div>
<div className='w-[40%] mt-4 flex justify-end mr-6'>
{user?.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}
</div>
</div>
<hr className='mt-5'></hr>
<Button className='!text-white !bg-red-500 hover:!bg-red-300 !mt-10 !w-[200px] !h-12 !mb-4 ' onClick={handleDeleteAccount}> Delete your Account</Button>
</div>
      </div>
  )
}

export default AccessHistory