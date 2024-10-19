"use client";
import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import {
  Transaction,
  TransactionButton,
} from "@coinbase/onchainkit/transaction";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { BASE_SEPOLIA_CHAIN_ID } from "../constants";

interface Challenge {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  reward: number;
}

// Add these constants
const challengeContractAddress = "0x..."; // Replace with actual contract address
const challengeABI: never[] = []; // Replace with actual ABI

const Challenges: FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newChallenge, setNewChallenge] = useState<Partial<Challenge>>({});
  const { address } = useAccount();

  useEffect(() => {
    // Fetch challenges from the smart contract
    const fetchChallenges = async () => {
      // Implement the logic to fetch challenges from the smart contract
      // For now, we'll use dummy data
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
          name: "Run for Charity",
          description: "Run 5km a day to raise money for charity.",
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          reward: 200,
        },
      ];
      setChallenges(dummyChallenges);
    };

    fetchChallenges();
  }, []);

  const handleCreateChallenge = () => {
    const createChallengeContract = {
      address: challengeContractAddress,
      abi: challengeABI,
      functionName: "createChallenge",
      args: [
        newChallenge.name,
        newChallenge.description,
        Math.floor(new Date(newChallenge.startDate as Date).getTime() / 1000),
        Math.floor(new Date(newChallenge.endDate as Date).getTime() / 1000),
        newChallenge.reward,
      ],
    };

    return (
      <Transaction
        contracts={[createChallengeContract]}
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onSuccess={() => {
          setIsCreateModalOpen(false);
          // Refresh challenges
        }}
      >
        <TransactionButton className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]" />
      </Transaction>
    );
  };

  const handleJoinChallenge = (challengeId: number) => {
    const joinChallengeContract = {
      address: challengeContractAddress,
      abi: challengeABI,
      functionName: "joinChallenge",
      args: [challengeId],
    };

    return (
      <Transaction
        contracts={[joinChallengeContract]}
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onSuccess={() => {
          // Handle successful join
        }}
      >
        <TransactionButton className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]" />
      </Transaction>
    );
  };

  return (
    <div className="min-h-screen bg-cyan-950 text-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-eastern-blue-500 to-chardonnay-500 text-white py-12 text-center"
      >
        <h1 className="text-4xl font-bold mb-2">Challenges</h1>
        <p className="text-xl">Join a challenge and earn rewards</p>
        <Button onClick={() => setIsCreateModalOpen(true)} className="mt-4">
          Create Challenge
        </Button>
      </motion.div>

      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Active Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-2">{challenge.name}</h3>
              <p>{challenge.description}</p>
              <p>Start: {challenge.startDate.toLocaleDateString()}</p>
              <p>End: {challenge.endDate.toLocaleDateString()}</p>
              <p>Reward: {challenge.reward} tokens</p>
              {handleJoinChallenge(challenge.id)}
            </div>
          ))}
        </div>
      </section>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Create New Challenge</ModalHeader>
          <ModalBody>
            <Input
              label="Name"
              value={newChallenge.name}
              onChange={(e) =>
                setNewChallenge({ ...newChallenge, name: e.target.value })
              }
            />
            <Input
              label="Description"
              value={newChallenge.description}
              onChange={(e) =>
                setNewChallenge({
                  ...newChallenge,
                  description: e.target.value,
                })
              }
            />
            <Input
              label="Start Date"
              type="date"
              value={newChallenge.startDate?.toISOString().split("T")[0]}
              onChange={(e) =>
                setNewChallenge({
                  ...newChallenge,
                  startDate: new Date(e.target.value),
                })
              }
            />
            <Input
              label="End Date"
              type="date"
              value={newChallenge.endDate?.toISOString().split("T")[0]}
              onChange={(e) =>
                setNewChallenge({
                  ...newChallenge,
                  endDate: new Date(e.target.value),
                })
              }
            />
            <Input
              label="Reward"
              type="number"
              value={newChallenge.reward?.toString()}
              onChange={(e) =>
                setNewChallenge({
                  ...newChallenge,
                  reward: parseInt(e.target.value),
                })
              }
            />
          </ModalBody>
          <ModalFooter>{handleCreateChallenge()}</ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Challenges;
