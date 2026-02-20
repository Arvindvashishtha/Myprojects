import React from 'react';
import { Save, Key, Cpu, Moon, Sun, Monitor } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const SettingsPage: React.FC = () => {
    const { settings, updateSettings } = useAppStore();

    const handleSave = () => {
        alert('Settings saved locally!');
    };

    return (
        <div className="max-w-4xl space-y-12">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-gray-400">Configure your application preferences and AI integration.</p>
            </div>

            <div className="space-y-8">
                {/* AI Configuration */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Key className="w-5 h-5 text-blue-500" />
                        AI Integration
                    </h2>
                    <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">API Provider</label>
                                <select
                                    value={settings.apiProvider}
                                    onChange={(e) => {
                                        const provider = e.target.value as any;
                                        const defaultModel = provider === 'gemini' ? 'gemini-1.5-flash' :
                                            provider === 'openai' ? 'gpt-4o' :
                                                provider === 'claude' ? 'claude-3-5-sonnet-20240620' : settings.model;
                                        updateSettings({ apiProvider: provider, model: defaultModel });
                                    }}
                                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="gemini">Google Gemini (1.5 Flash)</option>
                                    <option value="openai">OpenAI (GPT-4o)</option>
                                    <option value="claude">Anthropic (Claude 3.5)</option>
                                    <option value="custom">Custom Endpoint</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Model Name</label>
                                <div className="flex relative">
                                    <Cpu className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                    <select
                                        value={settings.model}
                                        onChange={(e) => updateSettings({ model: e.target.value })}
                                        className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 appearance-none"
                                    >
                                        {settings.apiProvider === 'gemini' && (
                                            <>
                                                <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast)</option>
                                                <option value="gemini-1.5-pro">Gemini 1.5 Pro (Powerful)</option>
                                                <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
                                            </>
                                        )}
                                        {settings.apiProvider === 'openai' && (
                                            <>
                                                <option value="gpt-4o">GPT-4o</option>
                                                <option value="gpt-4o-mini">GPT-4o Mini</option>
                                                <option value="o1-preview">o1-preview</option>
                                            </>
                                        )}
                                        {settings.apiProvider === 'claude' && (
                                            <>
                                                <option value="claude-3-5-sonnet-20240620">Claude 3.5 Sonnet</option>
                                                <option value="claude-3-opus-20240229">Claude 3 Opus</option>
                                                <option value="claude-3-5-haiku-20241022">Claude 3.5 Haiku</option>
                                            </>
                                        )}
                                        {settings.apiProvider === 'custom' && (
                                            <option value={settings.model}> {settings.model} </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">API Key</label>
                            <input
                                type="password"
                                placeholder="sk-..."
                                value={settings.apiKey}
                                onChange={(e) => updateSettings({ apiKey: e.target.value })}
                                className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 font-mono"
                            />
                            <p className="text-xs text-gray-600 italic">
                                Your API key is stored locally in your browser and never sent to our servers.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Appearance */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Sun className="w-5 h-5 text-yellow-500" />
                        Appearance
                    </h2>
                    <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-2 flex gap-2 w-fit">
                        {[
                            { id: 'light', icon: Sun, label: 'Light' },
                            { id: 'dark', icon: Moon, label: 'Dark' },
                            { id: 'system', icon: Monitor, label: 'System' },
                        ].map((theme) => (
                            <button
                                key={theme.id}
                                onClick={() => updateSettings({ theme: theme.id as any })}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all ${settings.theme === theme.id
                                    ? 'bg-gray-800 text-white shadow-inner'
                                    : 'text-gray-500 hover:text-gray-300'
                                    }`}
                            >
                                <theme.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{theme.label}</span>
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            <div className="pt-8 border-t border-gray-800 flex justify-end">
                <button
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                >
                    <Save className="w-5 h-5" />
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
