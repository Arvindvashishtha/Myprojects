import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
    activePage: string;
    setActivePage: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage, setActivePage }) => {
    return (
        <div className="flex min-h-screen bg-black text-gray-100 font-sans antialiased">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />
            <main className="flex-1 h-screen overflow-y-auto bg-gray-950 p-8">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
