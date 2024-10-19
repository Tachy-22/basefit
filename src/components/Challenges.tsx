"use client";

import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

interface Challenge {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  reward: number;
}

const Challenges: FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newChallenge, setNewChallenge] = useState<Partial<Challenge>>({});

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
        },
        {
          id: 2,
          name: "Cycling Challenge",
          description: "Cycle 50km in a week.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          reward: 150,
        },
      ];
      setChallenges(dummyChallenges);
    };

    fetchChallenges();
  }, []);

  const handleCreateChallenge = () => {
    // Dummy function to create a new challenge
    const newId = challenges.length + 1;
    const createdChallenge: Challenge = {
      ...newChallenge as Challenge,
      id: newId,
    };
    setChallenges([...challenges, createdChallenge]);
    setIsCreateModalOpen(false);
    setNewChallenge({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fitness Challenges</h1>
      <Button onClick={() => setIsCreateModalOpen(true)} className="mb-4">
        Create New Challenge
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-2">{challenge.name}</h2>
            <p className="text-gray-600 mb-4">{challenge.description}</p>
            <p className="text-sm text-gray-500">
              Start: {challenge.startDate.toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              End: {challenge.endDate.toLocaleDateString()}
            </p>
            <p className="text-lg font-bold mt-2">Reward: {challenge.reward} tokens</p>
            <Button className="mt-4">Join Challenge</Button>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Create New Challenge</ModalHeader>
          <ModalBody>
            <Input
              label="Name"
              value={newChallenge.name || ""}
              onChange={(e) => setNewChallenge({ ...newChallenge, name: e.target.value })}
            />
            <Input
              label="Description"
              value={newChallenge.description || ""}
              onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
            />
            <Input
              label="Start Date"
              type="date"
              value={newChallenge.startDate?.toISOString().split('T')[0] || ""}
              onChange={(e) => setNewChallenge({ ...newChallenge, startDate: new Date(e.target.value) })}
            />
            <Input
              label="End Date"
              type="date"
              value={newChallenge.endDate?.toISOString().split('T')[0] || ""}
              onChange={(e) => setNewChallenge({ ...newChallenge, endDate: new Date(e.target.value) })}
            />
            <Input
              label="Reward"
              type="number"
              value={newChallenge.reward?.toString() || ""}
              onChange={(e) => setNewChallenge({ ...newChallenge, reward: parseInt(e.target.value) })}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleCreateChallenge}>
              Create Challenge
            </Button>
            <Button onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Challenges;


