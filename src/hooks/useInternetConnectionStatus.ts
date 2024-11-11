"use client";
import { useEffect, useState } from "react";
import { testNetworkConnection } from "src/actions/networkTest";

const useInternetConnectionStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkInternetConnection = async () => {
      try {
        setIsLoading(true);
        const isInternetConnection = await testNetworkConnection();
        setConnectionStatus(isInternetConnection);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to test network connection:", error);
        setConnectionStatus(null); // Or handle error state as needed
      } finally {
        setIsLoading(false);
      }
    };

    checkInternetConnection();
  }, []);

  return { connectionStatus, isLoading };
};

export default useInternetConnectionStatus;
