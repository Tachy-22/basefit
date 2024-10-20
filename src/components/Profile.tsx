// pages/profile.tsx
"use client";

import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import {
  FaUser,
  FaTrophy,
  FaChartLine,
  FaClipboardList,
  FaChevronLeft,
  FaChevronRight,
  FaFire,
  FaHeartbeat,
  FaDumbbell,
  FaCheck,
  FaAngleDown,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Dashboard from "./Dashboard";

const Profile: FC = () => {
  const { address } = useAccount();
  const [newGoal, setNewGoal] = useState("");
  const [goals, setGoals] = useState<{ goal: string; completed: boolean }[]>([]);
  const [points, setPoints] = useState(0);
  const [achievementLevel, setAchievementLevel] = useState(1);
  const [loginStreak, setLoginStreak] = useState(0);
  const [fitnessCandies, setFitnessCandies] = useState(0);
  const [activeTab, setActiveTab] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  // Mock user data
  useEffect(() => {
    setPoints(350);
    setAchievementLevel(2);
    setLoginStreak(5);
    setFitnessCandies(15);
    setGoals([
      { goal: "Run 5km", completed: false },
      { goal: "Do 100 pushups", completed: true },
      { goal: "Swim for 30 minutes", completed: false },
    ]);
  }, []);

  const handleAddGoal = () => {
    if (newGoal.trim() !== "") {
      setGoals([...goals, { goal: newGoal.trim(), completed: false }]);
      setNewGoal("");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const mockChartData = [
    { name: "Mon", steps: 6000 },
    { name: "Tue", steps: 8000 },
    { name: "Wed", steps: 7500 },
    { name: "Thu", steps: 9000 },
    { name: "Fri", steps: 8500 },
    { name: "Sat", steps: 10000 },
    { name: "Sun", steps: 9500 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-full text-white py-6 text-center bg-[#0097A7] rounded-lg shadow-lg"
            >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-[#0097A7] text-5xl mb-4">
                  <FaUser />
                </div>
                <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
                <button
                  onClick={copyAddress}
                  className="text-xl bg-white text-[#0097A7] hover:bg-gray-800 px-4 py-2 rounded-full flex items-center transition duration-300"
                >
                  {address
                    ? `${address.slice(0, 6)}...${address.slice(-4)}`
                    : "No address"}
                  <span className="ml-2">{copied ? <FaCheck /> : "📋"}</span>
                </button>
                {copied && (
                  <span className="text-sm mt-2 text-white">Copied!</span>
                )}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Points Balance
              </h3>
              <div className="flex items-center justify-between">
                <FaFire className="text-4xl text-[#FFC67D]" />
                <p className="text-5xl font-bold text-white">{points}</p>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Convertible to Ethereum
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Achievement Level
              </h3>
              <div className="flex items-center justify-between">
                <FaTrophy className="text-4xl text-[#FFC67D]" />
                <p className="text-5xl font-bold text-white">
                  {achievementLevel}
                </p>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Next level: {loginStreak}/3 days
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Login Streak
              </h3>
              <div className="flex items-center justify-between">
                <FaHeartbeat className="text-4xl text-[#FFC67D]" />
                <p className="text-5xl font-bold text-white">{loginStreak}</p>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Keep logging in daily!
              </p>
            </div>

            {/* Activity Chart */}
            <div className="col-span-full bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Weekly Activity
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                  <XAxis dataKey="name" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a202c",
                      border: "none",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="steps"
                    stroke="#0097A7"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Achievements */}
            <div className="col-span-full md:col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Recent Achievements
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center text-white">
                  <FaDumbbell className="mr-2 text-[#FFC67D]" /> Completed 100
                  push-ups challenge
                </li>
                <li className="flex items-center text-white">
                  <FaHeartbeat className="mr-2 text-[#FFC67D]" /> Maintained
                  7-day workout streak
                </li>
                <li className="flex items-center text-white">
                  <FaFire className="mr-2 text-[#FFC67D]" /> Burned 5000
                  calories this week
                </li>
              </ul>
            </div>

            {/* Quick Goals */}
            <div className="col-span-full md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Quick Goals
              </h3>
              <div className="flex flex-wrap gap-4">
                {goals.slice(0, 3).map((goal, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 p-3 rounded-lg flex items-center justify-between w-full sm:w-auto flex-grow"
                  >
                    <span className="text-white">{goal.goal}</span>
                    <span
                      className={`text-sm ${goal.completed ? "text-[#0097A7]" : "text-[#FFC67D]"}`}
                    >
                      {goal.completed ? "Completed" : "In Progress"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Accordion */}
            <div className="col-span-full bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white flex items-center justify-between cursor-pointer" onClick={() => setShowAchievements(!showAchievements)}>
                Achievements
                <FaAngleDown className={`transition-transform ${showAchievements ? "rotate-180" : ""}`} />
              </h3>
              {showAchievements && (
                <div className="mt-4">
                  <div className="rounded-lg shadow-lg p-4 bg-gray-700">
                    <h4 className="text-xl font-bold text-white">Marathon Finisher</h4>
                    <p className="text-gray-400">Completed a full marathon</p>
                  </div>
                  <div className="rounded-lg shadow-lg p-4 bg-gray-700 mt-2">
                    <h4 className="text-xl font-bold text-white">10,000 Steps Streak</h4>
                    <p className="text-gray-400">Walked 10,000 steps for 30 days straight</p>
                  </div>
                  <div className="rounded-lg shadow-lg p-4 bg-gray-700 mt-2">
                    <h4 className="text-xl font-bold text-white">Weight Loss Champion</h4>
                    <p className="text-gray-400">Lost 20 pounds in 3 months</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "stats":
        return (
          <section className="p-6">
            <div className="">
              <Dashboard />
            </div>
          </section>
        );

      case "achievements":
        return (
          <section className="p-6 bg-gray-900">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-lg shadow-lg p-6 bg-gray-800">
                <h3 className="text-xl font-bold mb-2 text-white">
                  Marathon Finisher
                </h3>
                <p className="text-gray-400">Completed a full marathon</p>
              </div>
              <div className="rounded-lg shadow-lg p-6 bg-gray-800">
                <h3 className="text-xl font-bold mb-2 text-white">
                  10,000 Steps Streak
                </h3>
                <p className="text-gray-400">
                  Walked 10,000 steps for 30 days straight
                </p>
              </div>
              <div className="rounded-lg shadow-lg p-6 bg-gray-800">
                <h3 className="text-xl font-bold mb-2 text-white">
                  Weight Loss Champion
                </h3>
                <p className="text-gray-400">Lost 20 pounds in 3 months</p>
              </div>
            </div>
          </section>
        );
      case "goals":
        return (
          <section className="p-6 bg-gray-900">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Fitness Goals
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="flex mb-6">
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Enter your fitness goal"
                  className="flex-grow px-4 py-2 rounded-l-lg border-t border-b border-l text-white border-gray-500 bg-gray-800"
                />
                <button
                  onClick={handleAddGoal}
                  className="px-6 py-2 rounded-r-lg bg-[#0097A7] text-white font-semibold hover:bg-[#0097A7] focus:outline-none focus:ring-2 focus:ring-[#0097A7] focus:ring-opacity-75 transition duration-300"
                >
                  Add Goal
                </button>
              </div>
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg shadow-md bg-gray-800 flex items-center justify-between"
                  >
                    <span className="text-white text-lg">{goal.goal}</span>
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${goal.completed ? "bg-[#0097A7] text-white" : "bg-[#FFC67D] text-gray-800"}`}
                    >
                      {goal.completed ? "Completed" : "In Progress"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-white bg-gray-900 flex relative">
      {/* Collapsible Sidebar */}
      <motion.div
        initial={{ width: isSidebarOpen ? "16rem" : "4rem" }}
        animate={{ width: isSidebarOpen ? "16rem" : "4rem" }}
        transition={{ duration: 0.3 }}
        className={`py-6 flex flex-col ${isSidebarOpen ? "absolute md:relative bg-gray-800/80 backdrop-blur-xl" : "md:relative bg-gray-800"} min-h-full z-10`}
      >
        <button
          onClick={toggleSidebar}
          className="self-end mb-6 px-3 text-white hover:text-[#FFC67D] transition duration-300"
        >
          {isSidebarOpen ? (
            <FaChevronLeft size={18} />
          ) : (
            <FaChevronRight size={18} />
          )}
        </button>
        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center space-x-2 w-full p-2 px-4 transition duration-300 ${
              activeTab === "profile"
                ? "bg-[#0097A7] text-white"
                : "text-gray-400 hover:bg-[#0097A7] hover:text-white"
            }`}
          >
            <FaUser />
            {isSidebarOpen && <span>Dashboard</span>}
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex items-center space-x-2 w-full p-2 px-4 transition duration-300 ${
              activeTab === "stats"
                ? "bg-[#0097A7] text-white"
                : "text-gray-400 hover:bg-[#0097A7] hover:text-white"
            }`}
          >
            <FaChartLine />
            {isSidebarOpen && <span>Stats</span>}
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`flex items-center space-x-2 w-full p-2 px-4 transition duration-300 ${
              activeTab === "achievements"
                ? "bg-[#0097A7] text-white"
                : "text-gray-400 hover:bg-[#0097A7] hover:text-white"
            }`}
          >
            <FaTrophy />
            {isSidebarOpen && <span>Achievements</span>}
          </button>
          <button
            onClick={() => setActiveTab("goals")}
            className={`flex items-center space-x-2 w-full p-2 px-4 transition duration-300 ${
              activeTab === "goals"
                ? "bg-[#0097A7] text-white"
                : "text-gray-400 hover:bg-[#0097A7] hover:text-white"
            }`}
          >
            <FaClipboardList />
            {isSidebarOpen && <span>Goals</span>}
          </button>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default Profile;
