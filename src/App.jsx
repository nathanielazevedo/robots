import { useState, useEffect } from "react";

const SERVER_URL = "https://robot-production-df33.up.railway.app"; // Change this to your actual server URL

export default function ServoControl() {
  const [angle, setAngle] = useState(90);
  const [currentAngle, setCurrentAngle] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch current servo angle on load
    const fetchAngle = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/command`);
        const data = await response.json();
        setCurrentAngle(data.angle);
      } catch (error) {
        console.error("Failed to fetch current angle", error);
      }
    };
    fetchAngle();
  }, []);

  const handleSetAngle = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/set_command`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ angle }),
      });
      const data = await response.json();
      console.log("Response:", data);
      setCurrentAngle(angle);
    } catch (error) {
      console.error("Error sending command", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Nates robot hand</h1>
      <p>
        Current Angle:{" "}
        {currentAngle !== null ? `${currentAngle}°` : "Loading..."}
      </p>
      <input
        type="number"
        value={angle}
        min="0"
        max="180"
        onChange={(e) => setAngle(Number(e.target.value))}
      />
      <button onClick={handleSetAngle} disabled={loading}>
        {loading ? "Setting..." : "Set Angle"}
      </button>
    </div>
  );
}
