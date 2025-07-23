import './App.css'
import React from 'react'
import FrontLayout from './Home/frontLayout'
import { ThemeProvider } from './Home/BodyParts/BodyRightSidebar/useThemeContext'
import { Routes, Route, useLocation } from 'react-router-dom'
import useFetchUrls from './coustemHook/useFetchUrls'
import Login from './Login-Register/Login'
import Register from './Login-Register/Register'
import { AnimatePresence } from 'framer-motion'
import { ToastContainer } from 'react-toastify'

import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'
import Layout from './MainHomePage/Layout/Layout'
import MainFullHistory from './MainHomePage/Body/HistoryPart/MainFullHistory'
import StatsPage from './MainHomePage/Body/SataisticPart/StatisticsPart'
import LayoutSetting from './MainHomePage/Body/SettingPart/LayoutSetting'
import Profile from './MainHomePage/Body/SettingPart/Profile'
import Security from './MainHomePage/Body/SettingPart/Security'
import AccessHistory from './MainHomePage/Body/SettingPart/AccessHistory'

const App = () => {
  useFetchUrls();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user')) || null;

  return (
    <AnimatePresence mode="sync">
      <ToastContainer />
      <ThemeProvider>
        <Routes location={location} key={location.pathname}>
          {/* ✅ Protected Routes (for logged in user) */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<MainFullHistory />} />
            <Route path="history" element={<MainFullHistory />} />
            <Route path="statspage" element={<StatsPage />} />
            <Route path="setting" element={<LayoutSetting />}>
              <Route index element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="security" element={<Security />} />
              <Route path="accesshistory" element={<AccessHistory />} />
            </Route>
          </Route>

          {/* ✅ Public Routes */}
          <Route path="/" element={<PublicRoute><FrontLayout /></PublicRoute>}>
            <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="register" element={<PublicRoute><Register /></PublicRoute>} />
          </Route>
        </Routes>
      </ThemeProvider>
    </AnimatePresence>
  );
}

export default App;
