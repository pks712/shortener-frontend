import Button from '@mui/material/Button'
import BodyRightSidebar from '../BodyRightSidebar/BodyRightSidebar';
import { useTheme } from '../BodyRightSideBar/useThemeContext';
import InputUrlCom from './InputUrlCom';
import { motion } from "framer-motion";
import MainBody from '../../../MainHomePage/Body/MainBody/MainBody';
import useAllUrls from '../../../coustemHook/useAllUrls';
import FreeLinkOver from '../../FreeLimitLinkOver/FreeLinkOver';
import { Link } from 'react-router-dom';

const BodyHeader = () => {
  const { theme } = useTheme();
  const { urls, isLoading } = useAllUrls();
  const FREE_LIMIT = 3;
  const currentCount = urls?.length || 0;
  const remainingLinks = Math.max(FREE_LIMIT - currentCount, 0);

  const user = JSON.parse(localStorage.getItem("user"));
  const displayUrls = user ? (urls || []) : (urls || []).slice(0, 3);

  const words = [
    { chars: ["S"], className: "text-blue-600" },
    { chars: ["h"], className: "bg-gradient-to-l to-blue-500 from-blue-400 bg-clip-text text-transparent" },
    { chars: ["o"], className: "bg-gradient-to-l to-blue-400 from-pink-400 bg-clip-text text-transparent" },
    { chars: ["r"], className: "bg-gradient-to-l to-pink-400 from-pink-400 bg-clip-text text-transparent" },
    { chars: ["t", "e", "n"], className: "bg-gradient-to-l to-pink-400 from-pink-400 bg-clip-text text-transparent" },
   { chars: [""] },
   { chars: [""] },
    { chars: [""] },
    { chars: ["Your"], className: "text-pink-400" },
    { chars: [""] },
    { chars: [""] },
    { chars: [""] },
    { chars: ["Lo"], className: "bg-gradient-to-l to-pink-400 from-pink-400 bg-clip-text text-transparent" },
    { chars: ["n"], className: "bg-gradient-to-l to-pink-400 from-blue-400 bg-clip-text text-transparent" },
    { chars: ["g"], className: "bg-gradient-to-l to-blue-400 from-blue-400 bg-clip-text text-transparent" },
     { chars: [""] },
     { chars: [""] },
     { chars: [""] },
    { chars: ["L"], className: "bg-gradient-to-l to-blue-400 from-blue-400 bg-clip-text text-transparent" },
    { chars: ["i"], className: "bg-gradient-to-l to-blue-400 from-blue-500 bg-clip-text text-transparent" },
    { chars: ["n"], className: "bg-gradient-to-l to-blue-500 from-blue-500 bg-clip-text text-transparent" },
    { chars: ["k"], className: "bg-gradient-to-l to-blue-500 from-blue-600 bg-clip-text text-transparent" },
    { chars: ["s"], className: "bg-gradient-to-l to-blue-600 from-pink-400 bg-clip-text text-transparent" },
    { chars: [":", ")"], className: "text-pink-400" },
  ];

  return (
    <>
      <div className="bodyheader relative  w-full">
        <div className="flex items-center justify-center top-5 w-full px-4">
          <div className="headercontent mt-15 w-full">
            <motion.div
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2, type: "spring" }}
              className="text-[28px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-bold gap-[2px] mt-10 flex flex-wrap items-center justify-center text-center leading-tight"
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  className={`inline-block ${word.className} `}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    delay: index * 0.15,
                    ease: "easeInOut",
                  }}
                >
                  {word.chars.join("")}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col justify-center items-center mt-3  text-center"
            >
              <span className={`text-[14px] ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                Shortly is an efficient and easy-to-use URL shortening service that streamlines your
              </span>
              <span className={`text-[14px] mt-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                online experience.
              </span>
            </motion.div>

            <div className="w-full flex justify-center mt-4 px-2">
              <InputUrlCom />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className={`flex flex-wrap text-center items-center justify-center text-[12px] mt-4 gap-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}
            >
              You can create
              <span className="text-pink-400 font-[700]">{remainingLinks}</span>
              more links. Register Now to enjoy Unlimited usage
              <span className="border border-white rounded-full text-[10px] w-2.5 h-2.5 flex items-center justify-center text-white">
                ?
              </span>
            </motion.p>
          </div>
        </div>

        <div className='absolute right-0 top-5 fixed'>
          <BodyRightSidebar />
        </div>
      </div>

      <div className="relative px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 max-w-[900px] mx-auto">
        {urls?.length === 0 ? (
          <>
            <MainBody
              OpenFilterPage={false}
              urls={displayUrls}
              isLoading={isLoading}
              filteredData={[]}
            />
            <span className="flex items-center justify-center text-[18px] font-[400] mt-4">
              No link created
            </span>
          </>
        ) : (
          <div className="relative">
            <MainBody
              OpenFilterPage={false}
              urls={displayUrls}
              isLoading={isLoading}
              filteredData={[]}
            />

            {displayUrls.length >= 3 && (
              <div className='absolute flex items-center justify-center w-full'>
                <div className="bottom-0 top-25 w-full max-w-[900px] mx-auto h-10 text-center text-white bg-[rgba(21,35,59,0.4)] backdrop-blur p-4 rounded-lg flex items-center justify-center">
                  <h2 className="text-[14px] font-semibold">
                    <Link to="register" className="text-blue-500 underline mr-1.5">
                      Register Now
                    </Link>
                    to enjoy Unlimited History
                  </h2>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default BodyHeader;