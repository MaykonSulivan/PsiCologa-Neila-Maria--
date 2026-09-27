import { useEffect, useState } from 'react'

export default function AdminAgenda() {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    try { setAppointments(JSON.parse(localStorage.getItem('appointments') || '[]')) } catch { setAppointments([]) }
  }, [])

  const remove = (index) => {
    const item = appointments[index]
    const next = appointments.filter((_, i) => i !== index)
    localStorage.setItem('appointments', JSON.stringify(next))
    const key = `agenda:${item.date}`
    const slots = JSON.parse(localStorage.getItem(key) || '[]').filter(t => t !== item.time)
    localStorage.setItem(key, JSON.stringify(slots))
    setAppointments(next)
  }

  return (
    <section className="section page-top">
      <div className="container">
        <span className="eyebrow">Área profissional • demonstração</span>
        <h1>Agenda da psicóloga</h1>
        <p className="muted">Nesta versão, os dados ficam somente no navegador. Para uso real, recomendamos autenticação e banco de dados.</p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Data</th><th>Horário</th><th>Paciente</th><th>Contato</th><th>Modalidade</th><th></th></tr></thead>
            <tbody>
              {appointments.length === 0 ? <tr><td colSpan="6">Nenhum agendamento registrado.</td></tr> : appointments.map((a,i)=><tr key={i}>
                <td>{a.date}</td><td>{a.time}</td><td>{a.name}</td><td>{a.phone}</td><td>{a.modality}</td><td><button className="small-danger" onClick={()=>remove(i)}>Cancelar</button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
