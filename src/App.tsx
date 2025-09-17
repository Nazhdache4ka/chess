import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GamePhaseProvider } from './context/game-phase-provider'
import GamePage from './pages/GamePage'
import About from './pages/About'
import DefaultPage from './pages/DefaultPage'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
          <GamePhaseProvider>
            <Routes>
                <Route path="/game" element={<GamePage />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<DefaultPage />} />
            </Routes>
          </GamePhaseProvider>
        </BrowserRouter>
    </div>
  )
}

export default App
