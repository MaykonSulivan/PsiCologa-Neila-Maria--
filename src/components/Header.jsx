import { Link, NavLink } from 'react-router-dom'
import { CalendarDays, HeartHandshake } from 'lucide-react'

export default function Header() {
  return (
    <header className="header">
      <div className="container nav-wrap">
        <Link className="brand" to="/">
          <span className="brand-icon"><HeartHandshake size={22} /></span>
          <span>
            <strong>Psi. Neila Maria Vasconcelos</strong>
            <small>Psicóloga • CRP 20/14348</small>
          </span>
        </Link>
        <nav className="nav">
          <NavLink to="/">Início</NavLink>
          <a href="/#sobre">Sobre</a>
          <a href="/#servicos">Atendimentos</a>
          <NavLink className="nav-cta" to="/agenda"><CalendarDays size={18}/> Agendar</NavLink>
        </nav>
      </div>
    </header>
  )
}
