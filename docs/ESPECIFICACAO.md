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
| 10 | **Prontuário / Resumo para consulta** | Ficha sempre atualizada automaticamente (ver detalhes abaixo) | Todas |

## Prontuário / Resumo para consulta
Um "prontuário" do Mike, montado **automaticamente** a partir dos dados das outras telas, para levar ao veterinário e não esquecer nada.

- **Identificação:** nome, raça, idade, peso atual (e variação recente), castrado, microchip, alergias.
- **Condições de saúde:** cada condição com status/grau atual e data da última avaliação.
  Ex.: *Sopro cardíaco — grau X — último ecocardiograma em DD/MM: resultado Y*.
- **Pontos principais de atenção:** lista em destaque (manual + alertas automáticos, ex.: frequência respiratória subindo, exame fora da referência).
- **Medicamentos em uso:** dose, horário, desde quando; trocas recentes e motivo.
- **Últimos exames:** valores principais com tendência (↑ melhora / ↓ piora) em relação ao exame anterior.
- **Vacinas:** últimas aplicadas e próximas pendentes.
- **Desde a última consulta:** o que mudou (sintomas registrados no diário, médias de frequência respiratória, novos exames, trocas de remédio).
- **Perguntas para o veterinário:** lista de anotações que vou juntando antes da consulta; marcar como respondida e registrar a resposta.
- **Compartilhar:** gerar PDF / link / mostrar em tela cheia na consulta.
- Ao marcar uma consulta na Agenda, o app sugere abrir o resumo antes do horário.

## Decisões em aberto
- Plataforma: Android, iOS, ambos ou web/PWA?
- Só o Mike ou suporte a vários pets?
- Dados só no celular ou na nuvem (backup / compartilhar com família ou vet)?
- Lista de problemas de saúde do Mike (vai definir alertas e indicadores padrão).

## Intercorrências (registro de ocorrências fora do normal)
Registro rápido de coisas que não acontecem sempre, mas que o veterinário pergunta ("quando foi a última vez que vomitou?").

- **Registro rápido:** 2–3 toques, com data/hora automática (editável).
- **Tipos pré-definidos** (lista editável): vômito, recusou comida, fezes moles/diarreia, sangue nas fezes/urina, dor, tosse, engasgo/espirro reverso, cansaço/fraqueza, desmaio, convulsão, falta de ar, frequência respiratória/cardíaca acima do normal, outro.
- **Detalhes opcionais:** intensidade (leve/moderada/grave), duração, descrição, foto/vídeo, possível causa.
- **Automático:** quando uma contagem de frequência fica acima do limite definido, o app cria a intercorrência sozinho (com o valor medido), além de manter a contagem no histórico normal.
- **"Última vez que…":** para cada tipo, mostra a data da última ocorrência e quantas vezes aconteceu no período (7, 30, 90 dias).
- **Conecta com:** Linha do tempo, Prontuário (seção "Desde a última consulta"), Medicamentos (ver se aumentou/diminuiu após troca), Painel (alerta).
