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
import { GiBodyHeight } from "react-icons/gi";
import { Button, Skeleton, Tooltip } from "@nextui-org/react";
import { IoMdRefresh } from "react-icons/io";
import HistoricalFitnessCharts from "./HistoricalFitnessCharts";
import MyChallengesTable from "./MyChallengesTable";
import { AnimatedStatCard } from "./AnimatedStatCards";
import { BsInfoCircle } from "react-icons/bs";
import { HiCheckBadge } from "react-icons/hi2";
import Image from "next/image";

const Dashboard = () => {
  const {
    data,
    userInfo,
    historicalData,
    handleSignOut,
    initializeGoogleFit,
    handleManualRefresh,
    isAuthenticated,
  } = useFetchFitnessData();

  console.log({ isAuthenticated });

  const caloriesBurned = data?.find(
    (item: any) => item.type === "calories.expended"
  );
  const steps = data?.find((item: any) => item.type === "step_count.delta");
  const weight = data?.find((item: any) => item.type === "weight");
  const heartRate = data?.find((item: any) => item.type === "heart_rate.bpm");
  const distance = data?.find((item: any) => item.type === "beart_beat.bpm");
  const height = data?.find((item: any) => item.type === "height");

  const bodyFatPercentage = data?.find(
    (item: any) => item.type === "beart_beat.bpm"
  );

  // Example height (in meters) from the array provided

  // Calculate stride length (assuming it's for a male)
  const strideLength = height?.value || 1.7 * 0.415; // Adjust the multiplier based on gender if necessary

  // Calculate total distance (in meters)
  const totalDistanceMeters = steps?.value || 0 * strideLength;

  // Convert to miles
  const totalDistanceMiles = totalDistanceMeters / 1609.34;

  return (
    <div className=" min-h-full flex flex-col gap-6 w-full">
      <div
        className={`${isAuthenticated ? "justify-between" : "items-center justify-center"} relative h-[20rem] overflow-hidden min-w-full bg-[#100f24] p-6 flex flex-col gap-2`}
      >
        <h1 className="flex gap-2 items-end text-xl z-20 justify-start w-full px-[2rem] ">
          <>
            {isAuthenticated ? (
              <div className="flex items-center justify-between w-full gap-4">
                <span className="">
                  <p className="text-nowrap w-fit text-white/60 font-semibold text-lg px-4">
                    Hello, {userInfo?.name} !
                  </p>
                </span>{" "}
                <div className="text-xl flex  p-1  justify-between items-center h-full">
                  {/* Refresh Button */}
                  {isAuthenticated && (
                    <div className="flex items-center  h-full gap-3">
                      <Button
                        variant="light"
                        isIconOnly
                        onClick={handleManualRefresh}
                      >
                        <IoMdRefresh className="text-xl text-stone-300" />
                      </Button>
                      <Button onClick={handleSignOut} color="default">
                        Sign Out
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex gap-2 items-end text-white">
                <span className="">Welcome, kindly</span>
                <Button
                  variant="light"
                  onClick={() => initializeGoogleFit()}
                  className="hover:text-teal-300 text-teal-200 underline cursor-pointer"
                >
                  connect
                </Button>
                to a fitness provider
                <Tooltip content="Only one fitness provider can be added">
                  <div className="">
                    {" "}
                    <BsInfoCircle className="text-stone-300" />
                  </div>
                </Tooltip>
              </div>
            )}
          </>
        </h1>

        <>
          {isAuthenticated ? (
            <div className="w-full  h-full flex justify-between px-[2rem]">
              {" "}
              <div className=" w-fit flex flex-col justify-center items-cente gap-3 px-4">
                <div className="overflow-hidden">
                  {" "}
                  {userInfo?.picture && (
                    <Image
                      src={userInfo.picture}
                      alt="Profile image"
                      className="w-[8rem] min-h-[8rem] rounded-full bg-gray-400  border-purple-500 border-2 border-spacing-6"
                      width={100}
                      height={100}
                    />
                  )}
                </div>

                <div className="flex gap-2 items-center ">
                  <HiCheckBadge className="text-orange-500 text-3xl" />{" "}
                  <Skeleton isLoaded={userInfo?.name}>
                    <p className="font-semibold text-white text-nowrap text-xl">
                      {userInfo?.name}
                    </p>
                  </Skeleton>
                </div>
              </div>
              {/* display some data here */}
              <div className=" w-full max-w-[40rem] flex flex-col gap-3 p-3">
                <div className=" w-full h-full flex  items-center justify-between gap-4  ">
                  <div className=" flex flex-col gap-2 items-center justify-center p-4">
                    <p className="font-bold text-white">70k</p>
                    <span className="text-sm capitalize">top values</span>
                  </div>
                  <div className="max-h-[30%] min-h-[30%] w-[1px] h-full bg-slate-400"></div>
                  <div className=" flex flex-col gap-2 items-center justify-center p-4">
                    <p className="font-bold text-white">70k</p>
                    <span className="text-sm capitalize">top values</span>
                  </div>
                  <div className="max-h-[30%] min-h-[30%] w-[1px] h-full bg-slate-400"></div>

                  <div className=" flex flex-col gap-2 items-center justify-center p-4">
                    <p className="font-bold text-white">70k</p>
                    <span className="text-sm capitalize">top values</span>
                  </div>
                </div>
                <div className=" w-full h-full flex  items-center justify-between gap-4  ">
                  <div className=" flex flex-col gap-2 items-center justify-center p-4">
                    <p className="font-bold text-white">70k</p>
                    <span className="text-sm capitalize">top values</span>
                  </div>
                  <div className="max-h-[30%] min-h-[30%] w-[1px] h-full bg-slate-400"></div>
                  <div className=" flex flex-col gap-2 items-center justify-center p-4">
                    <p className="font-bold text-white">70k</p>
                    <span className="text-sm capitalize">top values</span>
                  </div>
                  <div className="max-h-[30%] min-h-[30%] w-[1px] h-full bg-slate-400"></div>

                  <div className=" flex flex-col gap-2 items-center justify-center p-4">
                    <p className="font-bold text-white">70k</p>
                    <span className="text-sm capitalize">top values</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className=""></div>
          )}
          {/* Coral colored blobs */}
          <div className="absolute top-3 left-6 h-24 w-24 rounded-full bg-[#FF6F61] opacity-50 blur-lg z-10"></div>
          <div className="absolute -bottom-[3%] right-[60%] h-20 w-20 rounded-full bg-[#FF6F61] opacity-20 blur-lg z-10"></div>
          <div className="absolute top-1 left-[80%] h-12 w-12 rounded-full bg-[#FF6F61] opacity-60 blur-lg z-10"></div>
          <div className="absolute bottom-6 right-[1%] h-20 w-20 rounded-full bg-[#FF6F61] opacity-60 blur-lg z-10"></div>
        </>
      </div>

      <div className="w-full mx-auto h-full  p-6  min-h-full">
        <div className="flex flex-col gap-8 justify-bewteen h-full mb-[9rem]">
          {/* KPI's */}
          <div className="grid grid-cols-3 w-full gap-6">
            <div className="p-6 rounded-lg bg-gradient-to-br from-[#2f274e] via-gray-700 to-[#2f274e] shadow-lg">
              {" "}
              <h3 className="text-2xl font-semibold mb-4  text-white">
                Points Balance
              </h3>
              <div className="flex items-center justify-between">
                <FaCoins className="text-4xl text-yellow-500" />
                <p className="text-3xl font-bold from-yellow-500 to-yellow-300 ">
                  {isAuthenticated ? 400 : 0}{" "}
                </p>
              </div>
              <p className="text-sm capitalize text-gray-400 mt-2">
                Convertible to Ethereum
              </p>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-br from-[#2f274e] via-gray-700 to-[#2f274e] shadow-lg">
              <h3 className="text-2xl font-semibold mb-4  text-white">
                Achievement Level
              </h3>
              <div className="flex items-center justify-between">
                <FaTrophy className="text-coral-500 text-4xl" />

                <p className="text-3xl font-bold from-coral-500 to-coral-300 ">
                  {isAuthenticated ? 2 : 0}
                </p>
              </div>
              <p className="text-sm capitalize text-gray-400 mt-2">
                Next level: {isAuthenticated ? 2 : 0}
                /3 days
              </p>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-br from-[#2f274e] via-gray-700 to-[#2f274e] shadow-lg">
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
              <p className="text-sm capitalize text-gray-400 mt-2">
                Keep logging in daily!
              </p>
            </div>
          </div>

          <section className="grid lg:grid-cols-5 gap-6 min-h-full">
            <div className="lg:col-span-3 w-full min-h-[25rem] bg-gradient-to-br from-[#2f274e] via-gray-700 to-[#2f274e] shadow-lg p-6 rounded-lg">
              <HistoricalFitnessCharts data={historicalData} />
            </div>

            {/* Statistics Grid Section */}
            <div className="bg-gradient-to-br from-[#2f274e] via-gray-700 to-[#2f274e] shadow-lg lg:col-span-2 p-6 rounded-lg  w-full mb-6 h-full">
              <h3 className="font-bold text-xl text-white  mb-4">
                Today's Stats
              </h3>
              {/* Display other data */}
              <div className="grid sm:grid-cols-3 lg:grid-cols-2 gap-6">
                <AnimatedStatCard
                  EIcon={FaBolt}
                  value={`${caloriesBurned?.value?.toFixed() || 0} cal`}
                  label="Calories Burned"
                />
                <AnimatedStatCard
                  EIcon={FaHeartbeat}
                  value={`${heartRate?.value?.toFixed() || 0} bpm`}
                  label="Avg. Heart Rate"
                />

                <AnimatedStatCard
                  EIcon={GiBodyHeight}
                  value={`${height?.value?.toFixed(2) || 0} m`}
                  label="Height"
                />

                <AnimatedStatCard
                  EIcon={FaWeight}
                  value={`${weight?.value?.toFixed() || 0}`}
                  label="Weight"
                />
                <AnimatedStatCard
                  EIcon={FaWalking}
                  value={`${steps?.value?.toFixed() || 0}`}
                  label="Steps"
                />
                <AnimatedStatCard
                  EIcon={FaRoad}
                  value={`${totalDistanceMiles.toFixed(2) || 0} mi`}
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
