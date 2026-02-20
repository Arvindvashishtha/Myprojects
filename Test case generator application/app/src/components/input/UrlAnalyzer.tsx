import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

const UrlAnalyzer: React.FC = () => {
    const [url, setUrl] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const { setExtractedText, extractedText } = useAppStore();

    const handleAnalyze = () => {
        if (!url) return;
        setIsAnalyzing(true);
        // Simulate crawling delay
        setTimeout(() => {
            const simulatedRequirement = `\n\n--- ANALYZED URL: ${url} ---\n` +
                `Flow: User navigates to ${url}\n` +
                `Detected Elements: Login Form, Navigation Bar, Footer Links, Search Input.\n` +
                `Inferred Requirements: Ensure valid URL redirection, verify form field validation, test responsive layout.`;

            setExtractedText(extractedText + simulatedRequirement);
            setIsAnalyzing(false);
            setUrl('');
        }, 1500);
    };

    return (
        <div className="space-y-4">
            <div className="p-4 bg-gray-800/20 rounded-2xl border border-gray-800">
                <label className="block text-sm font-medium text-gray-400 mb-2">Live Application URL</label>
                <div className="flex gap-2">
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/login"
                        className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !url}
                        className={`px-6 py-2 rounded-xl font-bold transition-all ${isAnalyzing || !url
                            ? 'bg-gray-800 text-gray-500'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
                            }`}
                    >
                        {isAnalyzing ? 'Crawling...' : 'Analyze'}
                    </button>
                </div>
            </div>
            <p className="text-xs text-gray-600 italic">
                The analyzer will crawl the page to identify interactive elements and user flows.
            </p>
        </div>
    );
};

export default UrlAnalyzer;
