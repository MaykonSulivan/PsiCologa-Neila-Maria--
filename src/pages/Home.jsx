import { Link } from 'react-router-dom'
import { CalendarCheck, Heart, LockKeyhole, MessageCircle, Video, MapPin } from 'lucide-react'
import psicologa from './img/psicologa.png'
import { CalendarClock } from "lucide-react";


export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Cuidado emocional com acolhimento</span>
            <h1>Um espaço seguro para cuidar da sua saúde emocional.</h1>
            <p>Atendimento psicológico individual para adultos, presencial e online, com escuta qualificada, sigilo e respeito ao seu processo.</p>
            <div className="hero-actions">
              <Link className="btn primary" to="/agenda"><CalendarCheck size={19}/> Agendar atendimento</Link>
              <a className="btn ghost" href="#sobre">Conhecer a profissional</a>
            </div>
            <div className="trust-row">
              <span><LockKeyhole size={16}/> Sigilo profissional</span>
              <span><Heart size={16}/> Atendimento humanizado</span>
            </div>
          </div>
          <div className="profile-card">
            <div className="profile-photo">
             <img src={psicologa} alt="Psicóloga" />
              </div>
            <h2>Psi. Neila Maria Vasconcelos</h2>
            <p>Psicóloga Clínica</p>
            <small>CRP 20/14348</small>
          </div>
        </div>
      </section>

      <section id="sobre" className="section">
        <div className="container two-cols">
          <div>
            <span className="eyebrow">Sobre mim</span>
            <h2>Acolhimento, ética e cuidado em cada encontro.</h2>
          </div>
          <div className="text-card">
            <p>Sou psicóloga clínica e ofereço um espaço de escuta acolhedora para pessoas que desejam compreender melhor suas emoções, relações e desafios cotidianos.</p>
            <p>O processo terapêutico é construído de forma individual, respeitando a história, o tempo e as necessidades de cada pessoa.</p>
          </div>
        </div>
      </section>

      <section id="servicos" className="section alt">
        <div className="container">
          <span className="eyebrow">Atendimentos</span>
          <h2>Escolha a modalidade que funciona melhor para você.</h2>
          <div className="cards three">
            <article className="info-card">
              <MapPin size={26}/><h3>Presencial</h3><p>Atendimento em ambiente reservado e confortável, com horário previamente agendado.</p>
            </article>
            <article className="info-card">
              <Video size={26}/><h3>Online</h3><p>Sessões por videochamada, permitindo mais flexibilidade para sua rotina.</p>
            </article>
            <article className="info-card">
              <CalendarClock size={30
              } color="#5f8074" strokeWidth={2} /><h3>Agendamento antecipado</h3><p>Garanta seu horário com antecedência e tenha mais tranquilidade para organizar sua rotina.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section callout-section">
        <div className="container callout">
          <div><span className="eyebrow light">Agendamento online</span><h2>Veja os horários disponíveis e solicite sua sessão.</h2></div>
          <Link className="btn light-btn" to="/agenda">Ver agenda</Link>
        </div>
      </section>
    </>
  )
}
