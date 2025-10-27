import React, { useState, useEffect } from "react";
import { FileUploader } from "./components/FileUploader";
import { ResultsView } from "./components/ResultsView";
import { ResultType } from "./types";
import './index.css';

function App() {
  const [sessionId, setSessionId] = useState<string>("");
  const [results, setResults] = useState<ResultType[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        if (!res.ok) throw new Error("Failed to reach IP service");
        const data = await res.json();

        if (!data.ip) throw new Error("No IP found in response");
        setSessionId(data.ip);
      } catch (err) {
        console.error("Failed to get IP:", err);
        setError("Unable to detect your IP address. Please check your connection or disable VPN.");
      }
    };

    fetchIp();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center">
        <div className="max-w-md bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Connection Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600">
        <p>Detecting your IP address...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          Job Match AI
        </h1>
        <p className="text-gray-600">
          Upload candidate resumes and get detailed AI analysis
        </p>
      </div>

      <FileUploader onResults={setResults} sessionId={sessionId} />
      <ResultsView results={results} />
    </div>
  );
}

export default App;
