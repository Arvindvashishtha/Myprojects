import React, { useState } from 'react';
import {
    ChevronDown,
    ChevronUp,
    Edit3,
    Trash2,
    AlertCircle,
    Clock,
    Zap
} from 'lucide-react';
import type { TestCase, Priority } from '../../types';
import { useAppStore } from '../../store/useAppStore';

interface TestCaseCardProps {
    testCase: TestCase;
    isSelected: boolean;
    onSelect: () => void;
}

const TestCaseCard: React.FC<TestCaseCardProps> = ({ testCase, isSelected, onSelect }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { setTestCases, testCases } = useAppStore();

    const getPriorityIcon = (priority: Priority) => {
        switch (priority) {
            case 'High': return <Zap className="w-4 h-4 text-red-500" />;
            case 'Medium': return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'Low': return <AlertCircle className="w-4 h-4 text-blue-500" />;
        }
    };

    const getPriorityClass = (priority: Priority) => {
        switch (priority) {
            case 'High': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'Low': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
        }
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setTestCases(testCases.filter(tc => tc.id !== testCase.id));
    };

    return (
        <div
            className={`border rounded-2xl transition-all ${isSelected
                    ? 'border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10'
                    : 'border-gray-800 bg-gray-900/40 hover:border-gray-700'
                }`}
        >
            <div className="p-5 flex items-start gap-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                        e.stopPropagation();
                        onSelect();
                    }}
                    className="mt-1.5 w-5 h-5 rounded-md border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500"
                />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-mono text-gray-500">{testCase.id}</span>
                        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityClass(testCase.priority)}`}>
                            {getPriorityIcon(testCase.priority)}
                            {testCase.priority.toUpperCase()}
                        </div>
                        <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full border border-gray-700">
                            {testCase.testType}
                        </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-100 truncate">
                        {testCase.title}
                    </h4>
                </div>

                <button className="p-2 text-gray-500 hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
            </div>

            {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-gray-800 space-y-6 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div>
                                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Preconditions</h5>
                                <p className="text-sm text-gray-300 leading-relaxed bg-gray-950/50 p-3 rounded-lg border border-gray-800">
                                    {testCase.preconditions || 'No preconditions defined.'}
                                </p>
                            </div>
                            <div>
                                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Expected Results</h5>
                                <p className="text-sm text-gray-300 leading-relaxed bg-blue-500/5 p-3 rounded-lg border border-blue-500/20">
                                    {testCase.expectedResults}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Test Steps</h5>
                            <div className="space-y-2">
                                {testCase.steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-3 items-start group">
                                        <span className="text-xs font-bold text-blue-500 bg-blue-500/10 w-6 h-6 flex items-center justify-center rounded-md shrink-0 border border-blue-500/20">
                                            {idx + 1}
                                        </span>
                                        <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors py-0.5">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-800/50">
                        <div className="flex gap-4">
                            <button
                                onClick={(e) => { e.stopPropagation(); }}
                                className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors"
                            >
                                <Edit3 className="w-3.5 h-3.5" /> EDIT CASE
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-red-400 transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" /> DELETE
                            </button>
                        </div>
                        {testCase.relatedRequirements && (
                            <span className="text-[10px] font-medium text-gray-600 italic">
                                Ref: {testCase.relatedRequirements}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestCaseCard;
