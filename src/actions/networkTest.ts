"use server";

import fetch from 'node-fetch';

const testNetworkConnection = async () => {
  const testUrl = 'https://httpbin.org/get';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    console.log('Starting network test...');
    const response = await fetch(testUrl, {
      method: 'GET',
  //    signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Network test successful. Response:', data);
    return true;
  } catch (error: any) {
    console.error('Network test failed. Error details:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });

    if (error.name === 'AbortError') {
      console.error('Request timed out after 5 seconds.');
    } else if (error.code === 'ETIMEDOUT' || error.message.includes('ETIMEDOUT')) {
      console.error('Connection timed out. Please check your network connection.');
    }

    return false;
  }
};

export { testNetworkConnection };
