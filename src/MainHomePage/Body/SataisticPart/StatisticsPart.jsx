import React from "react";
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,LineElement,PointElement,ArcElement,Tooltip,Legend} from "chart.js";
import { Chart } from "react-chartjs-2";
import StaisticsHeading from "./StaisticsHeading";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

ChartJS.register(CategoryScale,LinearScale,BarElement,LineElement,PointElement,ArcElement,Tooltip,Legend);

const StatsPage = () => {

  
  const fetchStats = async () => {
    try {
      const res = await axios.get(`https://shortener-backend-4w6z.onrender.com/api/geturl`);
      return res.data;
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  };

const { data: urls, isLoading } = useQuery({
  queryKey: ['all-urls'],
  queryFn: fetchStats,
  refetchInterval: 1000,
});

const fetchDailyClicks = async () => {
  const res = await axios.get("https://shortener-backend-4w6z.onrender.com/api/analytics");
  return res.data;
};



const { data: analyticsData , isLoading: isAnalyticsLoading} = useQuery({
  queryKey: ["combined-daily-clicks"],
  queryFn: fetchDailyClicks,
  refetchInterval: 1000,
});

const fetchReferrerStats = async () => {
  const res = await axios.get("https://shortener-backend-4w6z.onrender.com/api/referre");
  return res.data;
};

const { data: referrerData, isLoading: isReferreerLoading } = useQuery({
  queryKey: ['referrer-stats'],
  queryFn: fetchReferrerStats,
  refetchInterval: 5000, // auto-refresh every 5s
});


const fetchAnalytics = async () => {
  const res = await axios.get("https://shortener-backend-4w6z.onrender.com/api/browser");
  return res.data;
};

const { data: analyticsDataofBrowser, isLoading: isBrowserLoading } = useQuery({
  queryKey: ["combined-analytics"],
  queryFn: fetchAnalytics,
  refetchInterval: 1000,
});

const browsers = analyticsDataofBrowser?.browsers || {};


const fetchCountryStats = async () => {
  const res = await axios.get("https://shortener-backend-4w6z.onrender.com/api/country");
  return res.data;
};

const { data: countryData , isLoading: isCountryLoading} = useQuery({
  queryKey: ['country-stats'],
  queryFn: fetchCountryStats,
  refetchInterval: 10000,
});

const countryStats = countryData?.countries || {};

if (isLoading) return <p>Loading...</p>;
// if (
//   isLoading ||
//   !urls ||
//   !isAnalyticsLoading ||
//   !isReferreerLoading||
//   !isBrowserLoading||
//   !isCountryLoading
// ) {
//   return <p className="text-center text-white">Loading stats...</p>;
// }


if (!urls) return <p className="text-red-400">Failed to fetch URLs</p>;


const totalClicks = urls.reduce((acc, item) => acc + item.clicks, 0);

  const data = {

    totalClicks: totalClicks,
    dailyClicks: analyticsData?.dailyClicks || {
  "2024-07-01": 5,
  "2024-07-02": 8,
  "2024-07-03": 12,
},

    referrers: {
      "Google": 120,
      "Facebook": 60,
      "LinkedIn": 30,
      "Direct": 33,
    },
    countries: {
      "India": 120,
      "USA": 60,
      "UK": 30,
      "Canada": 33,
    },
    browsers: {
      "Chrome": 100,
      "Firefox": 60,
      "Safari": 40,
      "Edge": 25,
      "Brave": 18,
    }
  };

  const labels = Object.keys(data.dailyClicks);
  const values = Object.values(data.dailyClicks);

  const colors = [
    "#f87171", "#fb923c", "#facc15", "#4ade80", "#60a5fa",
    "#a78bfa", "#f472b6", "#34d399", "#fcd34d", "#c084fc"
  ];

  const chartData = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: "Bar - Clicks",
        data: values,
        backgroundColor: colors.slice(0, values.length),
        borderRadius: 5,
      },
      {
        type: 'line',
        label: "Line - Trend",
        data: values,
        borderColor: "#3b82f6",
        borderWidth: 2,
        pointBackgroundColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  };

const chartOptions = {
  responsive: true,
  scales: {
    x: {
      ticks: { color: "pink" },
      grid: { display: false },
      // ⬇️ Add these
      barPercentage: 0.4,
      categoryPercentage: 0.5,
    },
    y: {
      ticks: { color: "white" },
    },
  },
  plugins: {
    legend: { position: "top" },
    title: {
      display: true,
      text: "📊 Daily Clicks (Line + Bar Chart)",
    },
  },
};


const browserChartData = {
  labels: Object.keys(browsers),  // 👈 ये खाली न हो
  datasets: [
    {
      label: "Browser Info",
      data: Object.values(browsers),  // 👈 ये भी खाली न हो
      backgroundColor: ["#f87171", "#60a5fa", "#facc15", "#34d399", "#a78bfa"],
    },
  ],
};



const referrerChartData = {
  labels: Object.keys(referrerData?.referrers || {}),
  datasets: [
    {
      label: "Referrers",
      data: Object.values(referrerData?.referrers || {}),
      backgroundColor: ["#f87171", "#60a5fa", "#facc15", "#a78bfa", "#4ade80"],
      borderWidth: 1,
    },
  ],
};


  const pieOptions = {
      scales: {
    x: {
      ticks: {
        color: "pink", 
      },
    },
    y: {
      ticks: {
        color: "white", 
      },
    },
  },
    responsive: true,
    plugins: {
      legend: { position: "bottom" ,
          labels: {
    color: "pink", 
    font: {
      size: 14,
    }
  }
      },
      title: {
        display: true,
        text: "💻 Browser Distribution"
      }
    }
  };

  const referrerOptions = {
      scales: {
    x: {
      ticks: {
        color: "pink", 
      },
    },
    y: {
      ticks: {
        color: "white", 
      },
    },
  },
    responsive: true,
    plugins: {
      legend: { position: "bottom",
        labels: {
    color: "pink", 
    font: {
      size: 14,
    }
  }
       },
      title: {
        display: true,
        text: "🌐 Referrer Sources"
      }
    }
  };

  return (
    <div className="max-w-4xl mx-8 w-full">
     <StaisticsHeading></StaisticsHeading>
      <p className="font-semibold text-lg text-[20px] bg-gradient-to-r from-pink-400 to-blue-700 bg-clip-text text-transparent">
       Total Clicks: {data.totalClicks}
      </p>
       <div className="mt-8 bg-gray-800 p-4 rounded shadow w-[1180px] h-[550px] ">
  <h2 className="text-xl font-semibold text-pink-500 mb-2"> Daily Clicks</h2>
  <div className="p-4 bg-gray-700  rounded-md shadow-md flex items-center justify-center h-[450px]">
      <Chart type="bar" data={chartData} options={chartOptions} />
  </div>
</div>


<div className="piechart flex gap-5 w-[1180px]">
      {/* Referrers Chart - Pie */}
      <div className="mt-8 bg-gray-800 p-4 rounded shadow w-full mx-auto">
  <h2 className="text-xl font-semibold text-pink-500 mb-2 ">Referrers</h2>
  <div className="p-4 bg-gray-700 rounded-md shadow-md flex items-center justify-center">
    <Chart
      type="pie"
  data={referrerChartData} options={referrerOptions}
      className="w-full h-auto" 
      // 👈 (Not required, for clarity)
    />
  </div>
</div>

   {/* Browser Info - Pie Chart */}
     <div className="mt-8 bg-gray-800 p-4 rounded shadow w-full  mx-auto">
  <h2 className="text-xl font-semibold text-pink-500 mb-2">Browser Info</h2>
  <div className="p-4 bg-gray-700 rounded-md shadow-md flex items-center justify-center">
    <Chart
      type="pie"
      data={browserChartData}
      options={pieOptions}
      className="w-full h-auto" // 👈 (Not required, for clarity)
    />
  </div>
</div>
   </div> 


      {/* Country Stats */}
       <div className="mt-8 bg-gray-800  rounded shadow w-[1180px]">
        <h2 className="text-xl font-semibold text-pink-500 mb-2"> Country Stats</h2>
        <table className="w-full table-auto border border-collapse border-gray-300 ">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 border">Country</th>
              <th className="px-4 py-2 border">Clicks</th>
            </tr>
          </thead>
          <tbody>
          {Object.entries(countryStats).map(([country, count], i) => (
              <tr key={i} className="text-center">
                <td className="px-4 py-2 border bg-gray-600">{country}</td>
                <td className="px-4 py-2 border  bg-gray-600">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
</div>
  );
};

export default StatsPage;
