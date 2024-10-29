"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaFire, FaHeartbeat, FaDumbbell, FaRunning, FaSwimmer, FaBicycle, FaAppleAlt, FaWeight } from 'react-icons/fa';

const StatCard = ({ icon: Icon, value, label }: { icon: any, value: string | number, label: string }) => (
  <div className="flex flex-col items-center">
    <Icon className="text-3xl text-[#FFC67D] mb-2" />
    <p className="text-lg font-bold">{value}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

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

const Dashboard = () => {
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

  const getEncouragement = (steps: number): string => {
    if (steps < dailyGoal) {
      return `Keep going! You're ${dailyGoal - steps} steps away from your daily goal.`;
    } else {
      return "Fantastic! You've reached your daily goal. Why not push for more?";
    }
  };

  const initializeGoogleFit = async () => {
    try {
      // First, check if NEXT_PUBLIC_GOOGLE_CLIENT_ID is defined
      if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        throw new Error('Google Client ID is not defined in environment variables');
      }

      console.log('Initializing Google Fit with Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
      console.log('Current origin:', window.location.origin);

      // Initialize Google Fit API
      const auth2 = await (window as any).gapi.auth2.init({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.heart_rate.read',
        cookiepolicy: 'single_host_origin'
      });

      if (auth2.isSignedIn.get()) {
        setIsAuthenticated(true);
        fetchFitnessData();
      } else {
        console.log('User not signed in');
        // Optionally, you can add a sign-in button here
        // auth2.signIn();
      }
    } catch (error) {
      console.error('Error initializing Google Fit:', error);
      console.error('Full error details:', JSON.stringify(error, null, 2));
    }
  };

  const fetchFitnessData = async () => {
    try {
      const today = new Date();
      const startTime = new Date(today.setHours(0, 0, 0, 0)).getTime();
      const endTime = new Date().getTime();

      // Load fitness API
      await (window as any).gapi.client.load('fitness', 'v1');

      // Get steps data
      const stepsResponse = await (window as any).gapi.client.fitness.users.dataset.aggregate({
        userId: 'me',
        aggregateBy: [{
          dataTypeName: 'com.google.step_count.delta'
        }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime
      });

      if (stepsResponse.result.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal) {
        const stepsCount = stepsResponse.result.bucket[0].dataset[0].point[0].value[0].intVal;
        setSteps(stepsCount);
        setBfPoints(Math.floor(stepsCount / 100));
        setTodayPoints(Math.floor(stepsCount / 10));
        setDistance(stepsCount * 0.0008);
        setCaloriesBurned(Math.floor(stepsCount * 0.05));
        setProgress((stepsCount / dailyGoal) * 100);
      }

      // Get heart rate data
      const heartRateResponse = await (window as any).gapi.client.fitness.users.dataset.aggregate({
        userId: 'me',
        aggregateBy: [{
          dataTypeName: 'com.google.heart_rate.bpm'
        }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime
      });

      if (heartRateResponse.result.bucket[0]?.dataset[0]?.point[0]?.value[0]?.fpVal) {
        setHeartRate(Math.round(heartRateResponse.result.bucket[0].dataset[0].point[0].value[0].fpVal));
      }

      // Get weight data
      const weightResponse = await (window as any).gapi.client.fitness.users.dataset.aggregate({
        userId: 'me',
        aggregateBy: [{
          dataTypeName: 'com.google.weight'
        }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime
      });

      if (weightResponse.result.bucket[0]?.dataset[0]?.point[0]?.value[0]?.fpVal) {
        setWeight(Math.round(weightResponse.result.bucket[0].dataset[0].point[0].value[0].fpVal));
      }

    } catch (error) {
      console.error('Error fetching fitness data:', error);
    }
  };

  useEffect(() => {
    // Load Google API Client Library
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      (window as any).gapi.load('client:auth2', initializeGoogleFit);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch data every 5 minutes
      const interval = setInterval(fetchFitnessData, 300000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  return (
    <div className="bg-gray-900 text-white p-6 w-full lg:flex lg:flex-col lg:items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full mb-6">
        <p className="text-sm text-gray-400 font-semibold">
          Push beyond your limits today, because the greatest growth comes from the{" "}
          <button className="text-[#FFC67D] text-semibold underline">
            challenges
          </button>{" "}
          you dare to face.
        </p>
      </div>

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

      <ConversionCard
        inputValue={inputValue}
        outputValue={outputValue}
        handleInputChange={handleInputChange}
        handleConversion={handleConversion}
        handleReset={handleReset}
      />
    </div>
  );
};

export default Dashboard;
