import { useMemo, useState } from 'react'
import { CalendarDays, CheckCircle2, Clock3 } from 'lucide-react'

const baseSlots = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00'
]

function todayIso() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().split('T')[0]
}

function storageKey(date) {
  return `agenda:${date}`
}

export default function Agenda() {

  const [date, setDate] = useState(todayIso())
  const [time, setTime] = useState('')
  const [sent, setSent] = useState(false)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    modality: 'Online',
    note: ''
  })

  const unavailable = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem(storageKey(date)) || '[]'
      )
    } catch {
      return []
    }
  }, [date, sent])



  // ========================================
  // ENVIO PARA WHATSAPP
  // ========================================

  function enviarWhatsApp() {

    const numeroPsicologa = "5592993633961"

    const mensagem = `
Olá! Gostaria de solicitar um agendamento.

👤 Nome: ${form.name}

📱 WhatsApp: ${form.phone}

📅 Data: ${date}

🕐 Horário: ${time}

💻 Modalidade: ${form.modality}

📝 Observação:
${form.note || 'Nenhuma observação'}

Aguardo a confirmação do atendimento.
    `

    const url =
      `https://wa.me/${numeroPsicologa}?text=${encodeURIComponent(mensagem)}`

    window.open(url, '_blank')
  }



  // ========================================
  // REALIZAR AGENDAMENTO
  // ========================================

  const submit = (e) => {

    e.preventDefault()

    if (!time) {
      return alert('Selecione um horário.')
    }

    const existing = JSON.parse(
      localStorage.getItem(storageKey(date)) || '[]'
    )

    if (existing.includes(time)) {
      return alert(
        'Esse horário acabou de ser reservado. Escolha outro.'
      )
    }



    // Salva o horário como ocupado

    localStorage.setItem(
      storageKey(date),
      JSON.stringify([...existing, time])
    )



    // Salva os dados do agendamento

    const appointments = JSON.parse(
      localStorage.getItem('appointments') || '[]'
    )

    localStorage.setItem(
      'appointments',
      JSON.stringify([
        ...appointments,
        {
          ...form,
          date,
          time,
          createdAt: new Date().toISOString()
        }
      ])
    )



    // Abre WhatsApp

    enviarWhatsApp()



    // Mostra confirmação

    setSent(true)
  }



  // ========================================
  // TELA DE CONFIRMAÇÃO
  // ========================================

  if (sent) {

    return (

      <section className="section page-top">

        <div className="container success-card">

          <CheckCircle2 size={48} />

          <h1>
            Solicitação registrada!
          </h1>

          <p>
            Seu horário foi reservado e a solicitação
            foi encaminhada para o WhatsApp da psicóloga.
          </p>

          <p>
            O atendimento será confirmado após o contato
            da profissional.
          </p>

          <button
            className="btn primary"
            onClick={() => {
              setSent(false)
              setTime('')
              setForm({
                name: '',
                phone: '',
                modality: 'Online',
                note: ''
              })
            }}
          >

            Fazer outro agendamento

          </button>

        </div>

      </section>

    )
  }



  // ========================================
  // PÁGINA DA AGENDA
  // ========================================

  return (

    <section className="section page-top">

      <div className="container agenda-layout">


        <div className="agenda-intro">

          <span className="eyebrow">
            Agenda
          </span>

          <h1>
            Escolha uma data e um horário.
          </h1>

          <p>
            Selecione uma opção disponível e
            preencha seus dados para solicitar
            o atendimento.
          </p>


          <div className="agenda-tip">

            <CalendarDays size={20} />

            <span>
              Escolha abaixo um horário disponível.
            </span>

          </div>

        </div>



        <form
          className="booking-card"
          onSubmit={submit}
        >


          {/* DATA */}

          <label>

            Data do atendimento

            <input
              type="date"
              min={todayIso()}
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
                setTime('')
              }}
              required
            />

          </label>



          {/* HORÁRIOS */}

          <div className="field-label">
            Horários disponíveis
          </div>


          <div className="slots">

            {baseSlots.map((slot) => {

              const disabled =
                unavailable.includes(slot)

              return (

                <button

                  type="button"

                  key={slot}

                  disabled={disabled}

                  className={`slot ${
                    time === slot
                      ? 'selected'
                      : ''
                  }`}

                  onClick={() =>
                    setTime(slot)
                  }

                >

                  <Clock3 size={15} />

                  {slot}

                  {disabled && (
                    <small>
                      ocupado
                    </small>
                  )}

                </button>

              )

            })}

          </div>



          {/* FORMULÁRIO */}

          <div className="form-grid">


            <label>

              Nome completo

              <input

                value={form.name}

                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }

                required

              />

            </label>



            <label>

              WhatsApp

              <input

                value={form.phone}

                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value
                  })
                }

                placeholder="(00) 00000-0000"

                required

              />

            </label>



            <label>

              Modalidade

              <select

                value={form.modality}

                onChange={(e) =>
                  setForm({
                    ...form,
                    modality: e.target.value
                  })
                }

              >

                <option>
                  Online
                </option>

                <option>
                  Presencial
                </option>

              </select>

            </label>



            <label className="full">

              Observação

              <textarea

                rows="4"

                value={form.note}

                onChange={(e) =>
                  setForm({
                    ...form,
                    note: e.target.value
                  })
                }

                placeholder="Opcional"

              />

            </label>


          </div>



          <button
            className="btn primary full-btn"
            type="submit"
          >

            Solicitar agendamento pelo WhatsApp

          </button>


          <small className="privacy-note">

            Evite inserir informações clínicas
            sensíveis neste formulário.

          </small>


        </form>


      </div>

    </section>

  )

}