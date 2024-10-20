"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaFire, FaHeartbeat, FaDumbbell, FaRunning, FaSwimmer, FaBicycle, FaAppleAlt, FaWeight } from 'react-icons/fa';

const Dashboard = () => {
  const [steps, setSteps] = useState<number>(3500);
  const [distance, setDistance] = useState<number>(2.8);
  const [inputValue, setInputValue] = useState<string>("");
  const [outputValue, setOutputValue] = useState<string>("");
  const [bfPoints, setBfPoints] = useState<number>(1250);
  const [dailyGoal, setDailyGoal] = useState<number>(4000);
  const [todayPoints, setTodayPoints] = useState<number>(350);
  const [ethereumBalance, setEthereumBalance] = useState<number>(0.003125);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [heartRate, setHeartRate] = useState<number>(70);
  const [waterIntake, setWaterIntake] = useState<number>(0); // New state for water intake
  const [weight, setWeight] = useState<number>(70); // New state for weight
  const [progress, setProgress] = useState<number>(0);

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

  useEffect(() => {
    // Simulating step count increase
    const interval = setInterval(() => {
      setSteps((prevSteps) => {
        const newSteps = prevSteps + Math.floor(Math.random() * 10);
        setBfPoints(Math.floor(newSteps / 100));
        setDistance(newSteps * 0.0008);
        setTodayPoints(Math.floor(newSteps / 10));
        setCaloriesBurned(Math.floor(newSteps * 0.05));
        setHeartRate(70 + Math.floor(Math.random() * 30));
        setWaterIntake((prev) => prev + Math.floor(Math.random() * 200)); // Simulate water intake
        return newSteps;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = (steps / dailyGoal) * 100;
        return Math.min(newProgress, 100);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [steps, dailyGoal]);

  return (
    <div className="bg-gray-900 text-white p-6 w-full lg:flex lg:flex-col lg:items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full  mb-6">
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
          <div className="flex flex-col items-center">
            <FaFire className="text-3xl text-[#FFC67D] mb-2" />
            <p className="text-lg font-bold">{caloriesBurned}</p>
            <p className="text-sm text-gray-400">Calories Burned</p>
          </div>
          <div className="flex flex-col items-center">
            <FaHeartbeat className="text-3xl text-[#FFC67D] mb-2" />
            <p className="text-lg font-bold">{heartRate}</p>
            <p className="text-sm text-gray-400">Avg. Heart Rate</p>
          </div>
          <div className="flex flex-col items-center">
            <FaDumbbell className="text-3xl text-[#FFC67D] mb-2" />
            <p className="text-lg font-bold">45 min</p>
            <p className="text-sm text-gray-400">Workout Time</p>
          </div>
          <div className="flex flex-col items-center">
            <FaRunning className="text-3xl text-[#FFC67D] mb-2" />
            <p className="text-lg font-bold">Running</p>
            <p className="text-sm text-gray-400">Activity</p>
          </div>
          <div className="flex flex-col items-center">
            <FaSwimmer className="text-3xl text-[#FFC67D] mb-2" />
            <p className="text-lg font-bold">30 min</p>
            <p className="text-sm text-gray-400">Swimming</p>
          </div>
          <div className="flex flex-col items-center">
            <FaBicycle className="text-3xl text-[#FFC67D] mb-2" />
            <p className="text-lg font-bold">Cycling</p>
            <p className="text-sm text-gray-400">Activity</p>
          </div>
          <div className="flex flex-col items-center">
            <FaAppleAlt className="text-3xl text-[#FFC67D] mb-2" />
            <p className="text-lg font-bold">{waterIntake} ml</p>
            <p className="text-sm text-gray-400">Water Intake</p>
          </div>
          <div className="flex flex-col items-center">
            <FaWeight className="text-3xl text-[#FFC67D] mb-2" />
            <p className="text-lg font-bold">{weight} kg</p>
            <p className="text-sm text-gray-400">Weight</p>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:gap-6 w-full ">
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
      </div>

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
    </div>
  );
};

export default Dashboard;
