import React, {  useState } from 'react';
import { HiMiniLink } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import axios from 'axios';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import useUrl from '../../../coustemHook/useUrl';
import useAutoPasteFromClipboard from '../../../coustemHook/useClipboardread';
import { useTheme } from '../BodyRightSidebar/useThemeContext';

import UrlPopPage from '../../../CreateUrlPage.jsx/UrlPopPage';
import FreeLinkOver from '../../FreeLimitLinkOver/FreeLinkOver';


const GUEST_LINK_LIMIT = 3;

const InputUrlCom = () => {

  const { autoPaste, setAutoPaste, originalUrl, setOriginalUrl, pasteFromClipboard } = useAutoPasteFromClipboard();
  const { theme } = useTheme();
  const { urls, addUrl } = useUrl();
  const [showUrlPop, setShowUrlPop] = useState(false);
  const [latestUrlData, setLatestUrlData] = useState(null);
  const [showLinkOverPage, setShowLinkOverPage] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleFocus = () => {
    if (autoPaste) {
      pasteFromClipboard();
    }
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;

    const isGuest = !user;
    const reachedLimit = isGuest && urls?.length >= GUEST_LINK_LIMIT;

    if (reachedLimit) {
      setShowLinkOverPage(true);
      return;
    }

    try {
      const res = await axios.post("https://shortener-backend-tmnq.onrender.com/api/shorturl", {
        originalUrl,
      });

      addUrl(res.data);

      const allowPopup = !isGuest || urls.length < GUEST_LINK_LIMIT;
      if (allowPopup) {
        setLatestUrlData(res.data);
        setShowUrlPop(true);
      }

      setOriginalUrl("");
    } catch (err) {
      console.error("Failed to shorten URL", err);
    }
  };

  const handleCloseLinkOverPopup = () => {
    setShowLinkOverPage(false);
  };

  return (
    <div>
      {/* FORM */}
      <motion.form
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className='flex items-center justify-center mt-7'
      >
        <div className='bg-gradient-to-l from-pink-900 to-blue-900 w-[700px] h-18 rounded-full border-3 border-gray-500 flex items-center relative'>
          <span className='ml-5 text-3xl'><HiMiniLink /></span>
          <input
            type='text'
            placeholder='Enter the URL here'
            className='absolute ml-15 focus:outline-none w-[460px] h-13'
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            onFocus={handleFocus}
          />
          <div className="flex justify-end w-full">
            <Button
              onClick={handleShorten}
              type="submit"
              className="!text-white !bg-blue-600 !rounded-full !h-15 !mr-1 !w-[150px] hover:!bg-pink-500"
            >
              Shorten Now!
            </Button>
          </div>
        </div>
      </motion.form>

      {/* AUTOPASTE SWITCH */}
      <motion.div
        initial={{ opacity: 0, x: 150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className={`switch flex items-center justify-center mt-3 gap-4 ${theme === "light" ? "text-black" : "text-white"}`}
      >
        <FormControlLabel
          control={
            <Switch className='!h-9 !mr-2' checked={autoPaste} onChange={() => setAutoPaste(!autoPaste)} />
          }
          label="Auto Paste from Clipboard"
        />
      </motion.div>

      {/* SHORT LINK POPUP */}
      <AnimatePresence>
        {showUrlPop && (
          <UrlPopPage
            key={latestUrlData?.shortUrl}
            onClose={() => setShowUrlPop(false)}
            shortUrl={latestUrlData?.shortUrl}
          />
        )}
      </AnimatePresence>

      {/* FREE LINK LIMIT POPUP */}
      <AnimatePresence>
        {!user && showLinkOverPage && (
          <FreeLinkOver onClose={handleCloseLinkOverPopup} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputUrlCom;
