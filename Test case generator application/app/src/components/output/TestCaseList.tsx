import React, { useState } from 'react';
import { Search, Download, Trash2, Copy } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import TestCaseCard from './TestCaseCard';
import FilterBar from './FilterBar';
import { exportToExcel, exportToCSV, exportToJSON, exportToMarkdown } from '../../services/exportService';

const TestCaseList: React.FC = () => {
    const { testCases, setTestCases } = useAppStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCases, setSelectedCases] = useState<string[]>([]);
    const [showExportMenu, setShowExportMenu] = useState(false);

    const handleExport = (format: 'excel' | 'csv' | 'json' | 'md') => {
        const list = selectedCases.length > 0
            ? testCases.filter(tc => selectedCases.includes(tc.id))
            : testCases;

        switch (format) {
            case 'excel': exportToExcel(list); break;
            case 'csv': exportToCSV(list); break;
            case 'json': exportToJSON(list); break;
            case 'md': exportToMarkdown(list); break;
        }
        setShowExportMenu(false);
    };

    const filteredCases = testCases.filter(tc =>
        tc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tc.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleSelect = (id: string) => {
        setSelectedCases(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = () => {
        setTestCases(testCases.filter(tc => !selectedCases.includes(tc.id)));
        setSelectedCases([]);
    };

    return (
        <div className="flex flex-col h-full bg-gray-950/20">
            <div className="p-6 border-b border-gray-800 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-white uppercase tracking-tight">
                        Generated Cases
                        <span className="bg-blue-500/10 text-blue-400 text-xs px-2 py-0.5 rounded-full border border-blue-500/20">
                            {testCases.length}
                        </span>
                    </h2>
                    <div className="flex items-center gap-2 relative">
                        <button
                            onClick={() => setShowExportMenu(!showExportMenu)}
                            className="p-2.5 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 rounded-xl transition-all shadow-xl"
                        >
                            <Download className="w-5 h-5" />
                        </button>

                        {showExportMenu && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                <div className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800 mb-1">Export Format</div>
                                {[
                                    { id: 'excel', label: 'Excel (.xlsx)' },
                                    { id: 'csv', label: 'CSV' },
                                    { id: 'json', label: 'JSON' },
                                    { id: 'md', label: 'Markdown' },
                                ].map((f) => (
                                    <button
                                        key={f.id}
                                        onClick={() => handleExport(f.id as any)}
                                        className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-600 hover:text-white transition-colors"
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search cases..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500/50"
                        />
                    </div>
                    <FilterBar />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {filteredCases.map((tc) => (
                    <TestCaseCard
                        key={tc.id}
                        testCase={tc}
                        isSelected={selectedCases.includes(tc.id)}
                        onSelect={() => toggleSelect(tc.id)}
                    />
                ))}
                {filteredCases.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-600">No test cases found matching your criteria.</p>
                    </div>
                )}
            </div>

            {selectedCases.length > 0 && (
                <div className="p-4 bg-blue-600 text-white flex justify-between items-center animate-in slide-in-from-bottom sticky bottom-0 z-10">
                    <span className="font-medium">{selectedCases.length} cases selected</span>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                            <Copy className="w-4 h-4" /> Duplicate
                        </button>
                        <button
                            onClick={handleBulkDelete}
                            className="flex items-center gap-2 hover:text-red-200 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" /> Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestCaseList;
