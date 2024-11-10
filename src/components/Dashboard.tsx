"use client";

import React from "react";
import useFetchFitnessData from "src/hooks/useFetchFitnessData";
import {
  FaHeartbeat,
  FaFire,
  FaWeight,
  FaBicycle,
  FaTrophy,
  FaWalking,
  FaRoad,
  FaCoins,
  FaBolt,
} from "react-icons/fa";
import { Button, Tooltip } from "@nextui-org/react";
import { IoMdRefresh } from "react-icons/io";
import HistoricalFitnessCharts from "./HistoricalFitnessCharts";
import MyChallengesTable from "./MyChallengesTable";
import { AnimatedStatCard } from "./AnimatedStatCards";
import { BsInfoCircle } from "react-icons/bs";

const Dashboard = () => {
  const {
    fitnessData,
    handleSignOut,
    initializeGoogleFit,
    handleManualRefresh,
    isAuthenticated,
  } = useFetchFitnessData();

  console.log({ fitnessData, isAuthenticated });

  return (
    <div className=" min-h-full p-6 pt-12 flex flex-col gap-6 ">
      <div className="text-xl flex justify-between w-full h-full">
        <h1 className="flex gap-2 items-end">
          Welcome,{" "}
          <span className="">
            {isAuthenticated ? (
              fitnessData?.userInfo?.name
            ) : (
              <div className="flex gap-2 items-end">
                kindly
                <p
                  onClick={() => initializeGoogleFit()}
                  className="hover:text-teal-300 text-teal-200 underline cursor-pointer"
                >
                  connect
                </p>
                to a fitness provider
                <Tooltip content="Only one fitness provider can be added">
                  <BsInfoCircle className="text-stone-300" />
                </Tooltip>
              </div>
            )}
          </span>
        </h1>
        {/* Refresh Button */}
        {isAuthenticated && (
          <div className="flex items-center gap-3">
            <Button variant="light" isIconOnly onClick={handleManualRefresh}>
              <IoMdRefresh className="text-xl text-stone-300" />
            </Button>
            <Button onClick={handleSignOut} color="default">
              Sign Out
            </Button>
          </div>
        )}
      </div>

      <div className="w-full mx-auto h-full  min-h-full">
        <div className="flex flex-col gap-8 justify-bewteen h-full mb-[9rem]">
          {/* KPI's */}
          <div className="grid grid-cols-3 w-full gap-6">
            <div className=" p-6 rounded-lg bg-stone-700 ">
              <h3 className="text-2xl font-semibold mb-4  text-white">
                Points Balance
              </h3>
              <div className="flex items-center justify-between">
                <FaCoins className="text-4xl text-yellow-500" />
                <p className="text-3xl font-bold from-yellow-500 to-yellow-300 ">
                  {isAuthenticated ? 400 : 0}
                </p>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Convertible to Ethereum
              </p>
            </div>

            <div className=" p-6 rounded-lg bg-stone-700 ">
              <h3 className="text-2xl font-semibold mb-4  text-white">
                Achievement Level
              </h3>
              <div className="flex items-center justify-between">
                <FaTrophy className="text-coral-500 text-4xl" />

                <p className="text-3xl font-bold from-coral-500 to-coral-300 ">
                  {isAuthenticated ? 2 : 0}
                </p>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Next level: {isAuthenticated ? 2 : 0}
                /3 days
              </p>
            </div>

            <div className=" p-6 rounded-lg bg-stone-700 ">
              <h3 className="text-2xl font-semibold mb-4  text-white">
                Login Streak
              </h3>
              <div className="flex items-center justify-between">
                <FaFire className="text-4xl text-red-500" />
                <p className="text-3xl font-bold from-red-500 to-red-300 ">
                  {" "}
                  {isAuthenticated ? 4 : 0}
                </p>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Keep logging in daily!
              </p>
            </div>
          </div>

          <section className="grid lg:grid-cols-5 gap-6 h-full">
            <div className="lg:col-span-3 w-full min-h-full bg-stone-700 p-6 rounded-lg">
              <HistoricalFitnessCharts data={fitnessData.historicalData} />
            </div>

            {/* Statistics Grid Section */}
            <div className="bg-stone-700 lg:col-span-2 p-6 rounded-lg  w-full mb-6 h-full">
              <h3 className="font-bold text-xl text-white  mb-4">
                Today's Stats
              </h3>
              <div className="grid sm:grid-cols-3 lg:grid-cols-2 gap-6">
                <AnimatedStatCard
                  EIcon={FaBolt}
                  value={fitnessData.caloriesBurned.toFixed().toString()}
                  label="Calories Burned"
                />
                <AnimatedStatCard
                  EIcon={FaHeartbeat}
                  value={`${fitnessData.heartRate.toFixed()}`}
                  label="Avg. Heart Rate"
                />

                <AnimatedStatCard
                  EIcon={FaBicycle}
                  value={"0"}
                  label="Activity"
                />

                <AnimatedStatCard
                  EIcon={FaWeight}
                  value={`${fitnessData.weight.toFixed()}`}
                  label="Weight"
                />
                <AnimatedStatCard
                  EIcon={FaWalking}
                  value={`${fitnessData.steps.toFixed()} `}
                  label="Steps"
                />
                <AnimatedStatCard
                  EIcon={FaRoad}
                  value={`${fitnessData.distance.toFixed()} mi`}
                  label="Mileage"
                />
              </div>
            </div>
          </section>

          <div className="w-full">
            <h3 className="font-bold text-xl text-white  mb-4">
              My Challenges
            </h3>
            <MyChallengesTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
