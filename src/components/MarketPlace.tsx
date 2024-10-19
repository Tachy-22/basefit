"use client";
import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaTrash,
  FaHeart,
} from "react-icons/fa";
import Head from "next/head";

interface Item {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Item {
  quantity: number;
}

const Marketplace: FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [totalPoints, setTotalPoints] = useState(1000); // Assuming initial points
  const [addedItems, setAddedItems] = useState<{ [key: number]: number }>({});
  const [showAddedMessage, setShowAddedMessage] = useState<{
    [key: number]: boolean;
  }>({});
  const [favorites, setFavorites] = useState<number[]>([]);

  const items: Item[] = [
    // Running
    {
      id: 1,
      name: "Ultraboost 21",
      price: 500,
      image: "/prod1.jpg",
      category: "Running",
    },
    {
      id: 2,
      name: "Nike Air Zoom Pegasus",
      price: 450,
      image: "/prod2.jpg",
      category: "Running",
    },
    {
      id: 3,
      name: "Garmin Forerunner 245",
      price: 800,
      image: "/prod3.jpg",
      category: "Running",
    },
    {
      id: 4,
      name: "Running Shorts",
      price: 200,
      image: "/prod4.jpg",
      category: "Running",
    },
    {
      id: 5,
      name: "Hydration Pack",
      price: 300,
      image: "/prod1.jpg",
      category: "Running",
    },
    {
      id: 6,
      name: "Compression Socks",
      price: 100,
      image: "/prod2.jpg",
      category: "Running",
    },
    {
      id: 7,
      name: "Reflective Vest",
      price: 150,
      image: "/prod3.jpg",
      category: "Running",
    },

    // Training
    {
      id: 8,
      name: "Weightlifting Gloves",
      price: 200,
      image: "/prod4.jpg",
      category: "Training",
    },
    {
      id: 9,
      name: "Resistance Bands Set",
      price: 250,
      image: "/prod1.jpg",
      category: "Training",
    },
    {
      id: 10,
      name: "Adjustable Dumbbells",
      price: 700,
      image: "/prod2.jpg",
      category: "Training",
    },
    {
      id: 11,
      name: "Kettlebell",
      price: 300,
      image: "/prod3.jpg",
      category: "Training",
    },
    {
      id: 12,
      name: "Pull-up Bar",
      price: 180,
      image: "/prod4.jpg",
      category: "Training",
    },
    {
      id: 13,
      name: "Ab Roller",
      price: 120,
      image: "/prod1.jpg",
      category: "Training",
    },
    {
      id: 14,
      name: "Jump Rope",
      price: 80,
      image: "/prod2.jpg",
      category: "Training",
    },

    // Yoga
    {
      id: 15,
      name: "Yoga Mat",
      price: 300,
      image: "/prod3.jpg",
      category: "Yoga",
    },
    {
      id: 16,
      name: "Yoga Blocks (Set of 2)",
      price: 150,
      image: "/prod4.jpg",
      category: "Yoga",
    },
    {
      id: 17,
      name: "Yoga Strap",
      price: 80,
      image: "/prod1.jpg",
      category: "Yoga",
    },
    {
      id: 18,
      name: "Meditation Cushion",
      price: 200,
      image: "/prod2.jpg",
      category: "Yoga",
    },
    {
      id: 19,
      name: "Yoga Wheel",
      price: 180,
      image: "/prod3.jpg",
      category: "Yoga",
    },
    {
      id: 20,
      name: "Yoga Towel",
      price: 100,
      image: "/prod4.jpg",
      category: "Yoga",
    },
    {
      id: 21,
      name: "Yoga Bag",
      price: 120,
      image: "/prod1.jpg",
      category: "Yoga",
    },

    // Apparel
    {
      id: 22,
      name: "Tiro Track Jacket",
      price: 400,
      image: "/prod2.jpg",
      category: "Apparel",
    },
    {
      id: 23,
      name: "Performance T-Shirt",
      price: 150,
      image: "/prod3.jpg",
      category: "Apparel",
    },
    {
      id: 24,
      name: "Compression Leggings",
      price: 250,
      image: "/prod4.jpg",
      category: "Apparel",
    },
    {
      id: 25,
      name: "Workout Hoodie",
      price: 300,
      image: "/prod1.jpg",
      category: "Apparel",
    },
    {
      id: 26,
      name: "Athletic Socks (3-Pack)",
      price: 100,
      image: "/prod2.jpg",
      category: "Apparel",
    },
    {
      id: 27,
      name: "Sports Bra",
      price: 180,
      image: "/prod3.jpg",
      category: "Apparel",
    },
    {
      id: 28,
      name: "Sweatband Set",
      price: 80,
      image: "/prod4.jpg",
      category: "Apparel",
    },

    // Accessories
    {
      id: 29,
      name: "Gym Bag",
      price: 350,
      image: "/prod1.jpg",
      category: "Accessories",
    },
    {
      id: 30,
      name: "Water Bottle",
      price: 120,
      image: "/prod2.jpg",
      category: "Accessories",
    },
    {
      id: 31,
      name: "Fitness Tracker",
      price: 600,
      image: "/prod3.jpg",
      category: "Accessories",
    },
    {
      id: 32,
      name: "Gym Towel Set",
      price: 100,
      image: "/prod4.jpg",
      category: "Accessories",
    },
    {
      id: 33,
      name: "Lifting Straps",
      price: 80,
      image: "/prod1.jpg",
      category: "Accessories",
    },
    {
      id: 34,
      name: "Gym Lock",
      price: 50,
      image: "/prod2.jpg",
      category: "Accessories",
    },
    {
      id: 35,
      name: "Workout Headphones",
      price: 400,
      image: "/prod3.jpg",
      category: "Accessories",
    },

    // Recovery
    {
      id: 36,
      name: "Foam Roller",
      price: 150,
      image: "/prod4.jpg",
      category: "Recovery",
    },
    {
      id: 37,
      name: "Massage Gun",
      price: 800,
      image: "/prod1.jpg",
      category: "Recovery",
    },
    {
      id: 38,
      name: "Compression Sleeves",
      price: 200,
      image: "/prod2.jpg",
      category: "Recovery",
    },
    {
      id: 39,
      name: "Ice Pack Set",
      price: 120,
      image: "/prod3.jpg",
      category: "Recovery",
    },
    {
      id: 40,
      name: "Muscle Balm",
      price: 80,
      image: "/prod4.jpg",
      category: "Recovery",
    },
    {
      id: 41,
      name: "Stretching Strap",
      price: 100,
      image: "/prod1.jpg",
      category: "Recovery",
    },
    {
      id: 42,
      name: "Recovery Slides",
      price: 180,
      image: "/prod2.jpg",
      category: "Recovery",
    },
  ];

  const addToCart = (item: Item) => {
    if (totalPoints >= item.price) {
      const existingItem = cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        setCartItems(
          cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
      } else {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
      setTotalPoints(totalPoints - item.price);

      // Update added items count
      setAddedItems((prev) => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + 1,
      }));

      // Show "Added to cart" message
      setShowAddedMessage((prev) => ({ ...prev, [item.id]: true }));
      setTimeout(() => {
        setShowAddedMessage((prev) => ({ ...prev, [item.id]: false }));
      }, 500);
    } else {
      alert("Not enough points!");
    }
  };

  const removeFromCart = (item: CartItem) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
    setTotalPoints(totalPoints + item.price * item.quantity);

    // Update added items count
    setAddedItems((prev) => ({ ...prev, [item.id]: 0 }));
  };

  const increaseQuantity = (item: CartItem) => {
    if (totalPoints >= item.price) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      setTotalPoints(totalPoints - item.price);

      // Update added items count
      setAddedItems((prev) => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + 1,
      }));
    } else {
      alert("Not enough points!");
    }
  };

  const decreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
      setTotalPoints(totalPoints + item.price);

      // Update added items count
      setAddedItems((prev) => ({ ...prev, [item.id]: prev[item.id] - 1 }));
    } else {
      removeFromCart(item);
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const toggleFavorite = (itemId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(itemId)
        ? prevFavorites.filter((id) => id !== itemId)
        : [...prevFavorites, itemId]
    );
  };

  useEffect(() => {
    // Load favorites from localStorage on component mount
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    // Save favorites to localStorage whenever it changes
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <Head>
        <title>
          Fitness Marketplace - Redeem Your Points for Exciting Rewards
        </title>
        <meta
          name="description"
          content="Explore our fitness marketplace and redeem your hard-earned points for a wide range of exciting rewards including running gear, training equipment, yoga accessories, and more."
        />
        <meta
          name="keywords"
          content="fitness marketplace, rewards, points redemption, sports equipment, fitness gear"
        />
        <meta
          property="og:title"
          content="Fitness Marketplace - Redeem Your Points for Exciting Rewards"
        />
        <meta
          property="og:description"
          content="Explore our fitness marketplace and redeem your hard-earned points for a wide range of exciting rewards including running gear, training equipment, yoga accessories, and more."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <link rel="canonical" href="https://yourwebsite.com/marketplace" />
      </Head>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Marketplace Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 text-center relative shadow-lg"
        >
          <h1 className="text-5xl font-extrabold mb-4 text-white">
            Marketplace
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Redeem your points for exciting rewards
          </p>
          <div className="bg-gray-700 inline-block px-6 py-3 rounded-lg shadow-md">
            <p className="text-2xl font-bold text-white">
              Your Points: <span className="text-blue-400">{totalPoints}</span>
            </p>
          </div>
          <button
            onClick={toggleCart}
            className="absolute top-6 right-6  bg-gray-700/50 hover:bg-gray-600/50 text-white font-bold py-3 px-6 rounded-lg flex items-center transition duration-300 ease-in-out"
          >
            <FaShoppingCart className="mr-2" size={18} />
            <span className="text-lg">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </button>
        </motion.div>

        {/* Cart Modal */}
        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="bg-gray-800 p-6 rounded-lg w-full max-w-md"
              >
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center mb-4"
                      >
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-400">
                            {item.price} points
                          </p>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() => decreaseQuantity(item)}
                            className="bg-gray-700 hover:bg-gray-600 text-white p-1 rounded-full mr-2"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item)}
                            className="bg-gray-700 hover:bg-gray-600 text-white p-1 rounded-full mr-2"
                          >
                            <FaPlus size={12} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item)}
                            className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 text-right">
                      <p className="font-bold">
                        Total:{" "}
                        {cartItems.reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )}{" "}
                        points
                      </p>
                    </div>
                  </>
                )}
                <button
                  onClick={toggleCart}
                  className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Close Cart
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reward Items */}
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#FFC67D] hidden">
            Available Rewards
          </h2>
          {[
            "Running",
            "Training",
            "Yoga",
            "Apparel",
            "Accessories",
            "Recovery",
          ].map((category) => (
            <div key={category}>
              <h3 className="text-2xl font-bold mt-8 mb-4 text-[#FFC67D]">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="p-4">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full bg-gray-300 h-40 object-cover mb-4 rounded"
                          />
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            className="absolute top-2 right-2 bg-white bg-opacity-75 p-2 rounded-full"
                          >
                            <FaHeart
                              size={20}
                              color={
                                favorites.includes(item.id) ? "red" : "gray"
                              }
                            />
                          </button>
                        </div>
                        <h4 className="text-xl font-semibold mb-2">
                          {item.name}
                        </h4>
                        <p className="text-[#FFC67D] mb-4">
                          {item.price} Points
                        </p>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => addToCart(item)}
                            disabled={totalPoints < item.price}
                            className={`py-2 px-4 rounded font-bold ${
                              totalPoints >= item.price
                                ? "bg-blue-500 hover:bg-blue-600 text-white"
                                : "bg-gray-500 text-gray-300 cursor-not-allowed"
                            }`}
                          >
                            Add to Cart
                          </button>
                          {addedItems[item.id] > 0 && (
                            <span className="text-green-500 font-bold">
                              Added: {addedItems[item.id]}
                            </span>
                          )}
                        </div>
                        <div className="h-6 relative overflow-hidden">
                          <AnimatePresence>
                            {showAddedMessage[item.id] && (
                              <motion.p
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                className="text-green-500 absolute w-full text-center"
                              >
                                Added to cart
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default Marketplace;
