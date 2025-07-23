import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import useAuth from '../../../coustemHook/UserData/useFetchuUsers';


const Profile = () => {

  const user = useAuth();
  
  const [newName, setNewName] = useState('');

  useEffect(() => {
  if (user?.name) {
    setNewName(user.name);
  }
}, [user]);


 const handleUpdateDisplayName = async () => {
  try {
    if (!newName.trim()) {
      toast.error("Display name cannot be empty");
      return;
    }

    if (newName ===  user?.name  ) {
      toast.info("Name is already same as current");
      return;
    }

    const res = await fetch("https://shortener-backend-4w6z.onrender.com/api/user/update-profile", {
      method: "PATCH",
      credentials: "include", // important for cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });
   
    const data = await res.json();
    console.log("Update response:", data);

    if (res.ok) {
      toast.success("Display name updated successfully");
      setNewName(data.user.name);
      console.log("Updated user:", data.user);
    } else {
      toast.error(data.message || "Update failed");
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.error("Update error:", error);
  }
};

   


  return (
    <>
      <ToastContainer/>
    <div className="container ml-0 px-4 pt-6 backdrop-blur-md bg-white/10 border border-white/20  
min-h-screen text-white w-[1080px]">
      <h1 className="text-3xl font-semibold">Profile</h1>

      <div className="mt-4 flex flex-col gap-4">
        {/* Display Name */}
        <div>
          <h2 className="text-[25px] mb-1.5">Display Name</h2>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            placeholder="Display Name"
            className="px-3 py-2 border border-gray-300 rounded w-full max-w-md text-white"
          />
        </div>

        <div>
          <Button
            className='!text-white !bg-blue-500 !mt-5 !w-[200px] !h-12'
            onClick={newName ===  user?.name ? null : handleUpdateDisplayName}
          >
            Update Display Name
          </Button>
        </div>

        {/* Email Table */}
        <div>
          <h1 className="text-[25px] mt-8">Email addresses</h1>
          <p className="text-[16px] font-[350] text-gray-300">
           Your verified email address is used for receiving notifications and logging in.
          </p>

          <div className="mt-4">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-white rounded-t-lg overflow-hidden">
                  <th className="px-4 py-3 w-[40%]">Email</th>
                  <th className="px-4 py-3 w-[30%]">Status</th>
                  <th className="px-4 py-3 w-[30%]">Primary</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-600 rounded-lg overflow-hidden">
                  <td className="px-4 py-3 w-[40%]">{user?.email || ""}</td>
                  <td className="px-4 py-3 w-[30%]">Verified</td>
                  <td className="px-4 py-3 w-[30%]">
                    <input
                      type="radio"
                      name="choice"
                      value="one"
                      className="h-5 w-5 accent-pink-500"
                      defaultChecked
                    />
                  </td>
                </tr>
              </tbody>
            </table>
           
          </div>
        </div>
      </div>
    
    </div>
    </>
  );
};

export default Profile;
