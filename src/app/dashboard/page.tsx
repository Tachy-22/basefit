"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0); //holds the value and changes of the location
  const [inputValue, setInputValue] = useState<string>("") // holding the value of BF points
  const [outputValue, setOutputValue] = useState<string>("") // holding calculated ETH value
  const [bfPoints, setBfPoints] = useState<number>(0); // state to hold BF points earned
  const [isMotionSupported, setIsMotionSupported] = useState<boolean>(true);
  const [isGeolocationSupported, setIsGeolocationSupported] = useState<boolean>(true);


  //handles the BF input field changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };


  //conversion button from BF points to Ethereum 
  const handleConversion = () => {
    const Ethereum = 0.0000025; // Conversion rate
    if (inputValue) {
      const inputAsNumber = parseFloat(inputValue); // Convert string to number
      if (!isNaN(inputAsNumber)) {
        setOutputValue((inputAsNumber * Ethereum).toFixed(8));
      } else {
        setOutputValue("Invalid Input");
      }
    }
  };

  //Resets button for the Inputs Conversion
  const handleReset = () => {
    setInputValue("");
    setOutputValue("");
  };

  //The percentage progress of User's steps
  const i = (steps / 4000) * 100;

  //Encouragement section changes based on user's progress
  const getEncouragement = (steps: number): string => {
    if (steps < 4000) {
      return "Keep walking! Those snacks in your pantry aren't going to burn themselves off!";
    } else if (steps >= 4000) {
      return "Fantastic! Now let's keep those legs moving. You didn't come this far just to stop and admire the view!";
    }
    return "Start Walking";
  };


  // Conversion Rate: 100 steps = 1 BF point
  const STEP_TO_BF_CONVERSION_RATE = 100;

  // Function to calculate BF points based on steps
  const calculateBfPoints = (steps: number) => {
    const points = Math.floor(steps / STEP_TO_BF_CONVERSION_RATE);
    setBfPoints(points);
  };


  useEffect(() => {
    let stepCount = 0;

    //Requesting permission for tracking user's hardware
    const requestMotionPermission = async () => {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function"
      ) {
        try {
          const permission = await (DeviceMotionEvent as any).requestPermission();
          if (permission === "granted") {
            window.addEventListener("devicemotion", handleMotionEvent);
          } else {
            alert("Permission for DeviceMotion not granted");
          }
        } catch (error) {
          console.log("Error requesting DeviceMotion permission:", error);
        }
      } else {
        // No permission request needed on some browsers/devices
        window.addEventListener("devicemotion", handleMotionEvent);
      }
    };

    //Ensures to count steps as users device move
    const handleMotionEvent = (event: DeviceMotionEvent) => {
      const { acceleration } = event;
      if (acceleration) {
        // Basic step detection logic (you can make it more complex for better accuracy)
        const totalAcc = Math.abs(acceleration.x || 0) + Math.abs(acceleration.y || 0) + Math.abs(acceleration.z || 0);
        if (totalAcc > 10) {
          stepCount++;
          setSteps(stepCount);
          // Update BF points based on steps walked
          calculateBfPoints(stepCount);
          console.log("Step Count:", stepCount);
        }
      }
    };

    //checking if user's device supports it
    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleMotionEvent);
    } else {
      console.log("DeviceMotion is not supported by this browser.");
    }

    return () => {
      window.removeEventListener("devicemotion", handleMotionEvent);
    };
  }, []);


  // Track distance using Geolocation
  useEffect(() => {
    let prevPosition: GeolocationPosition | null = null;
    let totalDistance = 0;
    let watchId: number | undefined;

    //request permission to track user's location
    const requestGeolocationPermission = async () => {
      try {
        const permission = await navigator.permissions.query({ name: "geolocation" });
        if (permission.state === "granted" || permission.state === "prompt") {
          startGeolocation();
        } else {
          alert("Geolocation permission denied");
        }
      } catch (error) {
        console.log("Error requesting geolocation permission:", error);
      }
    };

    // useEffect(() => {
    //   if (typeof DeviceMotionEvent === "undefined") {
    //     setIsMotionSupported(false);
    //   }
    //   if (!navigator.geolocation) {
    //     setIsGeolocationSupported(false);
    //   }
    // }, []);


    const startGeolocation = () => {
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(handlePosition, (error) => {
          console.log("Geolocation error:", error);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    const handlePosition = (position: GeolocationPosition) => {
      if (prevPosition) {
        const { latitude: lat1, longitude: lon1 } = prevPosition.coords;
        const { latitude: lat2, longitude: lon2 } = position.coords;
        const R = 6371e3; // Earth radius in meters
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
          Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c; // Distance in meters
        totalDistance += d;
        setDistance(totalDistance / 1000); // Convert to kilometers
        console.log("Distance (km):", totalDistance / 1000);
      }
      prevPosition = position;
    };

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(handlePosition, (error) => {
        console.log("Geolocation error:", error);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    requestGeolocationPermission();


    return () => {
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId); // Pass watchId (a number) instead of handlePosition
      }
    };
  }, []);

  return (
    <div className="bg-gray-900 bg-[url('https://res.cloudinary.com/doijevrqo/image/upload/v1729264315/athletic-person-exercising-working-out_zyf7zq.jpg')] bg-cover bg-center text-white p-6 w-full lg:flex lg:flex-col lg:items-center">
      {/* An encouragement to challenge yourself */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg md:mt-10 lg:w-3/5">
        <p className="text-sm text-gray-400 font-semibold">
          Push beyond your limits today, because the greatest growth comes
          from the{" "}
          <button className="text-[#FFC67D] text-semibold underline">
            challenges
          </button>{" "}
          you dare to face.
        </p>
      </div>

      <div className="md:flex md:gap-6 lg:w-3/5">
        {/* Exchange Rate */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg hidden md:block md:mt-5 md:w-1/2 ">
          <h3 className="my-2 font-bold text-xl text-[#FFC67D]">Exchange Rate</h3>
          <p className="text-sm font-semibold text-gray-400 my-6">Check the value of your points</p>
          <div className="flex justify-between items-center">
            <p>1<span className="text-gray-400 font-semibold text-md">BF</span></p>
            <Image src={"https://res.cloudinary.com/doijevrqo/image/upload/v1729152849/forward-arrow-svgrepo-com_rkgvzy.svg"} alt="forward arrow" width={20} height={20} />
            <p>0.0000025<span className="text-gray-400 font-semibold text-md">ETH</span></p>
          </div>
          <div>
            <div>
              <p className="text-gray-400 font-semibold text-md mt-7 mb-3">Pay</p>
              <div className="bg-gray-900 flex p-5 rounded-md">
                <input
                  className="outline-none w-48 text-white border-r border-gray-500 bg-inherit"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Enter point"
                />
                <p className="px-2">BF</p>
              </div>
            </div>
            <div>
              <p className="text-gray-400 font-semibold text-md mt-7 mb-3">Get</p>
              <div className="bg-gray-900 flex p-5 rounded-md">
                <input
                  className="outline-none w-48 text-white border-r border-gray-500 bg-inherit"
                  type="text"
                  value={outputValue}
                  readOnly
                  placeholder="Ethereum Value"
                />
                <p className="px-2">ETH</p>
              </div>
            </div>
            <div className="flex justify-center gap-5">
              <button className="bg-[#0097A7] text-md p-2 rounded-lg font-medium outline-none my-5"
                onClick={handleConversion}>Convert</button>
              <button className="bg-[#0097A7] text-md p-2 rounded-lg font-medium outline-none my-5"
                onClick={handleReset}>Reset</button>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-5 md:w-1/2">
          <p className="text-sm font-semibold text-gray-400 text-center">It is scientifically proven to walk at least 4000 steps a day.</p>
          <h3 className="mt-7 font-bold text-xl text-[#FFC67D]">Steps</h3>
          <div className="my-5 flex items-center justify-between">
            <p className="text-2xl font-bold my-3">{steps} steps =</p>
            <div className="text-lg font-semibold w-24 h-24 rounded-full flex justify-center items-center border-[#FFC67D] border-[10px]">{i.toFixed(2) + "%"}</div>
          </div>
          <div>
            <p className="mt-7 font-bold text-xl text-[#FFC67D]">Distance count</p>
            <p className="text-2xl font-bold my-3 md:text-4xl">{distance.toFixed(2)} km</p>
          </div>
          <p className="text-sm font-semibold text-gray-400 text-center mt-10">{getEncouragement(steps)}
            <Image src={"https://res.cloudinary.com/doijevrqo/image/upload/v1729134756/angry-face-svgrepo-com_z8zavp.svg"} alt="angry icon" width={30} height={30} className="inline-block ml-2" />
          </p>
        </div>
      </div>

      {/* Wallet Section */}
      <div className="bg-gray-800 p-8 my-5 rounded-lg shadow-lg lg:w-3/5">
        <h3 className="mb-5 font-bold text-xl text-[#FFC67D]">Wallet</h3>
        <h3 className="text-sm font-semibold text-gray-400">
          Total Point Balance
        </h3>
        <p className="text-2xl font-bold my-3">{bfPoints}BF</p>
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-sm font-semibold text-gray-400">
              Point Accumulated Today
            </h3>
            <p className="text-2xl font-bold my-3">500BF</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400">Ethereum</h3>
            <p className="text-2xl font-bold my-3">0.00005ETH</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
