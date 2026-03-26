"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">

      <h1 className="font-bold text-lg">Golf Platform</h1>

      <div className="flex items-center gap-6">

        <Link href="/charities" className="text-gray-600 hover:text-black">
          Charities
        </Link>

        <Link href="/admin" className="text-gray-600 hover:text-black">
         Admin
        </Link>

        <Link href="/login" className="text-gray-600 hover:text-black">
          Login
        </Link>
        
        <Link
          href="/signup"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Signup
        </Link>

      </div>
    </div>
  );
}