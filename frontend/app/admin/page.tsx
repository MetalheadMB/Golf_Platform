"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [drawResult, setDrawResult] = useState<any>(null);
  const [winners, setWinners] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const router = useRouter();

  // 1. Fetch Analytics
  const fetchAnalytics = useCallback(async () => {
    setLoadingAnalytics(true);
    try {
      const res = await fetch("http://localhost:5000/analytics");
      const data = await res.json();
      if (res.ok) setAnalytics(data);
    } catch (err) {
      console.error("Failed to fetch analytics", err);
    } finally {
      setLoadingAnalytics(false);
    }
  }, []);

  // 2. Fetch Winners
  const fetchWinners = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/winners");
      const data = await res.json();
      if (res.ok) setWinners(data);
    } catch (err) {
      console.error("Failed to fetch winners", err);
    }
  }, []);

  // 3. Initial Load & Auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchAnalytics();
      fetchWinners();
    }
  }, [router, fetchAnalytics, fetchWinners]);

  // 4. Run Monthly Draw
  const runDraw = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/draw/run", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error running draw");
        return;
      }

      setDrawResult(data);
      fetchWinners();   // Refresh winners list
      fetchAnalytics(); // Refresh analytics (total draws/winners will change)
    } catch (err) {
      alert("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  // 5. Update Status
  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("http://localhost:5000/winners/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ winner_id: id, status }),
      });

      if (res.ok) {
        fetchWinners();
        fetchAnalytics(); // Refresh prize total if marked 'paid'
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <button 
            onClick={() => { localStorage.removeItem("token"); router.push("/login"); }}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>

        {/*  ANALYTICS SECTION */}
        <h2 className="text-sm font-bold uppercase text-gray-400 mb-3 tracking-wider">Platform Analytics</h2>
        {loadingAnalytics && <p className="text-xs text-blue-500 mb-4 animate-pulse">Updating stats...</p>}
        
        {analytics && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl shadow-sm">
              <p className="text-xs text-blue-600 font-semibold uppercase">Total Users</p>
              <p className="text-2xl font-bold text-blue-900">{analytics.totalUsers}</p>
            </div>

            <div className="bg-green-50 border border-green-100 p-4 rounded-xl shadow-sm">
              <p className="text-xs text-green-600 font-semibold uppercase">Total Scores</p>
              <p className="text-2xl font-bold text-green-900">{analytics.totalScores}</p>
            </div>

            <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl shadow-sm">
              <p className="text-xs text-purple-600 font-semibold uppercase">Total Draws</p>
              <p className="text-2xl font-bold text-purple-900">{analytics.totalDraws}</p>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl shadow-sm">
              <p className="text-xs text-yellow-600 font-semibold uppercase">Total Winners</p>
              <p className="text-2xl font-bold text-yellow-900">{analytics.totalWinners}</p>
            </div>

            <div className="bg-red-50 border border-red-100 p-4 rounded-xl shadow-sm col-span-2 flex justify-between items-center">
              <p className="text-xs text-red-600 font-semibold uppercase">Total Prize Distributed</p>
              <p className="text-2xl font-bold text-red-900">₹{analytics.totalPrize.toLocaleString()}</p>
            </div>
          </div>
        )}

        <hr className="mb-8 border-gray-100" />

        {/*  ACTIONS */}
        <button
          className={`px-6 py-4 rounded-xl w-full mb-8 font-bold text-white shadow-lg transition-all transform active:scale-95 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
          }`}
          onClick={runDraw}
          disabled={loading}
        >
          {loading ? "Processing Draw..." : "Run Monthly Draw 🎲"}
        </button>

        {/* LATEST DRAW RESULT */}
        {drawResult && (
          <div className="bg-gray-900 text-white p-5 rounded-2xl mb-8 animate-in slide-in-from-top duration-500">
            <h2 className="text-sm font-bold text-gray-400 uppercase mb-3">Latest Result</h2>
            <div className="flex gap-3 mb-4">
              {drawResult.drawNumbers.map((num: number) => (
                <div key={num} className="bg-white text-gray-900 w-10 h-10 flex items-center justify-center rounded-full font-black text-lg">
                  {num}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-gray-800 p-2 rounded-lg">5 Matches: {drawResult.winnersByTier[5]?.length || 0}</div>
              <div className="bg-gray-800 p-2 rounded-lg">4 Matches: {drawResult.winnersByTier[4]?.length || 0}</div>
              <div className="bg-gray-800 p-2 rounded-lg">3 Matches: {drawResult.winnersByTier[3]?.length || 0}</div>
            </div>
          </div>
        )}

        {/* WINNERS MANAGEMENT */}
        <h2 className="text-xl font-bold mb-4 text-gray-800">Winner Management</h2>
        <div className="space-y-4">
          {winners.length === 0 && <p className="text-gray-400 text-center py-10 italic border-2 border-dashed rounded-xl">No winners records found.</p>}
          
          {winners.map((w) => (
            <div key={w.id} className="border border-gray-200 p-4 rounded-xl hover:border-blue-300 transition-colors bg-white">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">User: {w.user_id}</span>
                  <p className="text-lg font-bold">Matches: <span className="text-blue-600">{w.match_count}</span></p>
                </div>
                <div className={`text-[10px] px-2 py-1 rounded font-black uppercase ${
                  w.status === 'paid' ? 'bg-blue-100 text-blue-600' : 
                  w.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {w.status}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button onClick={() => updateStatus(w.id, "approved")} className="bg-green-500 text-white text-xs px-3 py-2 rounded-lg hover:bg-green-600 flex-1">Approve</button>
                <button onClick={() => updateStatus(w.id, "rejected")} className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg hover:bg-red-600 flex-1">Reject</button>
                <button onClick={() => updateStatus(w.id, "paid")} className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-blue-700 flex-1 font-bold">Mark Paid</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}