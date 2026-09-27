import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Agenda from './pages/Agenda'
import AdminAgenda from './pages/AdminAgenda'

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/agenda-profissional" element={<AdminAgenda />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
