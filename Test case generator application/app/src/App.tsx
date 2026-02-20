import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/DashboardPage';
import Generator from './pages/GeneratorPage';
import History from './pages/HistoryPage';
import Settings from './pages/SettingsPage';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'generator': return <Generator />;
      case 'history': return <History />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </Layout>
  );
}

export default App;
