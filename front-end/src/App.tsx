import type { FC } from 'react'
import { Outlet } from 'react-router'
import './App.css'
import Footer from './components/Footer';

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header>
        {/* TODO: NAVBAR */}
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
  
};

export default App
