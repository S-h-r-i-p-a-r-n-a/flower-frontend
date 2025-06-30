'use client'
import { useState } from "react";

export default function Home() {
  const [features, setFeatures] = useState(["", "", "", ""]);
  const [result, setResult] = useState("");

  const handleChange = (i, val) => {
    const copy = [...features];
    copy[i] = val;
    setFeatures(copy);
  };

  const predict = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(features.map(Number))
      });

      const data = await res.json();
      const labels = ["Setosa", "Versicolor", "Virginica"];
      setResult(`Prediction: ${labels[data.prediction]}`);
    } catch (err) {
      setResult("❌ Failed to get prediction.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        🌺 Flower Classifier
      </h1>

      <div className="space-y-4 w-full max-w-xs">
        {features.map((f, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Feature ${i + 1}`}
            value={f}
            onChange={(e) => handleChange(i, e.target.value)}
            className="bg-white text-black placeholder-gray-500 rounded p-3 border border-gray-400 w-full"
          />
        ))}

        <button
          onClick={predict}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Predict
        </button>

        <div className="text-lg text-center text-green-800 font-medium">
          {result}
        </div>
      </div>
    </div>
  );
}
