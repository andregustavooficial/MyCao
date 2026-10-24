// MyCão — protótipo navegável (dados de exemplo; nada é salvo ainda)

const $app = document.getElementById('app')
const $tabs = document.getElementById('tabs')
const $toast = document.getElementById('toast')
const VERSION = '__V__'   // trocado pelo commit na publicação

// ---------- Ícones (traço arredondado) ----------

const ICONS = {
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  cal: 'M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18',
  heart: 'M12 20s-7-4.3-8.8-8.6C1.8 8.1 3.9 4.5 7.4 4.5c1.9 0 3.3 1 4.6 2.8 1.3-1.8 2.7-2.8 4.6-2.8 3.5 0 5.6 3.6 4.2 6.9C19 15.7 12 20 12 20z',
  clock: 'M12 8v4l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
  grid: 'M5 5h5v5H5zM14 5h5v5h-5zM5 14h5v5H5zM14 14h5v5h-5z',
  pill: 'm10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7zM8.5 8.5l7 7',
  chart: 'M3 3v18h18M7 15l4-4 3 3 5-6',
  doc: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h4',
  syringe: 'M18 2l4 4M17 7l3-3M19 9l-8.7 8.7a1 1 0 0 1-1.4 0l-2.6-2.6a1 1 0 0 1 0-1.4L15 5M9 11l4 4M5 19l-3 3',
  alert: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z',
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
  plus: 'M12 5v14M5 12h14',
  check: 'M5 12l5 5L20 7',
  help: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6M12 17h.01',
}
const ic = (name, color = 'currentColor', size = 22) =>
  `<svg class="ic" viewBox="0 0 24 24" style="width:${size}px;height:${size}px;stroke:${color}" aria-hidden="true"><path d="${ICONS[name]}"/></svg>`
const heartFill = (size) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path d="${ICONS.heart}" fill="#FFFFFF"/></svg>`

// ---------- Navegação ----------

const TABS = [
  { id: 'inicio', label: 'Início', icon: 'home' },
  { id: 'agenda', label: 'Agenda', icon: 'cal' },
  { id: 'medir', label: 'Medir', icon: 'heart' },
  { id: 'diario', label: 'Diário', icon: 'clock' },
  { id: 'mais', label: 'Mais', icon: 'grid' },
]
// Telas abertas pelo "Mais" acendem a aba Mais
const PARENT = { prontuario: 'mais', exames: 'mais', remedios: 'mais', vacinas: 'mais', intercorrencia: 'inicio', 'como-medir': 'medir' }

const route = () => (location.hash.replace(/^#\/?/, '') || 'inicio')

function renderTabs(active) {
  const cols = TABS.map(t => (t.id === active ? '2.4fr' : '1fr')).join(' ')
  $tabs.innerHTML = `<div class="bar" style="grid-template-columns:${cols}">${TABS.map(t => {
    const on = t.id === active
    return `<a href="#/${t.id}" class="tab${on ? ' on' : ''}" aria-label="${t.label}"${on ? ' aria-current="page"' : ''}>${ic(t.icon)}${on ? `<span>${t.label}</span>` : ''}</a>`
  }).join('')}</div>`
}

function render() {
  const r = route()
  const screen = SCREENS[r] || SCREENS.inicio
  stopTimer()
  $app.innerHTML = screen()
  renderTabs(PARENT[r] || (SCREENS[r] ? r : 'inicio'))
  window.scrollTo(0, 0)
}

function toast(msg) {
  $toast.textContent = msg
  $toast.classList.add('show')
  clearTimeout(toast.t)
  toast.t = setTimeout(() => $toast.classList.remove('show'), 2200)
}

// Cliques em elementos com data-act chamam ACTIONS[nome](elemento)
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]')
  if (el && ACTIONS[el.dataset.act]) ACTIONS[el.dataset.act](el)
})

// ---------- Telas ----------

const back = (to, label) => `<a href="#/${to}" class="back">‹ ${label}</a>`

const SCREENS = {
  inicio: () => `
    <header class="hero">
      <div class="top">
        <span style="font-size:15px;font-weight:600;opacity:.9">${todayLabel()}</span>
        <button class="bell press" aria-label="Notificações">${ic('bell', '#FFFFFF', 20)}</button>
      </div>
      <div class="row" style="gap:14px">
        <div class="avatar">M</div>
        <div class="col" style="gap:2px">
          <span style="font-size:34px;font-weight:800;letter-spacing:-.8px;line-height:1">Mike</span>
          <span style="font-size:14px;font-weight:500;opacity:.92">Yorkshire · 13 anos · 3,2 kg</span>
        </div>
      </div>
    </header>
    <div class="page overlap">
      <a href="#/medir" class="card big press in" style="color:var(--ink)">
        <div class="top"><span class="label" style="margin:0">Respiração em repouso</span><span class="pill ok">Normal</span></div>
        <div class="top" style="align-items:flex-end">
          <div class="row" style="gap:6px;align-items:baseline"><span class="big-num">24</span><span class="small" style="font-size:16px;font-weight:600">rpm · hoje 08:15</span></div>
          <svg width="84" height="36" viewBox="0 0 84 36" fill="none" aria-hidden="true"><polyline points="2,22 14,20 26,24 38,18 50,21 62,16 74,19 82,17" stroke="#64B5F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><line x1="2" y1="8" x2="82" y2="8" stroke="#FFB4A0" stroke-width="1.5" stroke-dasharray="3 4"/></svg>
        </div>
        <span class="btn primary">Contar respiração agora</span>
      </a>
      <div class="card warn in row" style="flex-direction:row;align-items:flex-start">
        <div class="tile" style="width:32px;height:32px;border-radius:10px;background:var(--orange)">${ic('alert', '#0B1B2B', 18)}</div>
        <div class="col" style="gap:2px"><span class="b" style="font-size:15px">Sopro cardíaco · grau [X]</span><span style="font-size:14px;color:#5A3A22">Contar todo dia dormindo. Alerta acima de 30 rpm.</span></div>
      </div>
      <div class="shortcuts in">
        ${[['remedios', 'pill', 'Remédios'], ['agenda', 'cal', 'Agenda'], ['exames', 'chart', 'Exames'], ['prontuario', 'doc', 'Prontuário']].map(([h, i, l]) =>
          `<a href="#/${h}" class="shortcut press"><span class="tile">${ic(i, '#1976D2')}</span>${l}</a>`).join('')}
      </div>
      <div class="list in">
        <div class="row"><span class="dot" style="background:var(--green)"></span><span class="grow b" style="font-size:15px">[Remédio 1] · 1 comp.</span><span class="small" style="font-size:14px">08:00 · dado</span></div>
        <div class="row"><span class="dot" style="background:var(--orange)"></span><span class="grow b" style="font-size:15px">[Remédio 2] · ½ comp.</span><span class="b" style="font-size:14px;color:var(--blue-700)">20:00</span></div>
        <div class="row"><span style="font-size:13px;font-weight:800;color:var(--blue-700);width:52px">02 NOV</span><span class="grow b" style="font-size:15px">Cardiologista</span><a href="#/prontuario" class="b" style="font-size:14px">Resumo ›</a></div>
      </div>
      <a href="#/intercorrencia" class="btn care press in">${ic('plus', '#0B1B2B', 20)}Registrar intercorrência</a>
    </div>`,

  agenda: () => {
    const days = weekDays()
    return `
    <div class="page">
      <div class="top"><h1>Agenda</h1><button class="iconbtn press" aria-label="Novo compromisso" data-act="soon">${ic('plus', '#FFFFFF')}</button></div>
      <div class="card" style="gap:10px">
        <div class="top"><span class="b" style="font-size:17px">${days.title}</span><span class="pill ok">Google Agenda conectado</span></div>
        <div class="week">${days.list.map((d, i) => `<button class="day press${i === state.day ? ' on' : ''}" data-act="day" data-i="${i}"><small>${d.w}</small><b>${d.n}</b><span class="dot" style="width:6px;height:6px;background:${d.dot ? (i === state.day ? '#FFFFFF' : d.dot) : 'transparent'}"></span></button>`).join('')}</div>
      </div>
      <div class="chips">${['Tudo', 'Consultas', 'Exames', 'Vacinas', 'Remédios'].map((c, i) => `<span class="chip${i === 0 ? ' on' : ''}">${c}</span>`).join('')}</div>
      <span class="label">Próximos</span>
      <div class="card row" style="flex-direction:row"><div class="date"><b>02</b><small>NOV</small></div><div class="col grow" style="gap:2px"><span class="b" style="font-size:16px">Consulta cardiologista</span><span class="small">10:30 · [Clínica] · lembrete 1 dia antes</span><a href="#/prontuario" class="b" style="font-size:13px;margin-top:4px">Preparar resumo ›</a></div></div>
      <div class="card row" style="flex-direction:row"><div class="date"><b>15</b><small>NOV</small></div><div class="col grow" style="gap:2px"><span class="b" style="font-size:16px">Exame de sangue (glicemia)</span><span class="small">08:00 · jejum de 8 h</span></div></div>
      <div class="card warn row" style="flex-direction:row"><div class="date warn"><b>28</b><small>NOV</small></div><div class="col grow" style="gap:2px"><span class="b" style="font-size:16px">Vacina [nome] · reforço</span><span style="font-size:13px;color:#5A3A22">Criado automaticamente pela tela Vacinas</span></div></div>
    </div>`
  },

  medir: () => `
    <div class="page">
      <div class="top"><h1>Respiração</h1><a href="#/como-medir" class="btn soft sm press">${ic('help', '#1976D2', 16)}Como medir?</a></div>
      <div class="stats3">
        <div class="stat"><b id="count">0</b><span>respirações</span></div>
        <div class="stat"><b id="left">${state.dur}s</b><span>restantes</span></div>
        <div class="stat seg"><button data-act="dur" data-v="30" class="${state.dur === 30 ? 'on' : ''}">30 s</button><button data-act="dur" data-v="60" class="${state.dur === 60 ? 'on' : ''}">60 s</button></div>
      </div>
      <div class="rings" id="rings">
        <span class="ring r1"></span><span class="ring r2"></span>
        <button class="heart" data-act="tap" aria-label="Contar respiração">${heartFill(72)}</button>
      </div>
      <p class="hint" id="hint">Com o Mike dormindo, toque no coração para começar</p>
      <div id="below">${statsBlock()}</div>
    </div>`,

  'como-medir': () => `
    <div class="page">
      ${back('medir', 'Respiração')}
      <h1 class="sub">Como medir</h1>
      <div class="card"><span class="b" style="font-size:16px">Por que medir?</span><span style="font-size:15px;color:#33424F;line-height:1.4">No sopro cardíaco, o coração pode começar a falhar e acumular líquido no pulmão. A respiração em repouso sobe antes dos outros sinais, então é o melhor aviso precoce.</span></div>
      <div class="card" style="gap:8px"><span class="b" style="font-size:16px">Passo a passo</span>
        <span style="font-size:15px;color:#33424F;line-height:1.4"><b style="color:var(--blue-700)">1.</b> Espere o Mike estar dormindo ou bem calmo (nunca logo após brincar).</span>
        <span style="font-size:15px;color:#33424F;line-height:1.4"><b style="color:var(--blue-700)">2.</b> Observe o peito: subir + descer = 1 respiração.</span>
        <span style="font-size:15px;color:#33424F;line-height:1.4"><b style="color:var(--blue-700)">3.</b> Toque no coração a cada respiração até o tempo acabar.</span>
      </div>
      <div class="ranges">
        <div style="background:var(--green-bg);color:var(--green-ink)"><b>até 27</b>normal</div>
        <div style="background:var(--orange-bg);color:var(--orange-ink)"><b>28–30</b>atenção</div>
        <div style="background:var(--red-bg);color:var(--red-ink)"><b>acima 30</b>risco</div>
      </div>
      <div class="card"><span class="b" style="font-size:16px">Com que frequência?</span><span style="font-size:15px;color:#33424F;line-height:1.4">Ao começar ou trocar um remédio: <b>todo dia por 10 dias</b> (o app lembra). Depois, conforme o veterinário orientar.</span></div>
      <span class="small" style="font-size:12px">Limites e frequência ajustáveis em Mais › Ajustes, conforme o veterinário.</span>
    </div>`,

  diario: () => {
    const C = { g: ['var(--green-bg)', 'var(--green)'], o: ['var(--orange-bg)', 'var(--orange)'], r: ['var(--red-bg)', 'var(--red)'], b: ['var(--blue-50)', 'var(--blue-700)'] }
    const items = [
      ['g', 'Respiração 24 rpm', 'Dormindo · normal', 'hoje'],
      ['b', 'Remédio dado', '[Remédio 1] · 08:00', 'hoje'],
      ['r', 'Respiração 33 rpm', 'Acima do limite · recontado: 27', '18/10'],
      ['o', 'Vômito', 'Leve · após comer rápido', '12/10'],
      ['b', 'Troca de remédio', '[Remédio A] → [Remédio B]', '08/10'],
      ['o', 'Recusou comida', 'Jantar · comeu de manhã', '05/10'],
    ]
    return `
    <div class="page">
      <div class="top"><h1>Diário</h1><a href="#/intercorrencia" class="iconbtn care press" aria-label="Registrar intercorrência">${ic('plus', '#0B1B2B')}</a></div>
      <div class="stats3">
        ${[['Último vômito', '12 dias'], ['Sem comer', '19 dias'], ['Fezes moles', '45 dias']].map(([a, b]) => `<div class="card" style="padding:12px;gap:2px"><span class="small" style="font-size:12px;font-weight:600">${a}</span><span class="b" style="font-size:17px">${b}</span></div>`).join('')}
      </div>
      <span class="label">Linha do tempo</span>
      <div class="list">${items.map(([c, t, s, d]) => `
        <div class="row"><span class="tile" style="width:36px;height:36px;background:${C[c][0]}"><span class="dot" style="background:${C[c][1]}"></span></span>
        <div class="col grow"><span class="b" style="font-size:15px">${t}</span><span class="small">${s}</span></div><span class="small" style="font-size:12px;font-weight:600">${d}</span></div>`).join('')}
      </div>
    </div>`
  },

  mais: () => `
    <div class="page">
      <h1>Mais</h1>
      <a href="#/prontuario" class="profile press"><span class="avatar" style="width:52px;height:52px;font-size:22px;box-shadow:none">M</span><span class="col grow"><span class="b" style="font-size:18px">Mike</span><span style="font-size:13px;opacity:.9">Perfil e prontuário completo</span></span><span style="font-size:22px;font-weight:700">›</span></a>
      <div class="grid2">
        ${[['remedios', 'pill', 'Remédios', '2 em uso'], ['exames', 'chart', 'Exames', 'Laudos e comparativos'], ['vacinas', 'syringe', 'Vacinas', '1 reforço próximo', 1], ['intercorrencia', 'alert', 'Intercorrências', 'Registrar ocorrência', 1], ['prontuario', 'doc', 'Prontuário', 'Resumo para o vet'], ['diario', 'clock', 'Diário', 'Linha do tempo']].map(([h, i, t, s, warn]) =>
          `<a href="#/${h}" class="gcard press"><span class="tile${warn ? ' warn' : ''}">${ic(i, warn ? '#E06A1B' : '#1976D2')}</span><span class="col"><span class="b" style="font-size:16px">${t}</span><span class="small" style="font-size:12px">${s}</span></span></a>`).join('')}
      </div>
      <span class="label">Ajustes</span>
      <div class="list">
        <div class="kv"><span>Limite de respiração</span><span class="small" style="font-size:15px">30 rpm ›</span></div>
        <div class="kv"><span>Google Agenda</span><span class="b" style="color:var(--green)">Conectado</span></div>
        <div class="kv"><span>Backup e família</span><span class="small" style="font-size:15px">›</span></div>
      </div>
      <span class="small" style="text-align:center;font-size:12px">Protótipo · versão ${VERSION === '__' + 'V__' ? 'local' : VERSION}</span>
    </div>`,

  prontuario: () => `
    <div class="page">
      ${back('mais', 'Mais')}
      <h1 class="sub">Prontuário</h1>
      <div class="chips"><span class="chip on">Desde a última consulta · 38 dias</span><span class="chip">Completo</span></div>
      <div class="card row" style="flex-direction:row"><span class="avatar sm">M</span><span class="col"><span class="b" style="font-size:16px">Mike · Yorkshire · 13 anos</span><span class="small">3,2 kg (−0,1 kg em 30 dias) · Alergias: [nenhuma]</span></span></div>
      <div class="card risk"><span class="cap">CONDIÇÕES DE SAÚDE</span><span style="font-size:15px;color:#4A1010"><b>Sopro cardíaco</b> · grau [X] · eco em [data]: [resultado]</span><span style="font-size:15px;color:#4A1010"><b>[Condição 2]</b> · [status]</span></div>
      <div class="card"><span class="cap" style="color:var(--blue-700)">NO PERÍODO</span>
        <div class="kv"><span>Respiração média</span><b style="color:var(--green)">24 rpm</b></div>
        <div class="kv"><span>Alertas acima de 30</span><b style="color:var(--red)">1 · 18/10</b></div>
        <div class="kv"><span>Vômitos</span><b style="color:#E06A1B">2 · último 12/10</b></div>
        <div class="kv"><span>Recusou comida</span><b style="color:#E06A1B">1 · 05/10</b></div>
        <div class="kv"><span>Glicemia</span><b style="color:var(--green)">[valor] ▼ melhorou</b></div>
        <div class="kv"><span>Troca de remédio</span><b>[A] → [B] · 08/10</b></div>
      </div>
      <div class="card warn"><span class="cap">PERGUNTAS PARA O VETERINÁRIO</span><span style="font-size:15px;color:#5A3A22">○ [Pergunta 1]</span><span style="font-size:15px;color:#5A3A22">○ [Pergunta 2]</span></div>
      <div class="grid2" style="gap:10px"><button class="btn outline press" data-act="copy">Copiar texto</button><button class="btn primary press" data-act="soon">Gerar PDF</button></div>
    </div>`,

  exames: () => `
    <div class="page">
      ${back('mais', 'Mais')}
      <div class="top"><h1 class="sub">Exames</h1><button class="btn primary sm press" data-act="soon">+ Laudo</button></div>
      <div class="chips"><span class="chip on">Glicemia</span><span class="chip">Creatinina</span><span class="chip">Peso</span><span class="chip">Respiração</span></div>
      <div class="card big" style="gap:10px;box-shadow:none">
        <div class="top" style="align-items:flex-start"><span class="col"><span class="small" style="font-weight:600">Glicemia · último exame</span><span style="font-size:30px;font-weight:800;color:var(--blue-900)">[valor] <span class="small" style="font-size:14px">mg/dL</span></span></span><span class="pill ok">▼ Melhorou</span></div>
        <svg viewBox="0 0 326 150" style="width:100%;height:auto" role="img" aria-label="Glicemia em 4 exames, caindo após a troca de remédio">
          <rect x="0" y="40" width="326" height="60" rx="8" fill="#E3F4E5"/><text x="6" y="54" font-size="10" fill="#1B5E20">faixa de referência</text>
          <line x1="190" y1="8" x2="190" y2="132" stroke="#FF8A3D" stroke-width="2" stroke-dasharray="4 4"/><text x="196" y="18" font-size="10" fill="#7A3300" font-weight="700">troca de remédio</text>
          <polyline points="20,22 110,30 190,34 300,70" fill="none" stroke="#1976D2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="20" cy="22" r="5" fill="#1976D2"/><circle cx="110" cy="30" r="5" fill="#1976D2"/><circle cx="190" cy="34" r="5" fill="#1976D2"/><circle cx="300" cy="70" r="6" fill="#2E7D32"/>
          <text x="4" y="146" font-size="10" fill="#5B6B7B">mar</text><text x="98" y="146" font-size="10" fill="#5B6B7B">mai</text><text x="180" y="146" font-size="10" fill="#5B6B7B">ago</text><text x="290" y="146" font-size="10" fill="#5B6B7B">out</text>
        </svg>
        <span class="small">Depois da troca para [Remédio B], o valor voltou para perto da faixa de referência.</span>
      </div>
      <span class="label">Laudos</span>
      <div class="list">
        <div class="row"><span class="tile" style="width:36px;height:36px;font-size:11px;font-weight:800;color:var(--blue-700)">PDF</span><span class="col grow"><span class="b" style="font-size:15px">Hemograma + bioquímica</span><span class="small">10/10 · [Laboratório]</span></span><span class="dot" style="background:var(--green)"></span></div>
        <div class="row"><span class="tile" style="width:36px;height:36px;font-size:11px;font-weight:800;color:var(--blue-700)">PDF</span><span class="col grow"><span class="b" style="font-size:15px">Ecocardiograma</span><span class="small">22/08 · sopro grau [X]</span></span><span class="dot" style="background:var(--orange)"></span></div>
      </div>
    </div>`,

  remedios: () => `
    <div class="page">
      ${back('mais', 'Mais')}
      <div class="top"><h1 class="sub">Remédios</h1><button class="btn primary sm press" data-act="soon">+ Remédio</button></div>
      <span class="label">Hoje</span>
      ${[['[Remédio 1]', '1 comprimido · 08:00'], ['[Remédio 2]', '½ comprimido · 20:00']].map(([n, s], i) => {
        const on = state.given[i]
        return `<div class="card row" style="flex-direction:row"><span class="tile" style="width:44px;height:44px;border-radius:14px">${ic('pill', '#1976D2')}</span><span class="col grow"><span class="b" style="font-size:16px">${n}</span><span class="small">${s}</span></span><button class="btn sm press" data-act="give" data-i="${i}" style="background:${on ? 'var(--green-bg)' : 'var(--blue-700)'};color:${on ? 'var(--green-ink)' : '#FFFFFF'}">${on ? '✓ Dado' : 'Dar agora'}</button></div>`
      }).join('')}
      <span class="label">Histórico de trocas</span>
      <div class="card" style="gap:10px">
        <div class="row" style="align-items:flex-start"><span class="dot" style="margin-top:5px;background:var(--orange)"></span><span class="col"><span class="b" style="font-size:15px">08/10 · [Remédio A] → [Remédio B]</span><span class="small">Motivo: [motivo da troca]</span><a href="#/exames" class="b" style="font-size:13px;margin-top:2px">Ver efeito nos exames ›</a></span></div>
        <div class="row" style="align-items:flex-start"><span class="dot" style="margin-top:5px;background:var(--green)"></span><span class="col"><span class="b" style="font-size:15px">Depois da troca</span><span style="font-size:13px;color:var(--green-ink)">Vômitos: 3 → 1 por mês · glicemia melhorou</span></span></div>
      </div>
    </div>`,

  vacinas: () => {
    const S = { ok: ['var(--green-bg)', 'var(--green)', 'check', 'Em dia'], soon: ['var(--orange-bg)', '#E06A1B', 'clock', 'Vence em breve'], late: ['var(--red-bg)', 'var(--red)', 'alert', 'Atrasada'] }
    const list = [['[Vacina V10]', 'Aplicada 12/03 · lote [nº] · [Vet]', 'ok'], ['[Antirrábica]', 'Aplicada 12/03 · lote [nº]', 'ok'], ['[Vacina X]', 'Aplicada 28/11/25 · reforço 28/11', 'soon'], ['[Vacina Y]', 'Venceu 10/09', 'late']]
    return `
    <div class="page">
      ${back('mais', 'Mais')}
      <div class="top"><h1 class="sub">Vacinas</h1><button class="btn primary sm press" data-act="soon">+ Vacina</button></div>
      <div class="card warn" style="border-radius:22px;padding:16px;gap:8px"><span class="cap">PRÓXIMA DOSE</span><span style="font-size:20px;font-weight:800;color:#4A1F00">[Vacina] · reforço anual</span><span style="font-size:14px;color:#5A3A22">28/11 · faltam 35 dias · lembrete na Agenda</span></div>
      <span class="label">Aplicadas</span>
      <div class="list">${list.map(([n, s, k]) => `<div class="row"><span class="tile" style="width:36px;height:36px;background:${S[k][0]}">${ic(S[k][2], S[k][1], 18)}</span><span class="col grow"><span class="b" style="font-size:15px">${n}</span><span class="small">${s}</span></span><span class="b" style="font-size:12px;color:${S[k][1]}">${S[k][3]}</span></div>`).join('')}</div>
    </div>`
  },

  intercorrencia: () => {
    const types = ['Vômito', 'Não comeu', 'Fezes moles', 'Dor', 'Tosse', 'Engasgo', 'Cansaço', 'Respiração alta', 'Outro']
    const lv = [['Leve', 'var(--green-bg)', 'var(--green-ink)', 'var(--green)'], ['Moderada', 'var(--orange-bg)', 'var(--orange-ink)', '#E06A1B'], ['Grave', 'var(--red-bg)', 'var(--red-ink)', 'var(--red)']]
    return `
    <div class="page">
      ${back('inicio', 'Cancelar')}
      <h1 class="sub">O que aconteceu?</h1>
      <p class="lead" style="font-size:14px">Agora · ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} · toque para alterar</p>
      <div class="types">${types.map((t, i) => `<button class="type press${i === state.type ? ' on' : ''}" data-act="type" data-i="${i}">${t}</button>`).join('')}</div>
      <span class="label">Intensidade</span>
      <div class="levels">${lv.map(([n, bg, fg, strong], i) => `<button class="press" data-act="level" data-i="${i}" style="background:${i === state.level ? strong : bg};color:${i === state.level ? '#FFFFFF' : fg}">${n}</button>`).join('')}</div>
      <label class="label" for="obs">Observação</label>
      <textarea id="obs" placeholder="Ex.: vomitou logo depois de comer, ficou quieto"></textarea>
      <div class="grid2" style="gap:10px"><button class="btn soft press" data-act="soon">+ Foto</button><button class="btn soft press" data-act="soon">+ Vídeo</button></div>
      <button class="btn care press" data-act="save">Salvar no diário</button>
    </div>`
  },
}

// ---------- Estado de exemplo ----------

const state = { day: 1, dur: 30, given: [true, false], type: 0, level: 0 }

function todayLabel() {
  const s = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function weekDays() {
  const d0 = new Date()
  d0.setDate(d0.getDate() - 1)
  const W = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
  const list = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(d0)
    d.setDate(d0.getDate() + i)
    list.push({ w: W[d.getDay()], n: String(d.getDate()).padStart(2, '0'), dot: i === 3 ? '#1976D2' : i === 5 ? '#FF8A3D' : '' })
  }
  const month = d => d.toLocaleDateString('pt-BR', { month: 'long' })
  const last = new Date(d0); last.setDate(d0.getDate() + 6)
  const a = month(d0), b = month(last)
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1)
  return { list, title: a === b ? cap(a) : `${cap(a)} – ${cap(b)}` }
}

// ---------- Contador de respiração ----------

const timer = { id: 0, running: false, count: 0, left: 0 }

function stopTimer() {
  clearInterval(timer.id)
  timer.running = false
}

function statsBlock() {
  return `<div class="stats3">
    <div class="stat mini"><span style="font-size:11px;font-weight:700">MÍN · 7 DIAS</span><b style="color:var(--green)">21</b></div>
    <div class="stat mini"><span style="font-size:11px;font-weight:700">MÉDIA</span><b>24</b></div>
    <div class="stat mini"><span style="font-size:11px;font-weight:700">MÁX</span><b style="color:#E06A1B">29</b></div>
  </div>`
}

function startTimer() {
  timer.running = true
  timer.count = 1
  timer.left = state.dur
  document.getElementById('rings').classList.add('live')
  document.getElementById('hint').textContent = 'Toque a cada respiração completa'
  document.getElementById('below').innerHTML = statsBlock()
  paintTimer()
  timer.id = setInterval(() => {
    timer.left -= 1
    paintTimer()
    if (timer.left <= 0) finishTimer()
  }, 1000)
}

function paintTimer() {
  document.getElementById('count').textContent = timer.count
  document.getElementById('left').textContent = `${timer.left}s`
}

function finishTimer() {
  stopTimer()
  const rpm = Math.round(timer.count * 60 / state.dur)
  const [bg, fg, msg] = rpm > 30
    ? ['var(--red-bg)', 'var(--red-ink)', 'Acima de 30 · reconte em 5 min; se repetir, ligue para o veterinário']
    : rpm >= 28
      ? ['var(--orange-bg)', 'var(--orange-ink)', 'Perto do limite · conte de novo mais tarde']
      : ['var(--green-bg)', 'var(--green-ink)', 'Normal · salvo no histórico']
  document.getElementById('rings').classList.remove('live')
  document.getElementById('hint').textContent = 'Toque no coração para contar de novo'
  document.getElementById('below').innerHTML = `<div class="result in" style="background:${bg};color:${fg}"><b>${rpm} rpm</b><span style="font-size:13px;font-weight:600">${msg}</span></div>`
  if (navigator.vibrate) navigator.vibrate(80)
}

// ---------- Ações ----------

const ACTIONS = {
  tap() {
    if (!timer.running) return startTimer()
    timer.count += 1
    paintTimer()
  },
  dur(el) {
    if (timer.running) return
    state.dur = Number(el.dataset.v)
    render()
  },
  day(el) { state.day = Number(el.dataset.i); render() },
  give(el) { const i = Number(el.dataset.i); state.given[i] = !state.given[i]; render() },
  type(el) { state.type = Number(el.dataset.i); render() },
  level(el) { state.level = Number(el.dataset.i); render() },
  save() { toast('Salvo no diário (exemplo)'); location.hash = '#/diario' },
  copy() { toast('Resumo copiado (exemplo)') },
  soon() { toast('Em breve') },
}

window.addEventListener('hashchange', render)
render()

// Evita zoom com dois dedos no iPhone
document.addEventListener('touchmove', e => { if (e.touches.length > 1) e.preventDefault() }, { passive: false })

// ---------- Atualização automática ----------

// O GitHub Pages deixa o iPhone guardar a página por 10 minutos. Ao abrir ou voltar para o app,
// pergunta ao servidor (sem cache) qual é a versão publicada e, se mudou, abre a nova na hora.
async function checkUpdate() {
  if (VERSION === '__' + 'V__') return   // rodando localmente, sem versão
  if (timer.running) return              // não recarrega no meio de uma contagem
  try {
    const html = await (await fetch(`./?check=${Date.now()}`, { cache: 'no-store' })).text()
    const latest = html.match(/app\.js\?v=(\w+)/)?.[1]
    if (latest && latest !== VERSION) {
      try { sessionStorage.setItem('updated', '1') } catch {}
      location.replace(`./?v=${latest}${location.hash}`)
    }
  } catch {
    // sem internet: segue com a versão atual
  }
}

checkUpdate()
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') checkUpdate()
})
try {
  if (sessionStorage.getItem('updated')) { sessionStorage.removeItem('updated'); setTimeout(() => toast('App atualizado'), 600) }
} catch {}
