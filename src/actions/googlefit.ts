'use server'

export async function fetchFitnessData(startTime: number, endTime: number) {
  try {
    // Fetch steps data
    const stepsResponse = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        aggregateBy: [{
          dataTypeName: 'com.google.step_count.delta'
        }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime
      })
    });

    // Fetch heart rate data
    const heartRateResponse = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        aggregateBy: [{
          dataTypeName: 'com.google.heart_rate.bpm'
        }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime
      })
    });

    // Fetch weight data
    const weightResponse = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        aggregateBy: [{
          dataTypeName: 'com.google.weight'
        }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime,
        endTimeMillis: endTime
      })
    });

    const [stepsData, heartRateData, weightData] = await Promise.all([
      stepsResponse.json(),
      heartRateResponse.json(),
      weightResponse.json()
    ]);

    return {
      steps: stepsData.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal || 0,
      heartRate: heartRateData.bucket[0]?.dataset[0]?.point[0]?.value[0]?.fpVal || 0,
      weight: weightData.bucket[0]?.dataset[0]?.point[0]?.value[0]?.fpVal || 0,
    };
  } catch (error) {
    console.error('Error fetching fitness data:', error);
    throw error;
  }
}

export async function initializeGoogleFit() {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
        grant_type: 'refresh_token',
      }),
    });

    const data = await response.json();

    if (data.access_token) {
      process.env.GOOGLE_ACCESS_TOKEN = data.access_token;
      return { isAuthenticated: true };
    }

    return { isAuthenticated: false };
  } catch (error) {
    console.error('Error initializing Google Fit:', error);
    return { isAuthenticated: false };
  }
}
