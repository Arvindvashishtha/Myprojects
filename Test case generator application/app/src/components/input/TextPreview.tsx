import React from 'react';
import { useAppStore } from '../../store/useAppStore';

const TextPreview: React.FC = () => {
    const { extractedText, setExtractedText } = useAppStore();

    return (
        <div className="h-full flex flex-col bg-gray-950/50">
            <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                placeholder="Extracted text from your documents will appear here. You can also paste requirements directly..."
                className="flex-1 w-full bg-transparent p-6 text-gray-300 font-mono text-sm resize-none focus:outline-none placeholder:text-gray-700"
            />
            <div className="px-6 py-3 border-t border-gray-800/50 bg-gray-900/20 text-[10px] text-gray-600 uppercase tracking-widest flex justify-between">
                <span>Chars: {extractedText.length}</span>
                <span>Lines: {extractedText.split('\n').length}</span>
            </div>
        </div>
    );
};

export default TextPreview;
