import React, { useState } from 'react';
import {
    FileText,
    Image as ImageIcon,
    Link as LinkIcon,
    Globe,
    Sparkles
} from 'lucide-react';
import DocumentUploader from '../components/input/DocumentUploader';
import ImageUploader from '../components/input/ImageUploader';
import DesignLinkInput from '../components/input/DesignLinkInput';
import UrlAnalyzer from '../components/input/UrlAnalyzer';
import TextPreview from '../components/input/TextPreview';
import TestCaseList from '../components/output/TestCaseList';
import { useAppStore } from '../store/useAppStore';
import { generateTestCases } from '../services/aiService';

const GeneratorPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'docs' | 'images' | 'design' | 'url'>('docs');
    const {
        testCases,
        isProcessing,
        setProcessing,
        setTestCases,
        extractedText,
        uploadedFiles,
        settings
    } = useAppStore();

    const tabs = [
        { id: 'docs', label: 'Documents', icon: FileText },
        { id: 'images', label: 'Screenshots', icon: ImageIcon },
        { id: 'design', label: 'Design Links', icon: LinkIcon },
        { id: 'url', label: 'URL Analyzer', icon: Globe },
    ] as const;

    const handleGenerate = async () => {
        if (!extractedText && uploadedFiles.length === 0) return;

        setProcessing(true);
        try {
            const images = uploadedFiles
                .filter(f => f.type.startsWith('image/'))
                .map(f => f.previewUrl || '');

            const results = await generateTestCases(
                { requirements: extractedText, images },
                settings.apiKey,
                settings.model,
                settings.apiProvider
            );
            setTestCases(results);
        } catch (error: any) {
            console.error('Generation failed:', error);
            alert(`Generation failed: ${error.message || 'Unknown error'}`);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="flex flex-col h-full gap-8">
            {/* Header section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Generate Test Cases</h1>
                    <p className="text-gray-400 mt-2 text-lg">
                        Upload your requirements and let AI handle the heavy lifting.
                    </p>
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={isProcessing}
                    className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${isProcessing
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/25 active:scale-95'
                        }`}
                >
                    {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Sparkles className="w-5 h-5" />
                    )}
                    {isProcessing ? 'Analyzing...' : 'Generate Cases'}
                </button>
            </div>

            {/* Main split-screen content */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0">
                {/* Left column: Inputs */}
                <div className="flex flex-col gap-6 min-h-0">
                    <div className="flex bg-gray-900/50 p-1.5 rounded-2xl border border-gray-800">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-medium ${activeTab === tab.id
                                    ? 'bg-gray-800 text-white shadow-inner'
                                    : 'text-gray-400 hover:text-gray-200'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 bg-gray-900/30 rounded-3xl border border-gray-800 p-6 overflow-y-auto">
                        {activeTab === 'docs' && <DocumentUploader />}
                        {activeTab === 'images' && <ImageUploader />}
                        {activeTab === 'design' && <DesignLinkInput />}
                        {activeTab === 'url' && <UrlAnalyzer />}
                    </div>
                </div>

                {/* Right column: Previews / Results */}
                <div className="bg-gray-900/10 rounded-3xl border border-gray-800/50 flex flex-col min-h-0 overflow-hidden">
                    {testCases.length > 0 ? (
                        <TestCaseList />
                    ) : (
                        <div className="flex-1 flex flex-col">
                            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-400 uppercase tracking-widest text-xs">Requirement Preview</h3>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <TextPreview />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GeneratorPage;
