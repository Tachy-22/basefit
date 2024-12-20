export type Challenge = {
  id: string;
  name: string;
  description: string;
  type: "Running" | "Cycling" | "Swimming" | "Yoga" | "HIIT" | "Strength";
  status: "active" | "completed" | "upcoming";
  points: number;
  startDate: string;
  endDate: string;
  participants: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

export const challenges: Challenge[] = [
  {
    id: "4",
    name: "Strength Foundation",
    description: "Build core strength and muscle",
    type: "Strength",
    status: "completed",
    points: 800,
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    participants: 312,
    difficulty: "Intermediate",
  },
  {
    id: "5",
    name: "Swim Sprint",
    description: "Improve your swimming speed",
    type: "Swimming",
    status: "upcoming",
    points: 600,
    startDate: "2024-04-10",
    endDate: "2024-05-10",
    participants: 98,
    difficulty: "Advanced",
  },
  {
    id: "1",
    name: "30-Day Running Challenge",
    description: "Run 5km every day for 30 days",
    type: "Running",
    status: "active",
    points: 1000,
    startDate: "2024-03-01",
    endDate: "2024-03-30",
    participants: 234,
    difficulty: "Intermediate",
  },
  {
    id: "2",
    name: "Yoga for Beginners",
    description: "21 days of morning yoga practice",
    type: "Yoga",
    status: "upcoming",
    points: 500,
    startDate: "2024-04-01",
    endDate: "2024-04-21",
    participants: 156,
    difficulty: "Beginner",
  },
  {
    id: "3",
    name: "HIIT Summer Body",
    description: "High-intensity interval training challenge",
    type: "HIIT",
    status: "active",
    points: 750,
    startDate: "2024-03-15",
    endDate: "2024-04-15",
    participants: 189,
    difficulty: "Advanced",
  },
  {
    id: "4",
    name: "Strength Foundation",
    description: "Build core strength and muscle",
    type: "Strength",
    status: "completed",
    points: 800,
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    participants: 312,
    difficulty: "Intermediate",
  },
  {
    id: "5",
    name: "Swim Sprint",
    description: "Improve your swimming speed",
    type: "Swimming",
    status: "upcoming",
    points: 600,
    startDate: "2024-04-10",
    endDate: "2024-05-10",
    participants: 98,
    difficulty: "Advanced",
  },
  {
    id: "4",
    name: "Strength Foundation",
    description: "Build core strength and muscle",
    type: "Strength",
    status: "completed",
    points: 800,
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    participants: 312,
    difficulty: "Intermediate",
  },
  {
    id: "5",
    name: "Swim Sprint",
    description: "Improve your swimming speed",
    type: "Swimming",
    status: "upcoming",
    points: 600,
    startDate: "2024-04-10",
    endDate: "2024-05-10",
    participants: 98,
    difficulty: "Advanced",
  },
  {
    id: "1",
    name: "30-Day Running Challenge",
    description: "Run 5km every day for 30 days",
    type: "Running",
    status: "active",
    points: 1000,
    startDate: "2024-03-01",
    endDate: "2024-03-30",
    participants: 234,
    difficulty: "Intermediate",
  },
  {
    id: "2",
    name: "Yoga for Beginners",
    description: "21 days of morning yoga practice",
    type: "Yoga",
    status: "upcoming",
    points: 500,
    startDate: "2024-04-01",
    endDate: "2024-04-21",
    participants: 156,
    difficulty: "Beginner",
  },
  {
    id: "3",
    name: "HIIT Summer Body",
    description: "High-intensity interval training challenge",
    type: "HIIT",
    status: "active",
    points: 750,
    startDate: "2024-03-15",
    endDate: "2024-04-15",
    participants: 189,
    difficulty: "Advanced",
  },
  {
    id: "4",
    name: "Strength Foundation",
    description: "Build core strength and muscle",
    type: "Strength",
    status: "completed",
    points: 800,
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    participants: 312,
    difficulty: "Intermediate",
  },
  {
    id: "5",
    name: "Swim Sprint",
    description: "Improve your swimming speed",
    type: "Swimming",
    status: "upcoming",
    points: 600,
    startDate: "2024-04-10",
    endDate: "2024-05-10",
    participants: 98,
    difficulty: "Advanced",
  },
];

export const columns = [
  { name: "CHALLENGE", uid: "name" },
  { name: "TYPE", uid: "type" },
  { name: "POINTS", uid: "points" },
  { name: "START DATE", uid: "startDate" },
  { name: "DIFFICULTY", uid: "difficulty" },
  { name: "PARTICIPANTS", uid: "participants" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Completed", uid: "completed" },
  { name: "Upcoming", uid: "upcoming" },
];

export const typeOptions = [
  { name: "Running", uid: "Running" },
  { name: "Cycling", uid: "Cycling" },
  { name: "Swimming", uid: "Swimming" },
  { name: "Yoga", uid: "Yoga" },
  { name: "HIIT", uid: "HIIT" },
  { name: "Strength", uid: "Strength" },
];
