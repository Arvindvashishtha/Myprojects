import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

const DesignLinkInput: React.FC = () => {
    const [link, setLink] = useState('');
    const { setExtractedText, extractedText } = useAppStore();

    const handleAdd = () => {
        if (!link) return;
        setExtractedText(extractedText + `\n\n--- DESIGN LINK: ${link} ---\nReference specific components and styles from this design context.`);
        setLink('');
    };

    return (
        <div className="space-y-4">
            <div className="p-4 bg-gray-800/20 rounded-2xl border border-gray-800">
                <label className="block text-sm font-medium text-gray-400 mb-2">Figma or XD Share Link</label>
                <div className="flex gap-2">
                    <input
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://www.figma.com/file/..."
                        className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl font-medium transition-all"
                    >
                        Link
                    </button>
                </div>
            </div>
            <p className="text-xs text-gray-600 italic">
                Note: For best results, ensure the design is public or shared with the AI integration.
            </p>
        </div>
    );
};

export default DesignLinkInput;
