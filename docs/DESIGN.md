# MyCão — Diretrizes de design (rascunho)

- **Tipografia:** SF Pro (fonte do sistema iOS) — `-apple-system, "SF Pro Text", "SF Pro Display", system-ui`.
- **Tom visual:** aplicativo médico, confiável e limpo, mas com personalidade (cantos arredondados, cabeçalho azul, ícones simples).
- **Cores:** azul (`docs/PALETA.md`) como base; **laranja #FF8A3D** para pontos de atenção e botão de ação principal (registrar intercorrência).
- **Botões:** grandes (mín. 44px de toque), feedback de pressão `scale(0.97)` em 160ms `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Movimento** (princípios Emil Kowalski): animações curtas (<300ms), entrada com `ease-out`, cartões entram em cascata (40ms), respeitar `prefers-reduced-motion`.
- **Tela de Início:** cabeçalho com o Mike → card de respiração (último valor + mini gráfico + botão contar) → ponto de atenção (laranja) → atalhos (Remédios, Agenda, Exames, Prontuário) → hoje (remédios e próxima consulta) → botão "Registrar intercorrência".

## Regras definidas (v1)
- **Azul** = cor principal (variações de azul em cabeçalhos, cards de destaque, seleção).
- **Botões e ícones:** mistura moderada de azul e laranja conforme o contexto (laranja = ação de cuidado/registro).
- **Ícones arredondados** (traço com pontas arredondadas, dentro de quadrados arredondados).
- **Cards:** retângulos/quadrados com cantos bem arredondados (18–22px).
- **Barra inferior (5 abas), flutuante:** cápsula azul-escura (#0D47A1) com cantos arredondados e sombra; a aba ativa se expande numa pílula clara (#E3F2FD) com ícone + nome em laranja escuro (#C2410C); as outras mostram só o ícone. Abas: Início · Agenda · Medir · Diário · Mais. A aba **Mais** dá acesso às demais telas (Perfil/Prontuário, Remédios, Exames, Vacinas, Intercorrências, Ajustes).
- **Cores de status:**
  - **Verde** — positivo, normal, melhora, gráficos favoráveis.
  - **Laranja** — atenção, cuidado, informação importante.
  - **Vermelho** — risco, atenção redobrada (ex.: respiração acima de 30 rpm).

## Protótipo
Telas de exemplo no Artifact: https://claude.ai/artifact/T7u9G49DdsJtcHZNi5DeRv
