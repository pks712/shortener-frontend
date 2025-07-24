// hooks/useAuth.js
import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://shortener-backend-qzvt.onrender.com/api/user/getuser", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.log("Not logged in" + err);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return user;
};

export default useAuth;
