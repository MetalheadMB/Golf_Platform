"use client";

export default function SubscribePage() {

  const subscribe = async (type: string) => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type }),
    });

    const data = await res.json();

    alert(data.message);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow w-96 text-center">

        <h1 className="text-2xl font-bold mb-4">Choose Plan</h1>

        <button
          className="bg-blue-500 text-white px-4 py-2 mb-3 w-full"
          onClick={() => subscribe("monthly")}
        >
          Monthly Plan
        </button>

        <button
          className="bg-green-500 text-white px-4 py-2 w-full"
          onClick={() => subscribe("yearly")}
        >
          Yearly Plan
        </button>

      </div>

    </div>
  );
}