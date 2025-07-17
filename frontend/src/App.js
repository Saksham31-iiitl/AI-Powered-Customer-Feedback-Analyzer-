import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/feedbacks");
      const data = await res.json();
      setAllFeedbacks(data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  return (
    <div className="App">
      <h1>🧠 Customer Feedback Analyzer</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="6"
          cols="50"
          value={text}
          placeholder="Enter customer feedback..."
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <button type="submit">Analyze</button>
      </form>

      {result && (
        <div className="result">
          <h2>Result:</h2>
          <p>
            <strong>Feedback:</strong> {result.text}
          </p>
          <p>
            <strong>Sentiment:</strong> {result.sentiment}
          </p>
        </div>
      )}

      <hr style={{ margin: "40px 0" }} />

      <button onClick={fetchFeedbacks}>📄 View All Feedbacks</button>

      {allFeedbacks.length > 0 && (
        <table style={{ margin: "20px auto", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Text</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {allFeedbacks.map((fb) => (
              <tr key={fb.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{fb.id}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{fb.text}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{fb.sentiment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
