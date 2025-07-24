import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion} from "framer-motion"
const NotificationPage = ({onClose}) => {
  const [newNotifications, setNewNotifications] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const prevIdsRef = useRef(new Set());
  const audioRef = useRef(null);

  // Preload audio
  useEffect(() => {
    audioRef.current = new Audio("/notify.mp3");
  }, []);

  //  Sound permission on user interaction
  const enableSound = () => {
    audioRef.current?.play().catch(() => {});
    setSoundEnabled(true);
  };

  //  Fetch notifications from server
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`https://shortener-backend-tmnq.onrender.com/api/geturl`);
      return res.data;
    } catch (err) {
      console.error("Error fetching stats", err);
      return [];
    }
  };

  const { data: urls = [], isLoading, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    refetchInterval: 1000,
  });

  //  Track new or updated notifications
  useEffect(() => {
    if (!urls || urls.length === 0) return;

    const fresh = urls.filter((note) => !prevIdsRef.current.has(note._id));

    if (fresh.length > 0 && soundEnabled) {
      audioRef.current?.play().catch(() => {});
    }

    setNewNotifications((prev) => {
      const combined = [...fresh, ...prev];

      // remove duplicates and keep latest
      const map = new Map();
      combined.forEach((note) => map.set(note._id, note));

      return Array.from(map.values());
    });

    fresh.forEach((note) => prevIdsRef.current.add(note._id));
  }, [urls, soundEnabled]);

  //  Message generator
  const generateMessage = (note) => {
    if (!note) return "No data";

    const now = new Date();
    const createdAt = new Date(note.createdAt);
    const diffInMinutes = (now - createdAt) / (1000 * 60);

    if (diffInMinutes <= 5) {
      return `🎉 Link just created: ${note.shortUrl}`;
    }

    if (!note.isActive) {
      return `❌ Link expired: ${note.shortUrl}`;
    }

    if (note.clicks > 100) {
      return `🚀 High traffic: ${note.shortUrl} received ${note.clicks} clicks!`;
    }

    if (note.clicks === 0) {
      return `🕐 Link created but not clicked yet: ${note.shortUrl}`;
    }

    return `✅ Link is active: ${note.shortUrl} (${note.clicks} clicks)`;
  };

  //  UI
  if (isLoading) return <p className="text-center p-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center p-4 text-red-500">
        Error loading notifications
      </p>
    );

  return (
    <div 
    
  
    
    className=" w-full ">
     <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur  flex  items-center justify-end w-full  ">
    <motion.div
   
    
    initial={{opacity:0 ,y:400}}
    animate={{opacity:1 ,y:0}}
    exit={{ opacity: 0, y: 400 }} 
    transition={{duration:0.7}}
    


    className="w-[400px] min-h-screen max-h-[100vh] top-0 p-4 bg-gradient-to-tl from-pink-600 to-blue-600 rounded shadow text-black">
     <div className="flex justify-between fixed lg:sticky top-0 left-0">
         <motion.h2 
          initial={{opacity:0 ,y:-200}}
    animate={{opacity:1 ,y:0}}
    transition={{duration:0.7}}
    
         
         className="text-2xl font-bold mb-4">
          <motion.span
          
  animate={{ rotate: [0, 20, -20, 20, -20, 0] }}
    transition={{duration:0.7 ,repeat:Infinity }}
          
          
       className="inline-block mr-2"
          
          >
            
            🔔
            </motion.span>
          
          
          
           Notifications
          
          
          
          
          </motion.h2>
       <button className=" top-7 right-5 text-white text-2xl hover:bg-red-600 h-8 mr-4  rounded"  onClick={onClose}>
             <IoClose />
           </button>
     </div>

      {!soundEnabled && (
        <button
          onClick={enableSound}
          className="mb-4 px-4 py-2 bg-black text-white rounded"
        >
          Enable Notification Sound 🔊
        </button>
      )}

      {newNotifications.length === 0 ? (
        <p className="text-gray-100">No notifications yet.</p>
      ) : (
        <ul className="space-y-3 overflow-y-scroll max-h-screen ">
          {newNotifications.map((note) => (
            <motion.li

              initial={{opacity:0 ,x:60}}
    animate={{opacity:1 ,x:0}}
    transition={{duration:0.7}}
  
    
              key={note._id}
              className="p-4 bg-gradient-to-tr from-pink-500 to-blue-500 rounded hover:bg-gray-200 transition"
            >
              <div className="font-medium">{generateMessage(note)}</div>
              <div className="text-sm text-white">
                {new Date(note.createdAt).toLocaleString()}
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
    </div>
    </div>
  );
};

export default NotificationPage;
