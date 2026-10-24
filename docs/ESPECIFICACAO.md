# MyCão — Especificação funcional (rascunho v0)

App de monitoramento de saúde do **Mike** (Yorkshire, 13 anos).
Fase atual: **app cru** — definir telas e funcionalidades. Design, logo e tipografia vêm depois.

## Princípio central: tudo conectado
Todo registro (medição, exame, vacina, remédio, consulta, sintoma) é um **evento na linha do tempo** do Mike.
Assim qualquer tela pode cruzar dados com outra — ex.: "a glicemia melhorou depois da troca de remédio?".

## Telas (v0)

| # | Tela | Funcionalidades principais | Conecta com |
|---|------|---------------------------|-------------|
| 1 | **Início / Painel** | Resumo do dia, próximos compromissos, remédios do dia, última frequência respiratória, alertas | Todas |
| 2 | **Perfil do Mike** | Dados básicos, peso, condições de saúde (lista a definir), alergias, veterinários | Todas |
| 3 | **Frequência respiratória** | Contador por toque (cronômetro 30s/60s → rpm), histórico, gráfico, alerta acima do limite definido pelo veterinário, anotação (dormindo/repouso) | Medicamentos, Painel, Linha do tempo |
| 4 | **Agenda** | Consultas, exames, retornos, banho/tosa; lembretes; sincronização com Google Agenda | Exames, Vacinas, Medicamentos |
| 5 | **Vacinas** | Histórico de vacinas, lote, veterinário, data da próxima dose → gera lembrete na agenda | Agenda |
| 6 | **Exames e laudos** | Cadastro de exame, anexo do laudo (PDF/foto), valores por indicador (ex.: glicemia), faixa de referência | Comparativos, Agenda |
| 7 | **Comparativos / Evolução** | Gráfico de um indicador ao longo do tempo, com marcações de início/troca de medicamento | Exames, Medicamentos, Freq. respiratória |
| 8 | **Medicamentos** | Remédios atuais e passados, dose, horários, início/fim, motivo da troca; lembretes de dose | Agenda, Comparativos |
| 9 | **Linha do tempo / Diário** | Tudo em ordem cronológica + anotações livres (sintomas, apetite, tosse etc.) | Todas |

## Decisões em aberto
- Plataforma: Android, iOS, ambos ou web/PWA?
- Só o Mike ou suporte a vários pets?
- Dados só no celular ou na nuvem (backup / compartilhar com família ou vet)?
- Lista de problemas de saúde do Mike (vai definir alertas e indicadores padrão).
