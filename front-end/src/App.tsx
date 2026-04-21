import type { FC } from 'react'
import { Outlet } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

const App: FC = () => {
  return (
    <div className="min-h-screen w-full px-2">
      <div>
        <header>
          <Navbar/>
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
