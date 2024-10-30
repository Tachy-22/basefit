// Import necessary dependencies and components
"use client"; // Marks this as a client-side component

import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaFire, FaHeartbeat, FaDumbbell, FaRunning, FaSwimmer, FaBicycle, FaAppleAlt, FaWeight } from 'react-icons/fa';

// StatCard component - Displays individual statistics with an icon, value and label
const StatCard = ({ icon: Icon, value, label }: { icon: any, value: string | number, label: string }) => (
  <div className="flex flex-col items-center">
    <Icon className="text-3xl text-[#FFC67D] mb-2" />
    <p className="text-lg font-bold">{value}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

// ProgressCard component - Shows daily progress including steps, circular progress bar and distance
const ProgressCard = ({ steps, progress, distance, dailyGoal, getEncouragement }: { 
  steps: number, 
  progress: number, 
  distance: number,
  dailyGoal: number,
  getEncouragement: (steps: number) => string
}) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 lg:w-1/2">
    <h3 className="font-bold text-xl text-[#FFC67D] mb-4">Daily Progress</h3>
    <div className="flex items-center justify-between mb-4">
      <p className="text-2xl font-bold">{steps} steps</p>
      <div className="w-24 h-24">
        <CircularProgressbar
          value={progress}
          text={`${progress.toFixed(0)}%`}
          styles={buildStyles({
            textColor: "#FFC67D",
            pathColor: "#FFC67D",
            trailColor: "#374151"
          })}
        />
      </div>
    </div>
    <div className="mb-4">
      <p className="font-bold text-xl text-[#FFC67D] mb-2">Distance</p>
      <p className="text-2xl font-bold">{distance.toFixed(2)} km</p>
    </div>
    <p className="text-sm font-semibold text-gray-400 text-center">
      {getEncouragement(steps)}
    </p>
  </div>
);

// WalletCard component - Displays cryptocurrency wallet information
const WalletCard = ({ bfPoints, todayPoints, ethereumBalance }: {
  bfPoints: number,
  todayPoints: number,
  ethereumBalance: number
}) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 lg:w-1/2">
    <h3 className="font-bold text-xl text-[#FFC67D] mb-4">Wallet</h3>
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-400">Total Balance</h4>
      <p className="text-2xl font-bold">{bfPoints} BF</p>
    </div>
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-gray-400">Today's Earnings</h4>
      <p className="text-xl font-bold">{todayPoints} BF</p>
    </div>
    <div>
      <h4 className="text-sm font-semibold text-gray-400">Ethereum Balance</h4>
      <p className="text-xl font-bold">{ethereumBalance.toFixed(6)} ETH</p>
    </div>
  </div>
);

// ConversionCard component - Handles conversion between BF and ETH tokens
const ConversionCard = ({ inputValue, outputValue, handleInputChange, handleConversion, handleReset }: {
  inputValue: string,
  outputValue: string,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleConversion: () => void,
  handleReset: () => void
}) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full mb-6">
    <h3 className="font-bold text-xl text-[#FFC67D] mb-4">Convert BF to ETH</h3>
    <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-400 mb-2">BF Amount</p>
        <input
          className="w-full bg-gray-900 p-3 rounded-md text-white outline-none"
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter BF amount"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-400 mb-2">ETH Equivalent</p>
        <input
          className="w-full bg-gray-900 p-3 rounded-md text-white outline-none"
          type="text"
          value={outputValue}
          readOnly
          placeholder="ETH Value"
        />
      </div>
    </div>
    <div className="flex justify-center gap-4">
      <button
        className="bg-[#0097A7] px-4 py-2 rounded-lg font-medium"
        onClick={handleConversion}
      >
        Convert
      </button>
      <button
        className="bg-gray-700 px-4 py-2 rounded-lg font-medium"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  </div>
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
    const savedToken = localStorage.getItem('googleAccessToken');
    console.log('Checking saved token:', savedToken);
    if (savedToken) {
      setAccessToken(savedToken);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('googleAccessToken');
    localStorage.removeItem('userInfo');
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
        console.log('User already authenticated, fetching data...');
        await fetchFitnessData();
        return;
      }

      if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        throw new Error('Google Client ID is not defined in environment variables');
      }

      console.log('Initializing Google Fit...');

      // Initialize Google Identity Services client
      const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/userinfo.profile',
        callback: async (tokenResponse: any) => {
          if (tokenResponse.access_token) {
            console.log('New token received:', tokenResponse);
            setAccessToken(tokenResponse.access_token);
            localStorage.setItem('googleAccessToken', tokenResponse.access_token);
            setIsAuthenticated(true);
            
            // Initialize Google API client
            await (window as any).gapi.client.init({});
            
            // Set access token
            (window as any).gapi.client.setToken({
              access_token: tokenResponse.access_token
            });

            // Fetch user information
            try {
              const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                  'Authorization': `Bearer ${tokenResponse.access_token}`
                }
              });
              const userInfoData = await userInfoResponse.json();
              console.log('User Info:', userInfoData);
              setUserInfo(userInfoData);
              localStorage.setItem('userInfo', JSON.stringify(userInfoData));
            } catch (error) {
              console.error('Error fetching user info:', error);
              setErrors(prev => [...prev, 'Failed to fetch user info']);
            }

            // Load Google Fitness API
            await (window as any).gapi.client.load('fitness', 'v1');
            
            // Fetch fitness data
            fetchFitnessData();
          }
        },
      });

      // Request access token
      tokenClient.requestAccessToken();

    } catch (error) {
      console.error('Error initializing Google Fit:', error);
      console.error('Full error details:', JSON.stringify(error, null, 2));
      setErrors(prev => [...prev, 'Failed to initialize Google Fit']);
    }
  };

  // Function to fetch fitness data from Google Fit
  const fetchFitnessData = async () => {
    try {
      console.log('Fetching fitness data...');
      const today = new Date();
      const startTime = new Date(today.setHours(0, 0, 0, 0)).getTime();
      const endTime = new Date().getTime();

      // Fetch steps data
      const stepsResponse = await (window as any).gapi.client.fitness.users.dataset.aggregate({
        userId: 'me',
        aggregateBy: [{
          dataTypeName: 'com.google.step_count.delta'
        }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime
      });

      console.log('Steps Response:', stepsResponse);

      // Process steps data
      const stepsData = JSON.parse(stepsResponse.body);
      if (stepsData.bucket[0]?.dataset[0]?.point?.length > 0) {
        const stepsCount = stepsData.bucket[0].dataset[0].point[0].value[0].intVal || 0;
        console.log('Steps Count:', stepsCount);
        setSteps(stepsCount);
        setBfPoints(Math.floor(stepsCount / 100));
        setTodayPoints(Math.floor(stepsCount / 10));
        setDistance(stepsCount * 0.0008);
        setCaloriesBurned(Math.floor(stepsCount * 0.05));
        setProgress((stepsCount / dailyGoal) * 100);
      }

      // Fetch heart rate data
      const heartRateResponse = await (window as any).gapi.client.fitness.users.dataset.aggregate({
        userId: 'me',
        aggregateBy: [{
          dataTypeName: 'com.google.heart_rate.bpm'
        }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime
      });

      console.log('Heart Rate Response:', heartRateResponse);

      // Process heart rate data
      const heartRateData = JSON.parse(heartRateResponse.body);
      if (heartRateData.bucket[0]?.dataset[0]?.point?.length > 0) {
        const heartRateValue = Math.round(heartRateData.bucket[0].dataset[0].point[0].value[0].fpVal) || 0;
        console.log('Heart Rate:', heartRateValue);
        setHeartRate(heartRateValue);
      }

      // Fetch weight data
      const weightResponse = await (window as any).gapi.client.fitness.users.dataset.aggregate({
        userId: 'me',
        aggregateBy: [{
          dataTypeName: 'com.google.weight'
        }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime
      });

      console.log('Weight Response:', weightResponse);

      // Process weight data
      const weightData = JSON.parse(weightResponse.body);
      if (weightData.bucket[0]?.dataset[0]?.point?.length > 0) {
        const weightValue = Math.round(weightData.bucket[0].dataset[0].point[0].value[0].fpVal) || 0;
        console.log('Weight:', weightValue);
        setWeight(weightValue);
      }

    } catch (error) {
      console.error('Error fetching fitness data:', error);
      setErrors(prev => [...prev, 'Failed to fetch fitness data']);
    }
  };

  // Effect hook to load Google scripts and initialize Google Fit
  useEffect(() => {
    console.log('Loading Google scripts...');
    const loadScripts = async () => {
      try {
        // Load Google Identity Services script
        await new Promise<void>((resolve) => {
          const gsiScript = document.createElement('script');
          gsiScript.src = 'https://accounts.google.com/gsi/client';
          gsiScript.id = 'google-gsi-script';
          gsiScript.onload = () => resolve();
          document.body.appendChild(gsiScript);
        });

        // Load Google API script
        await new Promise<void>((resolve) => {
          const gapiScript = document.createElement('script');
          gapiScript.src = 'https://apis.google.com/js/api.js';
          gapiScript.id = 'google-gapi-script';
          gapiScript.onload = () => {
            (window as any).gapi.load('client', () => resolve());
          };
          document.body.appendChild(gapiScript);
        });

        // Check for saved user info
        const savedUserInfo = localStorage.getItem('userInfo');
        if (savedUserInfo) {
          setUserInfo(JSON.parse(savedUserInfo));
        }

        // Check auth status but don't initialize Google Fit automatically
        checkAuthStatus();

      } catch (error) {
        console.error('Error loading scripts:', error);
        setErrors(prev => [...prev, 'Failed to load Google scripts']);
      }
    };

    loadScripts();

    // Cleanup function to remove scripts
    return () => {
      const gapiScript = document.getElementById('google-gapi-script');
      const gsiScript = document.getElementById('google-gsi-script');

      if (gapiScript?.parentNode) {
        gapiScript.parentNode.removeChild(gapiScript);
      }
      if (gsiScript?.parentNode) {
        gsiScript.parentNode.removeChild(gsiScript);
      }
    };
  }, []);

  // Effect hook to periodically fetch fitness data
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Setting up periodic data fetch...');
      fetchFitnessData(); // Initial fetch when authenticated
      // Fetch data every 5 minutes
      const interval = setInterval(fetchFitnessData, 300000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  console.log('Current user info:', userInfo);
  console.log('Authentication status:', isAuthenticated);

  // Render the dashboard
  return (
    <div className="bg-gray-900 text-white p-6 w-full lg:flex lg:flex-col lg:items-center">
      {!isAuthenticated ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full mb-6 flex justify-center">
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
        </div>
      ) : (
        <>
          {/* User Profile Section */}
          {userInfo && (
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-[#FFC67D]">User Profile</h3>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 px-4 py-2 rounded-lg font-medium"
                >
                  Sign Out
                </button>
              </div>
              <div className="flex items-center gap-4">
                {userInfo.picture && (
                  <img src={userInfo.picture} alt="Profile" className="w-16 h-16 rounded-full bg-gray-400" />
                )}
                <div>
                  <p className="font-bold">{userInfo.name}</p>
                  <p className="text-gray-400">{userInfo.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Display Section */}
          {errors.length > 0 && (
            <div className="bg-red-900 p-4 rounded-lg shadow-lg w-full mb-6">
              <h3 className="font-bold text-xl text-red-400 mb-2">Errors</h3>
              <ul className="list-disc pl-4">
                {errors.map((error, index) => (
                  <li key={index} className="text-red-200">{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Motivational Message Section */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full mb-6">
            <p className="text-sm text-gray-400 font-semibold">
              Push beyond your limits today, because the greatest growth comes from the{" "}
              <button className="text-[#FFC67D] text-semibold underline">
                challenges
              </button>{" "}
              you dare to face.
            </p>
          </div>

          {/* Statistics Grid Section */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full mb-6">
            <h3 className="font-bold text-xl text-[#FFC67D] mb-4">Today's Stats</h3>
            <div className="grid grid-cols-4 gap-4">
              <StatCard icon={FaFire} value={caloriesBurned} label="Calories Burned" />
              <StatCard icon={FaHeartbeat} value={heartRate} label="Avg. Heart Rate" />
              <StatCard icon={FaDumbbell} value="45 min" label="Workout Time" />
              <StatCard icon={FaRunning} value="Running" label="Activity" />
              <StatCard icon={FaSwimmer} value="30 min" label="Swimming" />
              <StatCard icon={FaBicycle} value="Cycling" label="Activity" />
              <StatCard icon={FaAppleAlt} value={`${waterIntake} ml`} label="Water Intake" />
              <StatCard icon={FaWeight} value={`${weight} kg`} label="Weight" />
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
        </>
      )}
    </div>
  );
};

export default Dashboard;