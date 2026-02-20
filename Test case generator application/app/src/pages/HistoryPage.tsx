import React from 'react';
import { History as HistoryIcon, Calendar, Tags, FileText, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const HistoryPage: React.FC = () => {
    const { history } = useAppStore();

    return (
        <div className="space-y-10">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-4">
                    <HistoryIcon className="text-blue-500 w-10 h-10" />
                    Generation History
                </h1>
                <p className="text-gray-400 text-lg">View previous sessions and restore generated test suites.</p>
            </div>

            <div className="space-y-4">
                {history.length > 0 ? (
                    history.map((item) => (
                        <div key={item.id} className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all group flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-gray-950/50 rounded-xl border border-gray-800 text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                                    {item.inputSource.includes('Document') ? <FileText /> : <Tags />}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-gray-100 uppercase tracking-tight">Generation Session {item.id.slice(0, 8)}</h3>
                                    <div className="flex gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(item.timestamp).toLocaleString()}</span>
                                        <span className="flex items-center gap-1.5"><Tags className="w-3.5 h-3.5" /> {item.inputSource}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-white">{item.caseCount}</p>
                                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest leading-none">Cases</p>
                                </div>
                                <ChevronRight className="text-gray-700 group-hover:text-blue-500 transition-colors" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-32 bg-gray-900/20 rounded-3xl border border-dashed border-gray-800 flex flex-col items-center justify-center gap-4">
                        <HistoryIcon className="w-12 h-12 text-gray-700" />
                        <p className="text-gray-500 text-lg italic">Your generation history is currently empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;
