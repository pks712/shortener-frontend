// src/coustemHook/useFilteredUrls.js

const useFilteredUrls = ({ urls, search, status, fromDate, toDate }) => {
    
  return (urls || []).filter((item) => {
    const matchSearch =
      item.shortUrl.toLowerCase().includes(search.toLowerCase()) ||
      item.originalUrl.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      status === "All" ||
      (status === "Active" && item.active) ||
      (status === "Expired" && !item.active);

    const matchDate =
      (!fromDate || new Date(item.date) >= new Date(fromDate)) &&
      (!toDate || new Date(item.date) <= new Date(toDate));

    return matchSearch && matchStatus && matchDate;
  });
};

export default useFilteredUrls;
