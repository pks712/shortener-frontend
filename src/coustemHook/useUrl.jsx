import { createContext, useContext, useState } from "react";

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);

  const addUrl = (newUrl) => {
    setUrls((prev) => [newUrl, ...prev]);
  };

  const setAllUrls = (data) => {
    setUrls(data);  // ये है तुम्हारा setAllUrls!
  };

  return (
    <UrlContext.Provider value={{ urls, addUrl, setAllUrls }}>
      {children}
    </UrlContext.Provider>
  );
};

const useUrl = () => useContext(UrlContext);
export default useUrl;
