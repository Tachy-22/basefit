"use client";

import { useEffect, useState } from "react";

const useFetchFitnessData = () => {
  // State declarations for various fitness and wallet metrics
  const [steps, setSteps] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [bfPoints, setBfPoints] = useState<number>(0);
  const [dailyGoal, setDailyGoal] = useState<number>(4000);
  const [todayPoints, setTodayPoints] = useState<number>(0);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [heartRate, setHeartRate] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());
  const POLLING_INTERVAL = 30000; // 30 seconds
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  const fitnessData = {
    steps,
    distance,
    bfPoints,
    todayPoints,
    caloriesBurned,
    heartRate,
    weight,
    progress,
    userInfo,
    errors,
    accessToken,
    lastUpdateTime,
    historicalData,
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
            distance: (
              ((bucket.dataset[0].point[0]?.value[0]?.intVal || 0) * 0.762) /
              1000
            ).toFixed(2),
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

  // Add toast notifications for key actions
  const handleManualRefresh = async () => {
    await fetchFitnessData(true);
  };

  // Effect hook to set up subscription and polling
  useEffect(() => {
    if (isAuthenticated) {
      // Set up initial subscription
      subscribeToFitnessUpdates();

      // Fetch initial data
      fetchFitnessData(true);

      // Fetch historical data
      fetchHistoricalData().then((data) => setHistoricalData(data));

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

  return {
    fitnessData,
    handleSignOut,
    initializeGoogleFit,
    handleManualRefresh,
    isAuthenticated,
  };
};

export default useFetchFitnessData;
