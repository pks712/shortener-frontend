import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Layout from "../MainHomePage/Layout/Layout"
import MainFullHistory from "../MainHomePage/Body/HistoryPart/MainFullHistory"
import StatsPage from "../MainHomePage/Body/SataisticPart/StatisticsPart"
import LayoutSetting from "../MainHomePage/Body/SettingPart/LayoutSetting"
import Profile from "../MainHomePage/Body/SettingPart/Profile"
import Security from "../MainHomePage/Body/SettingPart/Security"
import AccessHistory from "../MainHomePage/Body/SettingPart/AccessHistory"

const MainPageRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<MainFullHistory />} />
        <Route path="history" element={<MainFullHistory />} />
        <Route path="statspage" element={<StatsPage />} />
        <Route path="setting" element={<LayoutSetting />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="security" element={<Security />} />
          <Route path="accesshistory" element={<AccessHistory />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default MainPageRoutes
