import { useState } from "react";
import "./App.css";


function App() {
  const API = "http://127.0.0.1:5000";

  const [tweetId, setTweetId] = useState("");
  const [green, setGreen] = useState([]);
  const [red, setRed] = useState([]);
  const [result, setResult] = useState("");

  const fetchComments = async () => {
    if (!tweetId) return alert("Enter Tweet ID!");
    const res = await fetch(`${API}/api/fetch_comments?tweet_id=${tweetId}`);
    const data = await res.json();
    setGreen(data.green || []);
    setRed(data.red || []);
    setResult("");
  };

  const hideRedFlags = async () => {
    const ids = red.map(c => c.id);
    if (ids.length === 0) return;
    const res = await fetch(`${API}/api/hide_red_flags`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    const data = await res.json();
    setRed([]);
    setResult(`Hidden ${data.hidden_count} red flag comments`);
  };

  return (
   <div className="app-wrapper">
  <div className="navbar">
    <h1>Tweet Comment Classifier</h1>
  </div>

  <div className="main-container">
    <div className="input-group">
      <input
        type="text"
        placeholder="Enter Tweet ID (e.g., 1001)"
        value={tweetId}
        onChange={(e) => setTweetId(e.target.value)}
      />
      <button className="btn btn-fetch" onClick={fetchComments}>
        Fetch Comments
      </button>
    </div>

    <div className="comments-container">
      <div className="comment-card green-card">
        <h2>Green Flags ✅</h2>
        <ul>
          {green.map((c) => (
            <li key={c.id}>{c.text}</li>
          ))}
        </ul>
      </div>

      <div className="comment-card red-card">
        <h2>Red Flags 🚩</h2>
        <button className="btn btn-hide" onClick={hideRedFlags}>
          Hide All Red Flags
        </button>
        <ul>
          {red.map((c) => (
            <li key={c.id}>{c.text}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</div>

  );
}

export default App;
