import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState([]);
  const [numLines, setNumLines] = useState(2);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text!");
      return;
    }

    setLoading(true);
    setError(null);
    setSummary([]);

    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, num_sentences: numLines }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.summary || "Failed to summarize");
      }

      const data = await response.json();
      setSummary(data.summary);
      toast.success("Summary generated!");
    } catch (err) {
      setError(err.message || "Something went wrong.");
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-blue-50 text-slate-900"}`}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Text Summarizer</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-all shadow-sm ${
              darkMode
                ? "bg-indigo-500 text-white hover:bg-indigo-600"
                : "bg-yellow-300 text-yellow-900 hover:bg-yellow-400"
            }`}
            title="Toggle theme"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </header>

        {/* Text Input */}
        <textarea
          className="w-full p-4 mb-4 rounded-lg border border-gray-300 dark:border-slate-700 resize-none
                   bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="6"
          placeholder="Paste or type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Number of Lines Selector */}
        <div className="mb-4">
          <label className="font-medium mr-2">Summary Lines:</label>
          <select
            value={numLines}
            onChange={(e) => setNumLines(Number(e.target.value))}
            className="p-2 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Summarize Button */}
        <button
          onClick={handleSummarize}
          disabled={!text.trim() || loading}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-lg shadow-md transition"
        >
          {loading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
              <span>Summarizing...</span>
            </div>
          ) : (
            "Summarize"
          )}
        </button>

        {/* Error Message */}
        {error && <div className="mt-4 text-red-600 font-semibold">⚠️ {error}</div>}

        {/* Summary Output */}
        {summary.length > 0 && (
          <div className="mt-8 p-6 rounded-xl shadow-xl bg-white dark:bg-slate-800 border dark:border-slate-700 transition animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">📄 Summary</h2>
            <p className="text-lg leading-relaxed text-slate-800 dark:text-slate-200">
              {Array.isArray(summary) ? summary.join(" ") : summary}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400 p-4">
        © 2025 Text Summarizer • Built with ❤️ using React & Flask
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default App;
