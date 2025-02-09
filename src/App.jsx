import { useState } from "react";

const SERVER_URL = "http://localhost:5000"; // Toggle to production if needed

export default function ServoControl() {
  const [loading, setLoading] = useState(false);

  const makeDance = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/make_it_dance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Response:", data);
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
        backgroundColor: "#FFFB96",
        borderRadius: "15px",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
        maxWidth: "400px",
        margin: "auto",
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          color: "#FF4500",
          textShadow: "2px 2px #FFD700",
        }}
      >
        🤖 Nate's Dancing Robot 🤖
      </h1>
      <p
        style={{
          fontSize: "18px",
          color: "#008000",
          fontWeight: "bold",
        }}
      >
        Press the button and watch it DAAAAAANCE! 💃🎶
      </p>
      <button
        onClick={makeDance}
        disabled={loading}
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          padding: "12px 24px",
          backgroundColor: loading ? "#999" : "#32CD32",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s ease-in-out",
          boxShadow: "3px 3px 0px #000",
          transform: loading ? "scale(0.95)" : "scale(1)",
        }}
      >
        {loading ? "🎵 DANCING... 🎵" : "💃 MAKE IT DANCE! 💃"}
      </button>
    </div>
  );
}
