"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function CharitiesPage() {
  const [charities, setCharities] = useState<any[]>([]);

  const fetchCharities = async () => {
    const res = await fetch("http://localhost:5000/charities");
    const data = await res.json();
    setCharities(data);
  };
  const selectCharity = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const res = await fetch("http://localhost:5000/charities/select", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ charity_id: id }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Error selecting charity");
      return;
    }

    alert("Charity selected successfully ✅");

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

  useEffect(() => {
    fetchCharities();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-8">
          Support a Charity ❤️
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          {charities.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
            >
              <img
                src={c.image_url}
                alt={c.name}
                className="rounded-xl mb-3 h-40 w-full object-cover"
              />

              <h2 className="font-semibold text-lg">{c.name}</h2>

              <p className="text-sm text-gray-600 mb-4">
                {c.description}
              </p>

            <button
            onClick={() => selectCharity(c.id)}
            className="bg-purple-500 text-white px-4 py-2 w-full rounded-lg hover:bg-purple-600"
            >
            Select Charity
            </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}