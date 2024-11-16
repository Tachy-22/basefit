"use client";

import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

const useFetchFitnessData = () => {
  // State declarations for various fitness and wallet metrics
  const [data, setData] = useState<
    { type: string; value: null | number }[] | null
  >(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now());
  const POLLING_INTERVAL = 30000; // 30 seconds
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  const fitnessData = {
    userInfo,
    errors,
    lastUpdateTime,
    historicalData,
  };
  // Check if user is already authenticated
  const checkAuthStatus = () => {
    const savedToken = Cookies.get("googleAccessToken");
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
    Cookies.remove("googleAccessToken");
    Cookies.remove("userInfo");
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
            Cookies.set("googleAccessToken", tokenResponse.access_token, {
              expires: 1, // 1 day expiration
              secure: true,
              sameSite: "strict",
            });
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
              Cookies.set("userInfo", JSON.stringify(userInfoData), {
                expires: 1, // 1 day expiration
                secure: true,
                sameSite: "strict",
              });
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
      // Step 1: Get all available data sources
      const response = await (
        window as any
      ).gapi.client.fitness.users.dataSources.list({
        userId: "me",
      });

      const dataSources = response.result.dataSource;
      if (!dataSources || dataSources.length === 0) {
        console.error("No data sources found.");
        setErrors((prev) => [...prev, "No data sources found"]);
        return;
      }

      //  console.log("Available data sources:", dataSources);

      // Step 2: Subscribe to each data source
      for (const dataSource of dataSources) {
        try {
          const dataSourceId = dataSource.dataStreamId;
          console.log({ dataSourceId });
          const listDataSources = async () => {
            try {
              const response = await (
                window as any
              ).gapi.client.fitness.users.dataSources.list({
                userId: "me",
              });
              console.log("Data Sources:", response.result.dataSource);
            } catch (error) {
              console.error("Error listing data sources:", error);
            }
          };
          await listDataSources();

          const getDataset = async () => {
            try {
              const datasetId = `${Date.now() - 7 * 24 * 60 * 60 * 1000}-${Date.now()}`; // 7 days of data
              const response = await (
                window as any
              ).gapi.client.fitness.users.dataSources.datasets.get({
                userId: "me",
                dataSourceId,
                datasetId,
              });
              console.log(
                "Dataset Data:",
                dataSource.dataType.name,
                response.result.point
              );
            } catch (error) {
              console.error("Error fetching dataset:", error);
            }
          };

          await getDataset();
        } catch (subscriptionError) {
          console.error(
            `Failed to subscribe to ${dataSource.dataType.name}:`,
            subscriptionError
          );
          setErrors((prev) => [
            ...prev,
            `Failed to subscribe to ${dataSource.dataType.name}`,
          ]);
        }
      }
    } catch (error) {
      console.error("Error subscribing to updates:", error);
      setErrors((prev) => [...prev, "Failed to subscribe to fitness updates"]);
    }
  };

  // Modified fetchFitnessData to check for recent changes
  const fetchFitnessData = useCallback(
    async (force: boolean = false) => {
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

        const allData: any[] = []; // Array to store all fetched datasets

        // Step 2: Get all available data sources
        const response = await (
          window as any
        ).gapi.client.fitness.users.dataSources.list({
          userId: "me",
        });

        const dataSources = response.result.dataSource || [];
        if (dataSources.length === 0) {
          console.error("No data sources found.");
          setErrors((prev) => [...prev, "No data sources found"]);
          return;
        }

        // Step 3: Fetch dataset from each data source
        for (const dataSource of dataSources) {
          const dataSourceId = dataSource.dataStreamId;
          const dataTypeName = dataSource.dataType.name;
          try {
            const datasetId = `${startTime}-${endTime}`;
            const datasetResponse = await (
              window as any
            ).gapi.client.fitness.users.dataset.aggregate({
              userId: "me",
              aggregateBy: [{ dataTypeName: dataTypeName }],
              bucketByTime: { durationMillis: 86400000 },
              startTimeMillis: startTime,
              endTimeMillis: endTime,
            });

            const datasetData = JSON.parse(datasetResponse.body);
            const objData = {
              data: datasetData,
            };

            const processedData = () => {
              let value = null;
              // Traverse the data structure to extract the numerical value
              objData.data.bucket.forEach((bucket: any) => {
                bucket.dataset.forEach((dataset: any) => {
                  dataset.point.forEach((point: any) => {
                    if (point.value) {
                      point.value.forEach((val: any) => {
                        // Check for numeric values like `fpVal` or `intVal`
                        if (val.fpVal !== undefined) value = val.fpVal;
                        if (val.intVal !== undefined) value = val.intVal;
                      });
                    }
                  });
                });
              });

              return { type: dataTypeName.replace("com.google.", ""), value };
            };

            allData.push(processedData());
          } catch (error) {
            console.error(`Error fetching dataset for ${dataTypeName}:`, error);
            setErrors((prev) => [
              ...prev,
              `Error fetching data for ${dataSourceId}`,
            ]);
          }
        }

        console.log("All Fetched Data:", allData);
        setData(allData);
        setLastUpdateTime(now);
      } catch (error) {
        console.error("Error fetching fitness data:", error);
        setErrors((prev) => [...prev, "Failed to fetch fitness data"]);
      }
    },
    [lastUpdateTime, POLLING_INTERVAL]
  );

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
    await fetchHistoricalData().then((data) => setHistoricalData(data));
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
    data,
    userInfo,
    historicalData,
    handleSignOut,
    initializeGoogleFit,
    handleManualRefresh,
    isAuthenticated,
  };
};

export default useFetchFitnessData;
