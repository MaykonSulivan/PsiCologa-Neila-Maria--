# Site React para Psicóloga

## Como rodar
1. Abra a pasta no VS Code.
2. No terminal, execute:
   npm install
3. Depois:
   npm run dev
4. Abra o endereço mostrado pelo Vite.

## Páginas
- `/` — site institucional
- `/agenda` — agendamento de horários
- `/agenda-profissional` — visualização dos agendamentos (demonstração)

## Importante
Esta versão usa `localStorage`, então os dados ficam apenas no navegador atual. Para uso profissional real, integre com um backend/banco de dados e autenticação, ou com Google Calendar.

## Personalização
Troque no código:
- Nome da psicóloga
- CRP
- Telefone
- Foto
- Textos dos atendimentos
- Horários em `src/pages/Agenda.jsx`
