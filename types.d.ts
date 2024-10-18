type TUserProfile = {
  id: string; // Unique identifier for the user (e.g., UUID or Firestore ID)
  walletAddress: string; // User's connected wallet address
  name?: string; // Optional name of the user
  email?: string; // Optional email address
  profileImage?: string; // URL of the user's profile image
  tokenBalance: number; // Current token balance of the user
  fitnessTrackerConnected: boolean; // Status of fitness tracker connection
  createdAt: Date; // Timestamp of when the user registered
  updatedAt: Date; // Timestamp of the last profile update
};

type TChallenge = {
  id: string; // Unique identifier for the challenge
  name: string; // Name of the challenge (e.g., "10k Steps Challenge")
  description: string; // Description of the challenge
  type: "steps" | "distance" | "calories"; // Type of challenge
  startDate: Date; // Start date of the challenge
  endDate: Date; // End date of the challenge
  participants: string[]; // Array of user IDs who joined the challenge
  status: "active" | "completed" | "upcoming"; // Status of the challenge
  reward: number; // Number of tokens awarded for completing the challenge
  createdAt: Date; // Timestamp of when the challenge was created
};

type TReward = {
  id: string; // Unique identifier for the reward
  name: string; // Name of the reward (e.g., "Gym Membership")
  description: string; // Description of the reward
  tokenCost: number; // Number of tokens required to redeem the reward
  imageUrl: string; // URL of the reward's image
  available: boolean; // Whether the reward is currently available
  createdAt: Date; // Timestamp of when the reward was added
};

type TCharityEvent = {
  id: string; // Unique identifier for the charity event
  name: string; // Name of the charity event
  description: string; // Details about the charity and its purpose
  goalAmount: number; // Target amount to be raised (in tokens)
  raisedAmount: number; // Current amount raised (in tokens)
  participants: string[]; // Array of user IDs who participated in the event
  startDate: Date; // Start date of the charity event
  endDate: Date; // End date of the charity event
  status: "active" | "completed"; // Status of the charity event
  createdAt: Date; // Timestamp of when the event was created
};

type TTransaction = {
  id: string; // Unique identifier for the transaction
  userId: string; // ID of the user who made the transaction
  type: "redeem" | "donate"; // Type of transaction
  amount: number; // Amount of tokens involved in the transaction
  rewardId?: string; // Optional reward ID if the transaction is a redemption
  charityEventId?: string; // Optional charity event ID if it's a donation
  timestamp: Date; // Timestamp of when the transaction occurred
};

type TFitnessTrackerData = {
  id: string; // Unique identifier for the data entry
  userId: string; // ID of the user who owns the fitness tracker
  date: Date; // Date of the data entry
  steps?: number; // Number of steps taken on this date (optional)
  distance?: number; // Distance covered in meters (optional)
  caloriesBurned?: number; // Calories burned on this date (optional)
  createdAt: Date; // Timestamp of when the data was recorded
};

type TWalletData = {
  address: string;
  balance: number;
  chainId: string;
  connected: boolean;
};
