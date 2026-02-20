export const Dashboard = () => (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 text-lg">Welcome back! Here's your test generation overview.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-colors">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    </div>
                    <h3 className="font-semibold text-lg">Project Alpha</h3>
                    <p className="text-gray-500 text-sm mt-1">Last updated 2 days ago</p>
                    <div className="mt-4 text-2xl font-bold">24 Test Cases</div>
                </div>
            ))}
        </div>
    </div>
);

export const Generator = () => (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold">New Generation</h1>
        <p className="text-gray-400 text-lg">Upload your requirements to start generating test cases.</p>
        <div className="bg-gray-900/30 rounded-3xl border-2 border-dashed border-gray-800 p-20 text-center">
            <p className="text-gray-600">Drop your files here</p>
        </div>
    </div>
);

export const History = () => (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold">Generation History</h1>
        <p className="text-gray-400 text-lg">View and restore previous test case generations.</p>
    </div>
);

export const Settings = () => (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400 text-lg">Configure your API provider and application preferences.</p>
    </div>
);
