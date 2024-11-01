// Import necessary dependencies and components
"use client"; // Marks this as a client-side component

import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  FaFire,
  FaHeartbeat,
  FaDumbbell,
  FaRunning,
  FaSwimmer,
  FaBicycle,
  FaAppleAlt,
  FaWeight,
  FaSpinner,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";
import { IoMdRefresh } from "react-icons/io";
import { RiExchangeLine } from "react-icons/ri";
import { BiWallet } from "react-icons/bi";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import { IconType } from "react-icons";

// StatCard component - Displays individual statistics with an icon, value and label
const StatCard = ({
  icon: Icon,
  value,
  label,
}: {
  icon: any;
  value: string | number;
  label: string;
}) => (
  <div className="flex flex-col items-center">
    <Icon className="text-3xl text-[#FFC67D] mb-2" />
    <p className="text-lg font-bold">{value}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

// ProgressCard component - Shows daily progress including steps, circular progress bar and distance err
const ProgressCard = ({
  steps,
  progress,
  distance,
  dailyGoal,
  getEncouragement,
}: {
  steps: number;
  progress: number;
  distance: number;
  dailyGoal: number;
  getEncouragement: (steps: number) => string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 mb-6 lg:w-1/2"
  >
    <h3 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#FFC67D] to-[#FF9B44] mb-4">
      Daily Progress
    </h3>
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-3xl font-bold">{steps.toLocaleString()}</p>
        <p className="text-sm text-gray-400">steps today</p>
      </div>
      <div className="w-24 h-24">
        <CircularProgressbar
          value={progress}
          text={`${progress.toFixed(0)}%`}
          styles={buildStyles({
            textColor: "#FFC67D",
            pathColor: "#FFC67D",
            trailColor: "rgba(55, 65, 81, 0.3)",
            textSize: "20px",
          })}
        />
      </div>
    </div>
    <motion.div 
      className="mb-4 p-4 bg-gray-900/50 rounded-lg"
      whileHover={{ scale: 1.02 }}
    >
      <p className="font-bold text-xl text-[#FFC67D] mb-2">Distance Covered</p>
      <p className="text-2xl font-bold">{distance.toFixed(2)} km</p>
    </motion.div>
    <p className="text-sm font-semibold text-gray-400 text-center">
      {getEncouragement(steps)}
    </p>
  </motion.div>
);

// WalletCard component - Displays cryptocurrency wallet information
const WalletCard = ({
  bfPoints,
  todayPoints,
  ethereumBalance,
}: {
  bfPoints: number;
  todayPoints: number;
  ethereumBalance: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 mb-6 lg:w-1/2"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#FFC67D] to-[#FF9B44]">
        Crypto Wallet
      </h3>
      <BiWallet className="text-2xl text-[#FFC67D]" />
    </div>
    
    <div className="space-y-4">
      <motion.div 
        className="p-4 bg-gray-900/50 rounded-lg"
        whileHover={{ scale: 1.02 }}
      >
        <h4 className="text-sm font-semibold text-gray-400">Total Balance</h4>
        <p className="text-2xl font-bold">{bfPoints.toLocaleString()} BF</p>
      </motion.div>
      
      <motion.div 
        className="p-4 bg-gray-900/50 rounded-lg"
        whileHover={{ scale: 1.02 }}
      >
        <h4 className="text-sm font-semibold text-gray-400">Today's Earnings</h4>
        <p className="text-xl font-bold text-green-400">+{todayPoints.toLocaleString()} BF</p>
      </motion.div>
      
      <motion.div 
        className="p-4 bg-gray-900/50 rounded-lg"
        whileHover={{ scale: 1.02 }}
      >
        <h4 className="text-sm font-semibold text-gray-400">ETH Balance</h4>
        <p className="text-xl font-bold">{ethereumBalance.toFixed(6)} ETH</p>
      </motion.div>
    </div>
  </motion.div>
);

// ConversionCard component - Handles conversion between BF and ETH tokens
const ConversionCard = ({
  inputValue,
  outputValue,
  handleInputChange,
  handleConversion,
  handleReset,
}: {
  inputValue: string;
  outputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleConversion: () => void;
  handleReset: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50 w-full mb-6"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-[#FFC67D] to-[#FF9B44]">
        Token Conversion
      </h3>
      <RiExchangeLine className="text-2xl text-[#FFC67D]" />
    </div>
    
    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-400 mb-2">BF Amount</p>
        <input
          className="w-full bg-gray-900/50 p-4 rounded-xl text-white outline-none border border-gray-700/50 focus:border-[#FFC67D]/50 transition-all"
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter BF amount"
        />
      </div>
      <div className="flex-1 relative">
        <p className="text-sm font-semibold text-gray-400 mb-2">ETH Equivalent</p>
        <input
          className="w-full bg-gray-900/50 p-4 rounded-xl text-white outline-none border border-gray-700/50"
          type="text"
          value={outputValue}
          readOnly
          placeholder="ETH Value"
        />
      </div>
    </div>
    
    <div className="flex justify-center gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-[#FFC67D] to-[#FF9B44] px-6 py-3 rounded-xl font-medium text-gray-900"
        onClick={() => {
          handleConversion();
          toast.success("Conversion calculated successfully!");
        }}
      >
        Convert Tokens
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gray-700 px-6 py-3 rounded-xl font-medium"
        onClick={handleReset}
      >
        Reset
      </motion.button>
    </div>
  </motion.div>
);

// HistoricalCharts component - Displays historical data using Recharts
const HistoricalCharts = ({ data }: { data: any[] }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full mb-6">
    <h3 className="font-bold text-xl text-[#FFC67D] mb-6">Weekly Progress</h3>
    <div className="space-y-8">
      {/* Steps and Distance Chart */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Steps & Distance</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              yAxisId="left"
              stroke="#9CA3AF"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#9CA3AF"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="steps"
              stroke="#FFC67D"
              name="Steps"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="distance"
              stroke="#0097A7"
              name="Distance (km)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Calories Chart */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Calories Burned</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
            />
            <Legend />
            <Bar
              dataKey="calories"
              fill="#FFC67D"
              name="Calories"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Weight Chart */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Weight Tracking</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#0097A7"
              name="Weight (kg)"
              dot={{ stroke: '#0097A7', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

// New component for animated stats card
const AnimatedStatCard = ({
  EIcon,
  value,
  label,
  delay = 0,
}: {
  EIcon: IconType;
  value?: string;
  label?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-gray-800/50 backdrop-blur-lg p-4 rounded-xl border border-gray-700/50 hover:border-[#FFC67D]/50 transition-all"
  >
    <div className="flex flex-col items-center">
      <EIcon className="text-3xl text-[#FFC67D] mb-2" />
      <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFC67D] to-[#FF9B44]">
        {value}
      </p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </motion.div>
);

// Main Dashboard component
const Dashboard = () => {
  // State declarations for various fitness and wallet metrics
  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [outputValue, setOutputValue] = useState<string>("");
  const [bfPoints, setBfPoints] = useState<number>(0);
  const [dailyGoal, setDailyGoal] = useState<number>(4000);
  const [todayPoints, setTodayPoints] = useState<number>(0);
  const [ethereumBalance, setEthereumBalance] = useState<number>(0);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [heartRate, setHeartRate] = useState<number>(0);
  const [waterIntake, setWaterIntake] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());
  const POLLING_INTERVAL = 30000; // 30 seconds
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  // Handlers for conversion functionality
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleConversion = () => {
    const ethereumRate = 0.0000025;
    if (inputValue) {
      const inputAsNumber = parseFloat(inputValue);
      if (!isNaN(inputAsNumber) && inputAsNumber <= bfPoints) {
        setOutputValue((inputAsNumber * ethereumRate).toFixed(8));
      } else if (inputAsNumber > bfPoints) {
        alert("You don't have enough BF points for this conversion.");
      } else {
        setOutputValue("Invalid Input");
      }
    }
  };

  const handleReset = () => {
    setInputValue("");
    setOutputValue("");
  };

  // Helper function to generate encouragement messages
  const getEncouragement = (steps: number): string => {
    if (steps < dailyGoal) {
      return `Keep going! You're ${dailyGoal - steps} steps away from your daily goal.`;
    } else {
      return "Fantastic! You've reached your daily goal. Why not push for more?";
    }
  };

  // Check if user is already authenticated
  const checkAuthStatus = () => {
    const savedToken = localStorage.getItem("googleAccessToken");
    console.log("Checking saved token:", savedToken);
    if (savedToken) {
      setAccessToken(savedToken);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("googleAccessToken");
    localStorage.removeItem("userInfo");
    setAccessToken(null);
    setIsAuthenticated(false);
    setUserInfo(null);
    window.location.reload(); // Refresh to reset state
  };

  // Google Fit initialization function
  const initializeGoogleFit = async () => {
    try {
      // Check if already authenticated
      if (checkAuthStatus()) {
        console.log("User already authenticated, fetching data...");
        await fetchFitnessData();
        return;
      }

      if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        throw new Error(
          "Google Client ID is not defined in environment variables"
        );
      }

      console.log("Initializing Google Fit...");

      // Initialize Google Identity Services client
      const tokenClient = (
        window as any
      ).google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope:
          "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/userinfo.profile",
        callback: async (tokenResponse: any) => {
          if (tokenResponse.access_token) {
            console.log("New token received:", tokenResponse);
            setAccessToken(tokenResponse.access_token);
            localStorage.setItem(
              "googleAccessToken",
              tokenResponse.access_token
            );
            setIsAuthenticated(true);

            // Initialize Google API client
            await (window as any).gapi.client.init({
              apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
              discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest",
              ],
              clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            });

            // Load the fitness API
            await (window as any).gapi.client.load("fitness", "v1");

            // Set access token
            (window as any).gapi.client.setToken({
              access_token: tokenResponse.access_token,
            });

            // Fetch user information
            try {
              const userInfoResponse = await fetch(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                  headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                  },
                }
              );
              const userInfoData = await userInfoResponse.json();
              console.log("User Info:", userInfoData);
              setUserInfo(userInfoData);
              localStorage.setItem("userInfo", JSON.stringify(userInfoData));
            } catch (error) {
              console.error("Error fetching user info:", error);
              setErrors((prev) => [...prev, "Failed to fetch user info"]);
            }

            // Fetch fitness data
            fetchFitnessData();
          }
        },
      });

      // Request access token
      tokenClient.requestAccessToken();
    } catch (error) {
      console.error("Error initializing Google Fit:", error);
      console.error("Full error details:", JSON.stringify(error, null, 2));
      setErrors((prev) => [...prev, "Failed to initialize Google Fit"]);
    }
  };

  // Function to subscribe to Google Fit data changes
  const subscribeToFitnessUpdates = async () => {
    try {
      const response = await (
        window as any
      ).gapi.client.fitness.users.dataSources.subscribe({
        userId: "me",
        dataSourceId:
          "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
        subscription: {
          dataTypeName: "com.google.step_count.delta",
        },
      });

      console.log("Subscription successful:", response);
    } catch (error) {
      console.error("Error subscribing to updates:", error);
      setErrors((prev) => [...prev, "Failed to subscribe to fitness updates"]);
    }
  };

  // Modified fetchFitnessData to check for recent changes
  const fetchFitnessData = async (force: boolean = false) => {
    try {
      const now = Date.now();
      // Only fetch if forced or if more than polling interval has passed
      if (!force && now - lastUpdateTime < POLLING_INTERVAL) {
        return;
      }

      // Check if fitness API is loaded
      if (!(window as any).gapi.client.fitness) {
        await (window as any).gapi.client.load("fitness", "v1");
      }

      console.log("Fetching fitness data...");
      const today = new Date();
      const startTime = new Date(today.setHours(0, 0, 0, 0)).getTime();
      const endTime = now;

      // Fetch steps data
      const stepsResponse = await (
        window as any
      ).gapi.client.fitness.users.dataset.aggregate({
        userId: "me",
        aggregateBy: [
          {
            dataTypeName: "com.google.step_count.delta",
          },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime,
      });

      // Process steps data
      const stepsData = JSON.parse(stepsResponse.body);
      if (stepsData.bucket[0]?.dataset[0]?.point?.length > 0) {
        const stepsCount =
          stepsData.bucket[0].dataset[0].point[0].value[0].intVal || 0;
        if (stepsCount !== steps) {
          // Only update if steps count has changed
          setSteps(stepsCount);
          setBfPoints(Math.floor(stepsCount / 100));
          setTodayPoints(Math.floor(stepsCount / 10));
          setDistance(stepsCount * 0.0008);
          setCaloriesBurned(Math.floor(stepsCount * 0.05));
          setProgress((stepsCount / dailyGoal) * 100);
        }
      }

      // Fetch heart rate data
      const heartRateResponse = await (
        window as any
      ).gapi.client.fitness.users.dataset.aggregate({
        userId: "me",
        aggregateBy: [
          {
            dataTypeName: "com.google.heart_rate.bpm",
            dataSourceId:
              "raw:com.google.heart_rate.bpm:com.google.android.apps.fitness:user_input",
          },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime - 7 * 24 * 60 * 60 * 1000, // Look back 7 days
        endTimeMillis: endTime,
      });

      // Process heart rate data
      const heartRateData = JSON.parse(heartRateResponse.body);
      console.log("Heart Rate Response:", heartRateData);

      let heartRateValue = 0;

      // Check all buckets for heart rate data
      for (const bucket of heartRateData.bucket) {
        if (bucket.dataset[0]?.point?.length > 0) {
          // Get the most recent heart rate reading
          const points = bucket.dataset[0].point;
          const latestPoint = points[points.length - 1];
          if (latestPoint?.value[0]?.fpVal) {
            heartRateValue = Math.round(latestPoint.value[0].fpVal);
            break;
          }
        }
      }

      if (heartRateValue !== heartRate && heartRateValue > 0) {
        console.log("Setting new heart rate:", heartRateValue);
        setHeartRate(heartRateValue);
      } else {
        console.log("No valid heart rate found or no change in value");
      }

      // Fetch weight data
      const weightResponse = await (
        window as any
      ).gapi.client.fitness.users.dataset.aggregate({
        userId: "me",
        aggregateBy: [
          {
            dataTypeName: "com.google.weight",
          },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime,
      });

      // Process weight data
      const weightData = JSON.parse(weightResponse.body);
      if (weightData.bucket[0]?.dataset[0]?.point?.length > 0) {
        const weightValue =
          Math.round(weightData.bucket[0].dataset[0].point[0].value[0].fpVal) ||
          0;
        if (weightValue !== weight) {
          // Only update if weight has changed
          setWeight(weightValue);
        }
      }

      setLastUpdateTime(now);
    } catch (error) {
      console.error("Error fetching fitness data:", error);
      setErrors((prev) => [...prev, "Failed to fetch fitness data"]);
    }
  };

  // Function to fetch historical fitness data
  const fetchHistoricalData = async () => {
    console.log("Fetching historical data...");
    try {
      const now = Date.now();
      const startTime = now - 7 * 24 * 60 * 60 * 1000; // 7 days ago

      // Fetch historical steps data
      const stepsResponse = await (
        window as any
      ).gapi.client.fitness.users.dataset.aggregate({
        userId: "me",
        aggregateBy: [
          {
            dataTypeName: "com.google.step_count.delta",
          },
        ],
        bucketByTime: { durationMillis: 86400000 }, // Daily buckets
        startTimeMillis: startTime,
        endTimeMillis: now,
      });

      // Fetch historical calories data
      const caloriesResponse = await (
        window as any
      ).gapi.client.fitness.users.dataset.aggregate({
        userId: "me",
        aggregateBy: [
          {
            dataTypeName: "com.google.calories.expended",
          },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: now,
      });

      // Fetch historical weight data
      const weightResponse = await (
        window as any
      ).gapi.client.fitness.users.dataset.aggregate({
        userId: "me",
        aggregateBy: [
          {
            dataTypeName: "com.google.weight",
          },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: now,
      });

      // Process the responses
      const stepsData = JSON.parse(stepsResponse.body);
      const caloriesData = JSON.parse(caloriesResponse.body);
      const weightData = JSON.parse(weightResponse.body);

      // Format data for display
      const historicalData = stepsData.bucket.map(
        (bucket: any, index: number) => {
          const date = new Date(parseInt(bucket.startTimeMillis));
          return {
            date: date.toLocaleDateString(),
            steps: bucket.dataset[0].point[0]?.value[0]?.intVal || 0,
            calories:
              Math.round(
                caloriesData.bucket[index]?.dataset[0]?.point[0]?.value[0]
                  ?.fpVal
              ) || 0,
            weight:
              Math.round(
                weightData.bucket[index]?.dataset[0]?.point[0]?.value[0]?.fpVal
              ) || 0,
            // Calculate distance roughly from steps (average stride length 0.762m)
            distance: ((bucket.dataset[0].point[0]?.value[0]?.intVal || 0) * 0.762 / 1000).toFixed(2)
          };
        }
      );
      console.log({ historicalData });
      return historicalData;
    } catch (error) {
      console.error("Error fetching historical data:", error);
      setErrors((prev) => [...prev, "Failed to fetch historical data"]);
      return [];
    }
  };

  // Effect hook to set up subscription and polling
  useEffect(() => {
    if (isAuthenticated) {
      // Set up initial subscription
      subscribeToFitnessUpdates();

      // Fetch initial data
      fetchFitnessData(true);

      // Fetch historical data
      fetchHistoricalData().then(data => setHistoricalData(data));

      // Set up polling interval as backup
      const pollingInterval = setInterval(() => {
        fetchFitnessData();
      }, POLLING_INTERVAL);

      // Cleanup function
      return () => {
        clearInterval(pollingInterval);
      };
    }
  }, [isAuthenticated]);

  // Add toast notifications for key actions
  const handleManualRefresh = async () => {
    toast.info("Refreshing data...");
    await fetchFitnessData(true);
    toast.success("Data refreshed successfully!");
  };

  // Updated RefreshButton with animation
  const RefreshButton = () => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleManualRefresh}
      className="bg-gradient-to-r from-[#FFC67D] to-[#FF9B44] px-6 py-3 rounded-xl font-medium text-gray-900 flex items-center gap-2"
    >
      <IoMdRefresh className="text-xl" />
      Refresh Data
    </motion.button>
  );

  // Effect hook to load Google scripts and initialize Google Fit
  useEffect(() => {
    console.log("Loading Google scripts...");
    const loadScripts = async () => {
      try {
        // Load Google Identity Services script
        await new Promise<void>((resolve) => {
          const gsiScript = document.createElement("script");
          gsiScript.src = "https://accounts.google.com/gsi/client";
          gsiScript.id = "google-gsi-script";
          gsiScript.onload = () => resolve();
          document.body.appendChild(gsiScript);
        });

        // Load Google API script
        await new Promise<void>((resolve) => {
          const gapiScript = document.createElement("script");
          gapiScript.src = "https://apis.google.com/js/api.js";
          gapiScript.id = "google-gapi-script";
          gapiScript.onload = () => {
            (window as any).gapi.load("client", () => resolve());
          };
          document.body.appendChild(gapiScript);
        });

        // Check for saved user info
        const savedUserInfo = localStorage.getItem("userInfo");
        if (savedUserInfo) {
          setUserInfo(JSON.parse(savedUserInfo));
        }

        // Check auth status but don't initialize Google Fit automatically
        checkAuthStatus();
      } catch (error) {
        console.error("Error loading scripts:", error);
        setErrors((prev) => [...prev, "Failed to load Google scripts"]);
      }
    };

    loadScripts();

    // Cleanup function to remove scripts
    return () => {
      const gapiScript = document.getElementById("google-gapi-script");
      const gsiScript = document.getElementById("google-gsi-script");

      if (gapiScript?.parentNode) {
        gapiScript.parentNode.removeChild(gapiScript);
      }
      if (gsiScript?.parentNode) {
        gsiScript.parentNode.removeChild(gsiScript);
      }
    };
  }, []);

  console.log("Current user info:", userInfo);
  console.log("Authentication status:", isAuthenticated);

  // Render the dashboard
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl border border-gray-700/50 w-full mb-6 flex justify-center"
          >
            <button
              onClick={() => initializeGoogleFit()}
              className="bg-[#4285F4] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google Logo"
                className="w-6 h-6 bg-white p-1 rounded-full"
              />
              Sign in with Google
            </button>
          </motion.div>
        ) : (
          <>
            {/* User Profile Section */}
            {userInfo && (
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-xl text-[#FFC67D]">
                    User Profile
                  </h3>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-600 px-4 py-2 rounded-lg font-medium"
                  >
                    Sign Out
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  {userInfo.picture && (
                    <img
                      src={userInfo.picture}
                      alt="Profile"
                      className="w-16 h-16 rounded-full bg-gray-400"
                    />
                  )}
                  <div>
                    <p className="font-bold">{userInfo.name}</p>
                    <p className="text-gray-400">{userInfo.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Display Section */}
            {/* {errors.length > 0 && (
              <div className="bg-red-900 p-4 rounded-lg shadow-lg w-full mb-6">
                <h3 className="font-bold text-xl text-red-400 mb-2">Errors</h3>
                <ul className="list-disc pl-4">
                  {errors.map((error, index) => (
                    <li key={index} className="text-red-200">{error}</li>
                  ))}
                </ul>
              </div>
            )} */}

            {/* Motivational Message Section */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full mb-6">
              <p className="text-sm text-gray-400 font-semibold">
                Push beyond your limits today, because the greatest growth comes
                from the{" "}
                <button className="text-[#FFC67D] text-semibold underline">
                  challenges
                </button>{" "}
                you dare to face.
              </p>
            </div>

            {/* Statistics Grid Section */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full mb-6">
              <h3 className="font-bold text-xl text-[#FFC67D] mb-4">
                Today's Stats
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <AnimatedStatCard
                  EIcon={FaFire}
                  value={caloriesBurned.toString()}
                  label="Calories Burned"
                />
                <AnimatedStatCard
                  EIcon={FaHeartbeat}
                  value={`${heartRate} bpm`}
                  label="Avg. Heart Rate"
                />
                <AnimatedStatCard EIcon={FaDumbbell} value="45 min" label="Workout Time" />
                <AnimatedStatCard EIcon={FaRunning} value="Running" label="Activity" />
                <AnimatedStatCard EIcon={FaSwimmer} value="30 min" label="Swimming" />
                <AnimatedStatCard EIcon={FaBicycle} value="Cycling" label="Activity" />
                <AnimatedStatCard
                  EIcon={FaAppleAlt}
                  value={`${waterIntake} ml`}
                  label="Water Intake"
                />
                <AnimatedStatCard EIcon={FaWeight} value={`${weight} kg`} label="Weight" />
              </div>
            </div>

            {/* Progress and Wallet Section */}
            <div className="lg:flex lg:gap-6 w-full">
              <ProgressCard
                steps={steps}
                progress={progress}
                distance={distance}
                dailyGoal={dailyGoal}
                getEncouragement={getEncouragement}
              />
              <WalletCard
                bfPoints={bfPoints}
                todayPoints={todayPoints}
                ethereumBalance={ethereumBalance}
              />
            </div>

            {/* Conversion Section */}
            <ConversionCard
              inputValue={inputValue}
              outputValue={outputValue}
              handleInputChange={handleInputChange}
              handleConversion={handleConversion}
              handleReset={handleReset}
            />

            {/* Refresh Button */}
            <RefreshButton />
            
            {/* Historical Charts */}
            {historicalData.length > 0 && <HistoricalCharts data={historicalData} />}
          </>
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};

export default Dashboard;
