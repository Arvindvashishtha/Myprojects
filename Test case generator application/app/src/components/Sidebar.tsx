import React from 'react';
import {
    BarChart3,
    FilePlus2,
    History,
    Settings,
    ChevronLeft,
    ChevronRight,
    TestTube2
} from 'lucide-react';

interface SidebarProps {
    activePage: string;
    setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'generator', label: 'New Generation', icon: FilePlus2 },
        { id: 'history', label: 'History', icon: History },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div
            className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'
                } border-r border-gray-800`}
        >
            <div className="p-6 flex items-center gap-3">
                <TestTube2 className="w-8 h-8 text-blue-500" />
                {!isCollapsed && (
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        QA Pilot
                    </span>
                )}
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActivePage(item.id)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activePage === item.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <item.icon className="w-6 h-6 shrink-0" />
                        {!isCollapsed && <span className="font-medium">{item.label}</span>}
                    </button>
                ))}
            </nav>

            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-4 border-t border-gray-800 flex justify-center text-gray-500 hover:text-white"
            >
                {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
        </div>
    );
};

export default Sidebar;
