import React, { useEffect, useState } from "react";
import { MdContentCopy, MdModeEdit, MdDelete } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";

import Qrpage from "../../../QRpage/Qrpage";
import EditPage from "../../../EditDeleteFilterPage/EditPage";
import DeletePage from "../../../EditDeleteFilterPage/DeletePage";
import useClipboardCopy from "../../../coustemHook/useClipboardCopy";

const MainBody = ({ OpenFilterPage, urls = [], isLoading, filteredData = [] }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [openQr, setOpenQr] = useState(false);
  const [openEditPage, setOpenEditPage] = useState(false);
  const [openDeletePage, setOpenDeletePage] = useState(false);
  const [selectedShortUrl, setSelectedShortUrl] = useState("");
  const [selectedEditUrl, setSelectedEditUrl] = useState(null);
  const [selectedDeleteUrl, setSelectedDeleteUrl] = useState(null);
  const [urlList, setUrlList] = useState(urls);
  const [filteredList, setFilteredList] = useState(filteredData);
  const { copyToClipboard } = useClipboardCopy();
  const [showDetailsRows, setShowDetailsRows] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setUrlList(urls || []);
  }, [urls]);

  useEffect(() => {
    setFilteredList(filteredData || []);
  }, [filteredData]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const updateShortUrlInState = (updatedUrl) => {
    const updateList = (list) =>
      list.map((url) =>
        url._id === updatedUrl._id ? { ...url, ...updatedUrl } : url
      );
    setUrlList(updateList);
    setFilteredList(updateList);
  };

  const handleDeleteUrlFromState = (deletedId) => {
    setUrlList((prev) => prev.filter((url) => url._id !== deletedId));
    setFilteredList((prev) => prev.filter((url) => url._id !== deletedId));
  };

  const toggleDetails = (id) => {
    setShowDetailsRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) return <p className="text-white text-center">Loading...</p>;

  const renderRows = (data = []) =>
    data.map((url) => {
      const isVisible = showDetailsRows[url._id];
      const isExpired = new Date(url.expiredAt).getTime() <= currentTime;
      const status = isExpired ? "Expired" : url.isActive ? "Active" : "Inactive";

      return (
        <React.Fragment key={url._id}>
          <tr className="relative">
            <td className="px-4 py-2 flex justify-between items-center w-full max-w-[768px]">
              <div className="flex items-center gap-2 truncate">
                <a
                  href={url.shortUrl}
                  className="truncate text-white hover:text-pink-400"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedShortUrl(url.shortUrl);
                     window.open(url.shortUrl, "_blank");
                  }}
                >
                  {url.shortUrl}
                </a>
                <MdContentCopy
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toast.success("Copied");
                    copyToClipboard(url.shortUrl);
                  }}
                  className="text-[16px] cursor-pointer"
                />
              </div>
              <button
                className={`text-white bg-gray-600 rounded-full w-7 h-7 flex justify-center items-center hover:bg-pink-500 md:hidden ${user ? "absolute top-2 right-4" : "ml-2"}`}
                onClick={() => toggleDetails(url._id)}
              >
                {isVisible ? "−" : "+"}
              </button>
            </td>

            <td className="hidden md:table-cell px-4 py-2 truncate max-w-[200px]">
              <a href={url.originalUrl} target="_blank" rel="noreferrer">{url.originalUrl}</a>
            </td>
            <td className="hidden md:table-cell px-4 py-2">
              <span
                onClick={() => {
                  setSelectedShortUrl(url.shortUrl);
                  setOpenQr(true);
                }}
                className="text-blue-400 underline hover:text-pink-500 cursor-pointer"
              >
                View
              </span>
            </td>
            <td className="hidden md:table-cell px-4 py-2">{url.clicks}</td>
            <td className={`hidden md:table-cell px-4 py-2 font-semibold ${isExpired ? "text-red-700" : "text-green-600"}`}>
              {status}
            </td>
            <td className="hidden md:table-cell px-4 py-2">
              {new Date(url.createdAt).toLocaleDateString()}
            </td>
            {user && (
              <td className="hidden md:table-cell px-4 py-2 min-w-[100px]">
                <div className="flex gap-2">
                  <button
                    className="bg-gray-600 rounded-full w-[34px] h-8 flex justify-center items-center hover:bg-blue-700"
                    onClick={() => {
                      setSelectedEditUrl(url);
                      setOpenEditPage(true);
                    }}
                  >
                    <MdModeEdit className="text-white text-[16px]" />
                  </button>
                  <button
                    className="bg-gray-600 rounded-full w-[34px] h-8 flex justify-center items-center hover:bg-red-700"
                    onClick={() => {
                      setSelectedDeleteUrl(url);
                      setOpenDeletePage(true);
                    }}
                  >
                    <MdDelete className="text-white text-[16px]" />
                  </button>
                </div>
              </td>
            )}
          </tr>

          {isVisible && (
            <tr className="md:hidden">
              <td colSpan="7" className="px-4 py-2 text-sm text-white bg-gray-800 rounded-b-lg">
                <div><strong>Original:</strong> {url.originalUrl}</div>
                <hr className="mt-1 mb-1" />
                <div>
                  <strong>QR:</strong>
                  <span
                    onClick={() => {
                      setSelectedShortUrl(url.shortUrl);
                      setOpenQr(true);
                    }}
                    className="underline text-blue-400 ml-1 cursor-pointer"
                  >
                    View
                  </span>
                </div>
                <hr className="mt-1 mb-1" />
                <div><strong>Clicks:</strong> {url.clicks}</div>
                <hr className="mt-1 mb-1" />
                <div>
                  <strong>Status:</strong>
                  <span className={`${isExpired ? "text-red-700" : "text-green-600"}`}>  {status}</span>
                </div>
                <hr className="mt-1 mb-1" />
                <div><strong>Date:</strong> {new Date(url.createdAt).toLocaleDateString()}</div>
                <hr className="mt-1 mb-1" />
                {user && (
                  <div className="mt-2 flex gap-5 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedEditUrl(url);
                        setOpenEditPage(true);
                      }}
                      className="bg-blue-600 rounded px-3 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDeleteUrl(url);
                        setOpenDeletePage(true);
                      }}
                      className="bg-red-600 rounded px-3 py-1"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    });

  return (
    <div className="mainbody">
      <div className="flex items-center justify-center">
        <div className="container w-full relative overflow-x-auto md:overflow-x-auto lg:overflow-x-visible">
          <table className="min-w-[1000px] w-full text-sm text-left text-white border-collapse border-none mt-5">
            <thead className="text-xs uppercase bg-gray-900 font-semibold">
              <tr className="border-none">
                <th className="px-4 py-3">Short Link</th>
                <th className="hidden md:table-cell px-4 py-3">Original Link</th>
                <th className="hidden md:table-cell px-4 py-3">QR Code</th>
                <th className="hidden md:table-cell px-4 py-3">Clicks</th>
                <th className="hidden md:table-cell px-4 py-3">Status</th>
                <th className="hidden md:table-cell px-4 py-3">Date</th>
                {user && <th className="hidden md:table-cell px-4 py-3">Action</th>}
              </tr>
            </thead>
            <tbody className="bg-[rgba(43,47,60,0.3)]">
              {renderRows(OpenFilterPage ? filteredList : urlList)}
            </tbody>
          </table>

          <AnimatePresence>
            {openQr && (
              <Qrpage onClose={() => setOpenQr(false)} shortUrl={selectedShortUrl} />
            )}
            {openEditPage && selectedEditUrl && (
              <EditPage
                onClose={() => {
                  setOpenEditPage(false);
                  setSelectedEditUrl(null);
                }}
                urlData={selectedEditUrl}
                onUpdate={updateShortUrlInState}
              />
            )}
            {openDeletePage && selectedDeleteUrl && (
              <DeletePage
                onClose={() => {
                  setOpenDeletePage(false);
                  setSelectedDeleteUrl(null);
                }}
                urlData={selectedDeleteUrl}
                onDelete={handleDeleteUrlFromState}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MainBody;
