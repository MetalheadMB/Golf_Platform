"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawResult, setDrawResult] = useState<any>(null);

  const router = useRouter();

  const getScores = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/scores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message === "Subscription required") {
          router.push("/subscribe");
          return;
        }
        throw new Error(data.message || "Error fetching scores");
      }

      setScores(data);
    } catch (err: any) {
      // check here in case the error object itself contains the message
      if (err.message === "Subscription required") {
        router.push("/subscribe");
      } else {
        alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      getScores();
    }
  }, [router, getScores]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const runDraw = async () => {
    const res = await fetch("http://localhost:5000/draw/run", {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) {
      alert("Error running draw");
      return;
    }
    setDrawResult(data);
  };

  const addScore = async () => {
    if (!score || !date) {
      alert("Please fill all fields");
      return;
    }
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/scores/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ score: Number(score), date }),
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message || "Error adding score");
      return;
    }
    setScore("");
    setDate("");
    getScores();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        {/* HEADER */}
        <Navbar />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        {/* INPUT CARD */}
        <div className="bg-gray-50 p-4 rounded-xl mb-6 shadow-sm">
          <h2 className="text-lg font-medium mb-3 text-gray-700">Add New Score</h2>
          <input
            className="border p-2 mb-3 w-full rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Enter score (1-45)"
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
          <input
            className="border p-2 mb-3 w-full rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="flex gap-2">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full transition" onClick={addScore}>
              Add Score
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full transition" onClick={getScores}>
              Load Scores
            </button>
          </div>
        </div>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg w-full font-bold transition shadow-md"
          onClick={runDraw}
        >
          Run Monthly Draw 🎲
        </button>

        {/* DRAW RESULTS SECTION  */}
        {drawResult && (
          <div className="mt-6 bg-purple-50 p-4 rounded-xl border border-purple-200 animate-in fade-in duration-500">
            <h2 className="text-lg font-bold mb-3 text-purple-800">Draw Results</h2>
            <div className="flex gap-2 mb-4 flex-wrap">
              {drawResult.drawNumbers.map((num: number) => (
                <div key={num} className="bg-purple-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-sm">
                  {num}
                </div>
              ))}
            </div>
            <div className="text-gray-700 space-y-1">
              <p className="font-semibold">Winners:</p>
              <p className="text-sm">🎯 5 Matches: {drawResult.winnersByTier[5]?.length || 0}</p>
              <p className="text-sm">🎯 4 Matches: {drawResult.winnersByTier[4]?.length || 0}</p>
              <p className="text-sm">🎯 3 Matches: {drawResult.winnersByTier[3]?.length || 0}</p>
            </div>
          </div>
        )}

        <hr className="my-6 border-gray-100" />

        {/* SCORES LIST */}
        <div>
          <h2 className="text-lg font-medium mb-3 text-gray-700">Your Scores</h2>
          {loading && <p className="text-center text-gray-500 mb-4 animate-pulse">Loading...</p>}
          {!loading && scores.length === 0 && <p className="text-gray-400 text-center italic">No scores yet</p>}
          <div className="space-y-3">
            {scores.map((s) => (
              <div key={s.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
                <div>
                  <p className="font-bold text-lg text-blue-600">{s.score}</p>
                  <p className="text-sm text-gray-500">{s.date}</p>
                </div>
                <div className="text-green-500 font-bold">✔</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}