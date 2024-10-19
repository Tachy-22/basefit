"use client";

import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";

interface Challenge {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  reward: number;
  image: string;
  status: "completed" | "joined" | "ongoing";
}

const Challenges: FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    // Fetch challenges (using dummy data)
    const fetchChallenges = () => {
      const dummyChallenges: Challenge[] = [
        {
          id: 1,
          name: "Step Challenge",
          description: "Walk 10,000 steps a day for 7 days.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          reward: 100,
          image: "/sport3.jpg",
          status: "ongoing",
        },
        {
          id: 2,
          name: "Cycling Challenge",
          description: "Cycle 50km in a week.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          reward: 150,
          image: "/sport1.jpg",
          status: "joined",
        },
        {
          id: 3,
          name: "Yoga Challenge",
          description: "Complete 30 minutes of yoga daily for 30 days.",
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          endDate: new Date(),
          reward: 200,
          image: "/sport4.jpg",
          status: "completed",
        },
        {
          id: 4,
          name: "Running Challenge",
          description: "Run 5km three times a week for a month.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          reward: 250,
          image: "/sport2.jpg",
          status: "ongoing",
        },
        {
          id: 5,
          name: "Strength Training",
          description: "Complete 12 strength training sessions in a month.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          reward: 180,
          image: "/sport4.jpg",
          status: "ongoing",
        },
        {
          id: 6,
          name: "Meditation Marathon",
          description: "Meditate for 10 minutes daily for 21 days.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
          reward: 120,
          image: "/sport2.jpg",
          status: "joined",
        },
        {
          id: 7,
          name: "Swim Challenge",
          description: "Swim 1km twice a week for a month.",
          startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          reward: 200,
          image: "/sport1.jpg",
          status: "joined",
        },
        {
          id: 8,
          name: "Healthy Eating",
          description:
            "Eat 5 servings of fruits and vegetables daily for 2 weeks.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          reward: 100,
          image: "/sport3.jpg",
          status: "ongoing",
        },
        {
          id: 9,
          name: "Plank Challenge",
          description: "Hold a plank for 2 minutes daily for 30 days.",
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          endDate: new Date(),
          reward: 150,
          image: "/sport2.jpg",
          status: "completed",
        },
        {
          id: 10,
          name: "Stair Climbing",
          description: "Climb 50 floors a week for a month.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          reward: 180,
          image: "/sport4.jpg",
          status: "ongoing",
        },
        {
          id: 11,
          name: "Flexibility Focus",
          description: "Stretch for 15 minutes daily for 3 weeks.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
          reward: 130,
          image: "/sport1.jpg",
          status: "ongoing",
        },
        {
          id: 12,
          name: "HIIT Challenge",
          description: "Complete 12 HIIT workouts in a month.",
          startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          reward: 220,
          image: "/sport3.jpg",
          status: "joined",
        },
        {
          id: 13,
          name: "Hydration Challenge",
          description: "Drink 8 glasses of water daily for 2 weeks.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          reward: 90,
          image: "/sport2.jpg",
          status: "ongoing",
        },
        {
          id: 14,
          name: "Push-up Challenge",
          description: "Do 100 push-ups a day for a week.",
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          endDate: new Date(),
          reward: 170,
          image: "/sport4.jpg",
          status: "completed",
        },
        {
          id: 15,
          name: "Dance Fitness",
          description: "Complete 10 dance workout sessions in a month.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          reward: 160,
          image: "/sport1.jpg",
          status: "ongoing",
        },
        {
          id: 16,
          name: "Mindful Eating",
          description: "Practice mindful eating for every meal for 2 weeks.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          reward: 110,
          image: "/sport3.jpg",
          status: "ongoing",
        },
        {
          id: 17,
          name: "Burpee Challenge",
          description: "Do 50 burpees a day for 10 days.",
          startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          reward: 190,
          image: "/sport2.jpg",
          status: "joined",
        },
        {
          id: 18,
          name: "Early Bird Workout",
          description: "Complete a morning workout before 7 AM for 21 days.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
          reward: 210,
          image: "/sport4.jpg",
          status: "ongoing",
        },
      ];
      setChallenges(dummyChallenges);
    };

    fetchChallenges();
  }, []);

  return (
    <div className="w-full mx-auto px-4 py-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6  max-w-7xl mx-auto">
        Fitness Challenges
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {challenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-500"
          >
            <div className="relative h-48 mb-4 overflow-hidden rounded-md">
              <img
                src={challenge.image}
                alt={challenge.name}
                className="object-cover w-full h-full bg-gray-400"
              />
              <div
                className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold
                ${
                  challenge.status === "completed"
                    ? "bg-green-500"
                    : challenge.status === "joined"
                      ? "bg-blue-500"
                      : "bg-[#0097A7]"
                }`}
              >
                {challenge.status}
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">{challenge.name}</h2>
            <p className="text-gray-400 mb-4">{challenge.description}</p>
            <p className="text-sm text-gray-400">
              Start: {challenge.startDate.toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-400">
              End: {challenge.endDate.toLocaleDateString()}
            </p>
            <p className="text-lg font-bold mt-2 text-[#FFC67D]">
              Reward: {challenge.reward} points
            </p>
            {challenge.status === "ongoing" && (
              <Button className="mt-4 bg-[#0097A7] text-white">
                Join Challenge
              </Button>
            )}
            {challenge.status === "joined" && (
              <Button className="mt-4 bg-gray-600 text-white" disabled>
                In Progress
              </Button>
            )}
            {challenge.status === "completed" && (
              <Button className="mt-4 bg-green-600 text-white" disabled>
                Completed
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
