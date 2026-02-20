import React from 'react';
import {
    Plus,
    Search,
    MoreVertical,
    ExternalLink,
    Zap,
    Clock,
    CheckCircle2
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const DashboardPage: React.FC = () => {
    const { projects } = useAppStore();

    const stats = [
        { label: 'Total Projects', value: projects.length, icon: Zap, color: 'text-blue-500' },
        { label: 'Test Cases', value: projects.reduce((acc, p) => acc + p.testCases.length, 0), icon: CheckCircle2, color: 'text-green-500' },
        { label: 'Generations', value: 12, icon: Clock, color: 'text-purple-500' },
    ];

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-white">Dashboard</h1>
                    <p className="text-gray-400 text-lg">Manage your testing projects and view recent activity.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-500/20 active:scale-95 transition-all">
                    <Plus className="w-5 h-5" />
                    Create Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-gray-900/40 p-6 rounded-3xl border border-gray-800 flex items-center gap-6">
                        <div className={`p-4 rounded-2xl bg-gray-950/50 border border-gray-800 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Recent Projects</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500/50 w-64"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.id} className="bg-gray-900/40 p-6 rounded-3xl border border-gray-800 hover:border-gray-700 transition-all group cursor-pointer">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                                        <CheckCircle2 className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <button className="p-2 text-gray-600 hover:text-white transition-colors">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                                    {project.name}
                                </h3>
                                <p className="text-gray-500 text-sm mt-1">
                                    Updated {new Date(project.updatedAt).toLocaleDateString()}
                                </p>
                                <div className="mt-8 flex justify-between items-end">
                                    <span className="text-2xl font-bold text-white leading-none">
                                        {project.testCases.length} <span className="text-xs text-gray-500 uppercase font-bold tracking-widest ml-1">Cases</span>
                                    </span>
                                    <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 bg-gray-900/20 rounded-3xl border border-dashed border-gray-800 text-center">
                            <p className="text-gray-500 text-lg italic">No projects found. Create your first generation to get started.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
