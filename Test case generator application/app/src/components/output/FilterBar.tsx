import React from 'react';
import { Filter } from 'lucide-react';

const FilterBar: React.FC = () => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex bg-gray-900 border border-gray-800 rounded-xl overflow-hidden p-1">
                {['All', 'High', 'Medium', 'Low'].map((p) => (
                    <button
                        key={p}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${p === 'All'
                                ? 'bg-gray-800 text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                    >
                        {p}
                    </button>
                ))}
            </div>
            <button className="p-2 border border-blue-500/20 bg-blue-500/5 text-blue-400 rounded-xl hover:bg-blue-500/10 transition-all">
                <Filter className="w-4 h-4" />
            </button>
        </div>
    );
};

export default FilterBar;
