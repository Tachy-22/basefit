"use client";
import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { FaUser, FaEnvelope, FaWallet, FaTwitter, FaEthereum } from "react-icons/fa";
import { db } from "src/lib/firebase";
import { useAccount } from "wagmi";
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";

const WaitlistForm = () => {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    twitter: "",
    wallet: "",
    basename: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    twitter: "",
    wallet: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOnWaitlist, setIsOnWaitlist] = useState(false);

  useEffect(() => {
    const checkWaitlist = async () => {
      if (address) {
        setFormData(prev => ({
          ...prev,
          wallet: address
        }));
        
        try {
          const waitlistRef = collection(db, "Waitlist");
          const q = query(waitlistRef, where("Wallet", "==", address));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            setIsOnWaitlist(true);
            setMessage("You are already on the waitlist! 🎉");
          }
        } catch (error) {
          console.error("Error checking waitlist:", error);
        }
      }
    };

    checkWaitlist();
  }, [address]);

  const validateField = (name: string, value: string) => {
    switch(name) {
      case 'name':
        if (!value.trim()) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        if (value.length > 50) return "Name must be less than 50 characters";
        return "";
      case 'email':
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return "";
      case 'twitter':
        if (!value.trim()) return "Twitter handle is required";
        if (!value.startsWith('@')) return "Twitter handle must start with @";
        if (value.length < 2) return "Twitter handle must be at least 2 characters";
        if (value.length > 15) return "Twitter handle must be less than 15 characters";
        if (!/^@[A-Za-z0-9_]+$/.test(value)) return "Twitter handle can only contain letters, numbers and underscores";
        return "";
      case 'wallet':
        if (!value.trim()) return "Wallet address is required";
        const walletRegex = /^0x[a-fA-F0-9]{40}$/;
        if (!walletRegex.test(value)) return "Please enter a valid Ethereum wallet address";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      twitter: validateField('twitter', formData.twitter),
      wallet: validateField('wallet', formData.wallet),
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const waitlistSnapshot = await getDocs(collection(db, "Waitlist"));
      const waitlistCount = waitlistSnapshot.size;
      const userId = waitlistCount + 1;
      
      await addDoc(collection(db, "Waitlist"), {
        id: userId,
        Name: formData.name,
        Email: formData.email,
        Wallet: formData.wallet,
        Twitter: formData.twitter,
        Basename: formData.basename,
        DateJoined: new Date(),
      });
      setMessage("🎉 Successfully joined the waitlist!");
      setFormData({
        name: "",
        email: "",
        wallet: "",
        twitter: "",
        basename: "",
      });
      setIsOnWaitlist(true);
    } catch (e) {
      console.error("Error adding document: ", e);
      setMessage("❌ Error: Could not submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-center text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-800/30 backdrop-blur-sm border-gray-700/50">
          <CardHeader className="text-center pb-0">
            <div className="w-full">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
                Transform Your Fitness Journey
              </h2>
              <p className="mt-6 text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                Join an exclusive community where Web3 meets wellness. Be among the first to experience 
                fitness rewards powered by blockchain technology.
              </p>
            </div>
          </CardHeader>

          <CardBody>
            {isOnWaitlist ? (
              <div className="bg-green-500/10 text-green-200 border border-green-500/20 p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-4">You're Already On The Waitlist! 🎉</h3>
                <p>Thank you for your interest. We'll contact you soon with updates.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  type="text"
                  name="name"
                  variant="bordered"
                  label="Full Name"
                  labelPlacement="outside"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  startContent={<FaUser className="text-gray-400" />}
                  color={errors.name ? "danger" : "default"}
                  errorMessage={errors.name}
                  required
                />

                <Input
                  type="email"
                  name="email"
                  variant="bordered"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="johndoe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  startContent={<FaEnvelope className="text-gray-400" />}
                  color={errors.email ? "danger" : "default"}
                  errorMessage={errors.email}
                  required
                />

                <Input
                  type="text"
                  name="wallet"
                  variant="bordered"
                  label="Wallet Address"
                  labelPlacement="outside"
                  placeholder="0x..."
                  value={formData.wallet}
                  onChange={handleChange}
                  startContent={<FaWallet className="text-gray-400" />}
                  color={errors.wallet ? "danger" : "default"}
                  errorMessage={errors.wallet}
                  isDisabled={!!address}
                  required
                />

                <Input
                  type="text"
                  name="basename"
                  variant="bordered"
                  label="Base Name"
                  labelPlacement="outside"
                  placeholder="Your Base name (Optional)"
                  value={formData.basename}
                  onChange={handleChange}
                  startContent={<FaEthereum className="text-gray-400" />}
                />

                <Input
                  type="text"
                  name="twitter"
                  variant="bordered"
                  label="Twitter Handle"
                  labelPlacement="outside"
                  placeholder="@username"
                  value={formData.twitter}
                  onChange={handleChange}
                  startContent={<FaTwitter className="text-gray-400" />}
                  color={errors.twitter ? "danger" : "default"}
                  errorMessage={errors.twitter}
                  required
                />

                <Button
                  type="submit"
                  color={Object.values(errors).some(error => error !== "") ? "danger" : "primary"}
                  variant="shadow"
                  className="w-full"
                  isLoading={loading}
                >
                  {loading ? "Processing..." : "Join Early Access"}
                </Button>
              </form>
            )}

            {message && !isOnWaitlist && (
              <div className={`mt-6 p-4 rounded-xl text-center ${
                message.includes("Error") ? "bg-red-500/10 text-red-200 border border-red-500/20" : "bg-green-500/10 text-green-200 border border-green-500/20"
              }`}>
                {message}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default WaitlistForm;
