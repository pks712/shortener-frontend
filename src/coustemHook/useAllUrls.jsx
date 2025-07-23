// src/coustemHook/useAllUrls.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAllUrls = () => {
  const fetchStats = async () => {
    const res = await axios.get("http://localhost:8080/api/geturl");
    return res.data;
  };

  const { data: urls, isLoading, error } = useQuery({
    queryKey: ["all-urls"],
    queryFn: fetchStats,
    refetchInterval: 1000,
  });

  return { urls, isLoading, error };
};

export default useAllUrls;
