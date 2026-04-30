import type { FC } from 'react'
import { Outlet } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

const App: FC = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <div>
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );

};

export default App
