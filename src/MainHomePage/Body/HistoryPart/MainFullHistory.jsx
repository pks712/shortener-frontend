import React, { useState } from 'react';
import MainBodyHistoryPart from './MainBodyHistoryPart';
import MainBody from '../MainBody/MainBody';
import FilterPage from '../../../EditDeleteFilterPage/FilterPage';
import { AnimatePresence } from 'framer-motion';

import useAllUrls from '../../../coustemHook/useAllUrls';
import useFilteredUrls from '../../../coustemHook/useFilteredUrls';

const MainFullHistory = () => {
  const [OpenFilterPage, setOpenFilterPage] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // 👇 Fetching data from custom hook
  const { urls, isLoading } = useAllUrls();

  // 👇 Applying filters using custom hook
  const filteredData = useFilteredUrls({
    urls,
    search,
    status,
    fromDate,
    toDate,
  });

  return (
    <div>
      {/* Top Filter Button */}
      <div className="flex justify-center items-center lg:sticky left-0 top-50 z-[90] bg-gray-600">
        <MainBodyHistoryPart setOpenFilterPage={setOpenFilterPage} />
      </div>

      {/* Filter Panel */}
      <div className="fixed lg:sticky left-0 top-63 z-[50] bg-black flex justify-center">
        <AnimatePresence>
          {OpenFilterPage && (
            <FilterPage
              setSearch={setSearch}
              setStatus={setStatus}
              setFromDate={setFromDate}
              setToDate={setToDate}
              fromDate={fromDate}
              toDate={toDate}
              search={search}
              status={status}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Main Table */}
      <div className="relative max-h-screen overflow-y-auto">
        <MainBody
          OpenFilterPage={OpenFilterPage}
          urls={urls}
          isLoading={isLoading}
          filteredData={filteredData}
        />
      </div>
    </div>
  );
};

export default MainFullHistory;
