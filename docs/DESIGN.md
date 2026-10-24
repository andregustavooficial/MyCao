# MyCão — Diretrizes de design (rascunho)

- **Tipografia:** SF Pro (fonte do sistema iOS) — `-apple-system, "SF Pro Text", "SF Pro Display", system-ui`.
- **Tom visual:** aplicativo médico, confiável e limpo, mas com personalidade (cantos arredondados, cabeçalho azul, ícones simples).
- **Cores:** azul (`docs/PALETA.md`) como base; **laranja #FF8A3D** para pontos de atenção e botão de ação principal (registrar intercorrência).
- **Botões:** grandes (mín. 44px de toque), feedback de pressão `scale(0.97)` em 160ms `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Movimento** (princípios Emil Kowalski): animações curtas (<300ms), entrada com `ease-out`, cartões entram em cascata (40ms), respeitar `prefers-reduced-motion`.
- **Tela de Início:** cabeçalho com o Mike → card de respiração (último valor + mini gráfico + botão contar) → ponto de atenção (laranja) → atalhos (Remédios, Agenda, Exames, Prontuário) → hoje (remédios e próxima consulta) → botão "Registrar intercorrência".
