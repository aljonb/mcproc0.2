'use client';

import { useState } from 'react';
import {
  analyzeMissingProcedures,
  findMissingProcedureMentionsInNotes,
  MissingProcedure
} from './lib/utils';

export default function Home() {
  const [ordersInput, setOrdersInput] = useState('');
  const [appointmentsInput, setAppointmentsInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [results, setResults] = useState<MissingProcedure[]>([]);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    const missing = analyzeMissingProcedures(ordersInput, appointmentsInput, notesInput);
    setResults(missing);
    setAnalyzed(true);
  };

  const handleClear = () => {
    setOrdersInput('');
    setAppointmentsInput('');
    setNotesInput('');
    setResults([]);
    setAnalyzed(false);
  };

  const missingMentionsInNotes = analyzed
    ? findMissingProcedureMentionsInNotes(notesInput, results)
    : [];

  const copyResults = () => {
    const date = new Date().toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: '2-digit' 
    });
    const text = `Missing procedures, ${results.map(r => r.item).join(', ')}, ${date} AB`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Missing Procedures Analyzer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Identify missing procedures by analyzing orders, appointments, and clinical notes
          </p>
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Outstanding Orders */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Outstanding Orders (6 months or newer)
            </label>
            <textarea
              className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              placeholder="Paste outstanding orders here..."
              value={ordersInput}
              onChange={(e) => setOrdersInput(e.target.value)}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Include dates in format: MM/DD/YYYY or YYYY-MM-DD
            </p>
          </div>

          {/* Appointments */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Appointments (Past & Future)
            </label>
            <textarea
              className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              placeholder="Paste appointments here..."
              value={appointmentsInput}
              onChange={(e) => setAppointmentsInput(e.target.value)}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              List all scheduled appointments
            </p>
          </div>

          {/* Clinical Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Clinical Notes
            </label>
            <textarea
              className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              placeholder="Paste clinical notes here..."
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Notes about refusals, outside providers, etc.
            </p>
            {analyzed && results.length > 0 && (
              <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 rounded-md">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Mentions of Missing Procedures in Notes
                </p>
                {missingMentionsInNotes.length === 0 ? (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    No mention of current missing procedures found in the notes.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {missingMentionsInNotes.map((mention, index) => (
                      <div key={`${mention.item}-${index}`}>
                        <p className="text-xs font-medium text-gray-800 dark:text-gray-100">
                          {mention.item}
                        </p>
                        {mention.lines.map((line, lineIndex) => (
                          <p
                            key={`${mention.item}-${lineIndex}`}
                            className="text-xs text-gray-600 dark:text-gray-300"
                          >
                            • {line}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleAnalyze}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!ordersInput.trim()}
          >
            Analyze Missing Procedures
          </button>
          <button
            onClick={handleClear}
            className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
          >
            Clear All
          </button>
        </div>

        {/* Results Section */}
        {analyzed && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Analysis Results
              </h2>
              {results.length > 0 && (
                <button
                  onClick={copyResults}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
                >
                  Copy Results
                </button>
              )}
            </div>

            {results.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-xl text-green-600 dark:text-green-400 font-semibold">
                  No Missing Procedures Found!
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  All orders have either appointments scheduled or are addressed in notes.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
                  <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                    Found {results.length} missing procedure{results.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Summary List */}
                <div className="mb-6">
                  <input
                    type="text"
                    readOnly
                    value={`Missing procedures, ${results.map(r => r.item).join(', ')}, ${new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })} AB`}
                    className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 font-mono text-sm border-0 focus:ring-2 focus:ring-blue-500 cursor-text select-all"
                    onClick={(e) => e.currentTarget.select()}
                  />
                </div>

                {/* Detailed List */}
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {result.item}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {result.orderText}
                          </p>
                          <span className="inline-block mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                            {result.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        {!analyzed && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              How to Use
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Paste outstanding orders in the first field (must be 6 months old or newer)</li>
              <li>Paste all appointments (past and future) in the second field</li>
              <li>Paste clinical notes in the third field (optional, but helps filter false positives)</li>
              <li>Click &quot;Analyze Missing Procedures&quot; to see results</li>
            </ol>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Tip:</strong> The system automatically recognizes medical abbreviations and variations.
                Notes containing phrases like &quot;patient refused&quot;, &quot;has own provider&quot;, or &quot;outside&quot; will
                exclude procedures from the missing list.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
