import { useState, useEffect } from "react";

const SERVER_URL = "https://robot-production-df33.up.railway.app";
// const SERVER_URL = "http://192.168.0.27:5000";

export default function ServoControl() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(""); // Track user input
  const [queue, setQueue] = useState([]); // Track full dance queue
  const [currentDancer, setCurrentDancer] = useState(null); // Track who's dancing

  // Function to fetch queue status
  const fetchQueueStatus = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/queue_status`);
      const data = await response.json();
      setQueue(data.queue || []);
      setCurrentDancer(data.current_dancer || null);
    } catch (error) {
      console.error("Error fetching queue status:", error);
    }
  };

  // Fetch queue every 3 seconds
  useEffect(() => {
    fetchQueueStatus(); // Fetch on load
    const interval = setInterval(fetchQueueStatus, 3000); // Auto-refresh every 3s
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const makeDance = async () => {
    if (!name.trim()) {
      alert("Please enter a name before dancing!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/make_it_dance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }), // ✅ Send name parameter
      });

      const data = await response.json();
      console.log("Response:", data);
      fetchQueueStatus(); // Refresh queue after request
    } catch (error) {
      console.error("Error sending command", error);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#0d0d0d",
        borderRadius: "15px",
        boxShadow: "0px 0px 15px #00ffff",
        maxWidth: "450px",
        margin: "auto",
        fontFamily: "'Orbitron', sans-serif",
        border: "2px solid #00ffff",
      }}
    >
      <h1
        style={{
          fontSize: "26px",
          color: "#ff00ff",
          textShadow: "0px 0px 10px #ff00ff",
        }}
      >
        🤖 CYBER DANCE BOT 🤖
      </h1>
      <p
        style={{
          fontSize: "18px",
          color: "#00ffcc",
          fontWeight: "bold",
          textShadow: "0px 0px 10px #00ffcc",
        }}
      >
        Enter your name and make the robot groove! 🕶️🎶
      </p>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          fontSize: "16px",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "2px solid #00ffff",
          backgroundColor: "#111",
          color: "#00ffff",
          textAlign: "center",
          outline: "none",
        }}
      />

      <br />

      <button
        onClick={makeDance}
        disabled={loading}
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          padding: "12px 24px",
          background: loading
            ? "linear-gradient(45deg, #ff00ff, #6600cc)"
            : "linear-gradient(45deg, #00ffff, #0066ff)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.3s ease-in-out",
          boxShadow: "0px 0px 12px #00ffff",
          transform: loading ? "scale(0.95)" : "scale(1.05)",
          textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
        }}
      >
        {loading ? "⚡ DANCING... ⚡" : "🚀 INITIATE DANCE MODE 🚀"}
      </button>

      <p style={{ fontSize: "16px", color: "#ffcc00", marginTop: "15px" }}>
        <strong>Now Dancing:</strong> {currentDancer || "Nobody"}
      </p>

      <p style={{ fontSize: "16px", color: "#ffcc00", marginTop: "15px" }}>
        <strong>Queue:</strong>{" "}
        {queue.length > 0 ? queue.join(", ") : "No one in queue"}
      </p>
    </div>
  );
}
