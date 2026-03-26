"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";



export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">

      <Navbar />

      {/* HERO SECTION */}
      <div className="text-center py-20 px-6">

        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Play Golf. Win Rewards. Change Lives.
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 max-w-xl mx-auto mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Enter your golf scores, participate in monthly draws, and
          support meaningful charities — all in one platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <Link
            href="/signup"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-purple-700"
          >
            Get Started 🚀
          </Link>
        </motion.div>

        <p className="text-sm text-gray-500 mt-4">
          Trusted by players • Supporting real charities ❤️
        </p>
      </div>

      {/* 🔹 HOW IT WORKS */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        <h2 className="text-2xl font-semibold text-center mb-8">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <motion.div
            className="bg-white p-6 rounded-xl shadow text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-bold mb-2">1. Enter Scores</h3>
            <p className="text-gray-600 text-sm">
              Add your last 5 golf scores in seconds.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-bold mb-2">2. Monthly Draw</h3>
            <p className="text-gray-600 text-sm">
              Your scores become your lucky numbers.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-bold mb-2">3. Win & Give Back</h3>
            <p className="text-gray-600 text-sm">
              Win prizes while supporting charities.
            </p>
          </motion.div>

        </div>
      </div>

      {/* IMPACT SECTION */}
      <div className="bg-white py-16 px-6 text-center">

        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Your Game Creates Impact ❤️
        </motion.h2>

        <p className="text-gray-600 max-w-xl mx-auto">
          A portion of every subscription goes directly to charities.
          Play better, win bigger, and make a real difference.
        </p>

      </div>

      {/* CTA SECTION */}
      <div className="text-center py-16">

        <h2 className="text-2xl font-semibold mb-4">
          Ready to Play?
        </h2>

        <Link
          href="/signup"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Join Now
        </Link>

      </div>

    </div>
  );
}