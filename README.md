# Projeto: Porteiro Digital (v2.0 - Evolução do EncomendasSmart)

**Disciplina:** DevOps Tools e Gerência de Configurações e Dependências  
**Instituição:** UNINASSAU  
**Equipe:**  
* Alex Teixeira de Jesus  
* Thales Macêdo de Jesus Araújo  
* Enoque Pereira Santos Neto  
* José Heitor Batista dos Santos  

---

## 1. Descrição do projeto

O Porteiro Digital é a evolução direta (versão 2.0) do projeto inicial **EncomendasSmart**. Enquanto a primeira versão focava primariamente no gerenciamento e controle de correspondências, esta nova iteração expande significativamente o escopo para se tornar uma plataforma completa de gestão de condomínios. 

O sistema agora possui roteamento avançado e suporte para perfis de acesso distintos, segmentando as visões entre **Porteiro** e **Morador**. O morador possui acesso focado na conveniência, podendo gerenciar e registrar agendamentos de espaços comuns (como Churrasqueira, Salão de Festas, Salão de Jogos e Academia). Já o perfil da portaria conta com ferramentas administrativas para organizar as reservas, realizar o controle de chaves e visualizar estatísticas e históricos operacionais através de um dashboard interativo.

## 2. Objetivo da solução

O objetivo central do Porteiro Digital é elevar a digitalização iniciada no EncomendasSmart para abranger toda a comunicação, logística e uso de espaços físicos do condomínio. A solução foi desenhada para modernizar de vez a portaria, substituindo cadernos físicos e processos manuais fragmentados por um controle digital unificado, rápido e seguro, garantindo rastreabilidade total para funcionários e moradores.

## 3. Tecnologias utilizadas

As seguintes ferramentas e tecnologias foram aplicadas na construção e evolução deste projeto:
* **Frontend/Framework:** Angular CLI (versão 19.2.0 ou superior), HTML, CSS, TypeScript, JavaScript
* **Visualização Gráfica:** Chart.js (para painéis e dashboards)
* **Controle de versão:** Git e GitHub
* **Integração e Entrega Contínua (CI/CD):** GitHub Actions e Docker
* **Gerenciamento do Projeto:** Trello / Figma (Prototipagem herdada)

## 4. Estrutura do repositório

O projeto segue a arquitetura modularizada do Angular, estruturada para suportar as novas funcionalidades da v2.0:
* **`/.github/workflows/`:** Contém a esteira de CI/CD (ex: `ci-cd.yaml`) responsável pelo build e geração de imagens Docker.
* **`/src/app/features/auth/`:** Componentes e telas de autenticação (Login/Registro).
* **`/src/app/features/morador/`:** Módulo exclusivo com as telas do condômino (Dashboard pessoal, Meus Agendamentos, Novo Agendamento).
* **`/src/app/features/porteiro/`:** Módulo de uso da portaria (Controle de Chaves, Gestão de Agendamentos, Histórico, Relatórios e Dashboard geral).
* **`/src/app/core/`:** Serviços centrais, validações de segurança (Guards de rotas/perfis) e modelagem de dados (ex: `agendamento.model.ts`, `chave.model.ts`).
* **`/src/app/shared/`:** Componentes reutilizáveis por ambos os perfis (modais, calendários em miniatura, cartões de entrega, sidebar e layout).

## 5. Integração Contínua (CI/CD) - Fluxo de Trabalho e Pipeline

Para garantir a integridade do código nesta nova fase do projeto, a esteira de Integração e Entrega Contínua foi aprimorada no GitHub Actions.

**Explicação do Workflow (`ci-cd.yaml`)**
O arquivo define as regras de automação. O gatilho (trigger) configurado faz com que o pipeline seja executado automaticamente sempre que ocorrer um evento de *push* na branch principal (`main`).

**Fluxo de execução do pipeline**
Ao ser acionado, o runner hospedeiro (Ubuntu) executa sequencialmente:
1. **Checkout:** Baixa o código mais recente do repositório.
2. **Autenticação:** Realiza login seguro no Docker Hub utilizando as credenciais cadastradas nos *Secrets* do GitHub.
3. **Build & Push (Docker):** Constrói a aplicação, empacota em uma imagem de contêiner Docker e realiza o envio (push) para o repositório da imagem (ex: `alextx88/porteirodigital`), aplicando as tags `latest` e `v2.0.0`.

## 6. Linha de Base (Requisitos e Preparação - Versão 2.0.0)

Para garantir que o ambiente de execução local reflita fielmente o estado atual do projeto Porteiro Digital, siga as diretrizes abaixo:

**1. Requisitos de Software**
* **Node.js:** Versão 18.x ou superior.
* **Framework Angular:** Versão ~19.2.0 (Gerenciado localmente via pacote).
* **TypeScript:** Versão ~5.7.2.
* **Gerenciador de Pacotes:** npm (versão 10 ou superior).

**2. Configuração de Permissões (Apenas Windows/PowerShell)**
Se ao tentar rodar `npm install` você receber um erro de segurança (`PSSecurityException`), execute o comando abaixo no terminal executado como Administrador para habilitar a execução de scripts locais:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

# ⚙️ Gerência de Configuração

Este documento detalha as diretrizes, processos e históricos da **Gerência de Configuração** adotados no projeto, garantindo a integridade, rastreabilidade e evolução controlada de todos os artefatos de software.

---

## 📂 8.1 Itens de Configuração do Projeto

Os seguintes elementos compõem os itens de configuração essenciais deste projeto e são controlados estritamente:

* **Código-fonte (`/src`):** Abriga toda a arquitetura de visualização, estilos e regras de negócio desenvolvidas. O controle contínuo previne perdas de progresso, rastreia autoria e organiza ramificações de trabalho em equipe.
* **`Dockerfile`:** Arquivo de receita de infraestrutura de contêiner. Deve ser controlado para garantir a perfeita portabilidade do sistema em qualquer servidor ou máquina de homologação.
* **Workflows do GitHub Actions (`ci-cd.yaml`):** Define os scripts que automatizam a esteira. Controlá-lo é vital para que modificações na infraestrutura de testes e envios de builds passem por auditoria e validação prévia.
* **`deployment.yaml`:** Arquivos manifestos de infraestrutura de deploy. O controle previne divergências entre o estado da aplicação e as definições do cluster de publicação.
* **Dependências (`package.json` e `package-lock.json`):** Registros de bibliotecas acopladas. O controle destes arquivos congela as versões do ecossistema e evita que atualizações externas quebrem a compilação do software.
* **Documentação (`README.md`):** Repositório central de instruções. Precisa ser controlado em sincronia com o código para garantir que novos desenvolvedores operem sob instruções atualizadas.

---

## 📍 8.2 Baseline do Projeto

* **Nome da Baseline:** Entrega da Segunda Unidade
* **Versão Associada:** `v2.0.0`
* **Arquivos integrantes da Baseline:** Código-fonte estruturado (`/src`), `Dockerfile`, configurações de automação de pipeline (`.github/workflows/ci-cd.yaml`), manifesto de deploy (`deployment.yaml`), travas de pacotes (`package.json` e `package-lock.json`) e a documentação (`README.md`).

> 💡 **Critério de Estabilidade:** Esta baseline foi consolidada após a validação completa do fluxo automatizado de integração contínua (CI), onde a compilação foi concluída sem falhas, gerando e enviando com sucesso as imagens integradas estáveis para o Docker Hub com as assinaturas de release esperadas.

---

## 🏷️ 8.3 Estratégia de Versionamento

A equipe utiliza as diretrizes do **Versionamento Semântico (SemVer)**, organizando os lançamentos através do formato `MAJOR.MINOR.PATCH`:

* **`MAJOR`:** Modificações estruturais que causam quebra de compatibilidade em relação a versões anteriores.
* **`MINOR`:** Adição de novas regras de negócio ou telas mantendo compatibilidade retroativa.
* **`PATCH`:** Correções pontuais de segurança ou pequenos bugs visuais.

### 📌 Exemplos Aplicados no Projeto
* **`v1.0.0`** — Entrega final referente aos requisitos da primeira unidade (escopo *EncomendasSmart*).
* **`v2.0.0`** — Entrega final da segunda unidade (Evolução completa para *Porteiro Digital* com gerenciamento modularizado e suporte a Docker/Pipelines).
* **`v2.0.1`** — Ajustes rápidos, como correção de navegação em rotas específicas pós-publicação.

---

## 🔄 8.4 Controle de Mudanças

Histórico de rastreabilidade de evolução de requisitos do projeto (**Transição da 1ª para a 2ª unidade**):

### 🛠️ Mudança 1
* **Descrição:** Modificação no domínio do software e mudança de nome comercial para "Porteiro Digital".
* **Itens Impactados:** Arquivo `README.md`, arquivo `index.html` e `package.json`.
* **Motivo:** Necessidade de expansão de funcionalidades para atender os critérios mais amplos de gestão de condomínio exigidos na unidade atual.
* **Impacto:** Alto (Alteração da identidade visual do projeto e regras de negócio centrais).
* **Status:** ✅ Concluído

### 🛠️ Mudança 2
* **Descrição:** Implementação de esteira automatizada de CI/CD integrada à plataforma Docker Hub.
* **Itens Impactados:** Criação e configuração do diretório `.github/workflows/ci-cd.yaml` e do arquivo `Dockerfile` na raiz do sistema.
* **Motivo:** Substituição de processos manuais de empacotamento e entrega por esteiras ágeis e automatizadas seguindo os padrões modernos de DevOps.
* **Impacto:** Médio (Reestruturação das rotinas de infraestrutura de implantação, sem afetar o código local).
* **Status:** ✅ Concluído

### 🛠️ Mudança 3
* **Descrição:** Criação de segregação de views e rotas baseadas em níveis de controle ("Porteiro" e "Morador").
* **Itens Impactados:** Configuração de rotas gerais (`app.routes.ts`) e inserção de componentes de segurança guardas de perfil (`auth.guard.ts` e `role.guard.ts`).
* **Motivo:** Restringir o acesso a dashboards e telas de controle administrativo (chaves e relatórios) apenas a colaboradores autorizados, blindando dados sensíveis.
* **Impacto:** Alto (Refatoração de rotas e segurança de dados do frontend).
* **Status:** ✅ Concluído

---

## 📝 8.5 Solicitação de Mudança (Fictícia)

| Atributo | Detalhes da Solicitação |
| :--- | :--- |
| **Título da Mudança** | Integração de API de Câmeras de Segurança. |
| **Descrição** | Adicionar um componente de player de vídeo no dashboard do Porteiro para exibir o feed das câmeras da portaria em tempo real. |
| **Motivo** | Aumentar a utilidade do sistema, permitindo que o porteiro verifique visualmente os visitantes sem precisar alternar entre sistemas no computador. |
| **Itens de Configuração Impactados** | `/src/app/features/porteiro/dashboard/`, `package.json` (adição de biblioteca de streaming RTSP/HLS). |
| **Impacto Técnico** | Médio a Alto. Exigirá ajustes de layout no dashboard, aumento no consumo de banda de rede da aplicação e manipulação de credenciais seguras do DVR do condomínio. |
| **Riscos Envolvidos** | Possível lentidão na interface do dashboard devido ao consumo de vídeo; risco de vazamento de credenciais de vídeo no frontend. |
| **Prioridade** | Média |
| **Necessidade de Testes** | Sim. Testes de carga (para avaliar travamentos no navegador) e testes de segurança das rotas das câmeras. |
| **Decisão** | ⏳ **Em análise** (Aprovada conceitualmente para a milestone `v2.1.0`, pendente alinhamento com a infraestrutura local do condomínio). |

---

## 🔍 8.6 Auditoria de Configuração

Resultado do processo de auditoria interna executado sobre o estado consolidado da baseline `v2.0.0`:

| Item Verificado | Conforme? | Observação |
| :--- | :---: | :--- |
| **README atualizado** | Sim | Documentação reflete o escopo v2.0 e detalha execução. |
| **Dockerfile presente** | Sim | Localizado na raiz do repositório. |
| **deployment.yaml presente** | Sim | Criado para as rotinas de provisionamento de infraestrutura. |
| **Imagem Docker versionada** | Sim | Imagem empacotada mapeada com tag estável v2.0.0 e enviada ao registry. |
| **Baseline definida** | Sim | Firmada e congelada na versão de entrega v2.0.0. |
| **Mudanças registradas** | Sim | Transições detalhadas na documentação de controle de configuração. |

---

## 📦 8.7 Gerência de Dependências

### Quais dependências o projeto utiliza?
O ecossistema utiliza como framework estrutural o **Angular Core/Common (^19.2.0)**, o pacote **TypeScript (~5.7.2)**, bibliotecas de suporte a eventos assíncronos como **rxjs** e a biblioteca gráfica **chart.js (^4.4.0)** para a montagem de dashboards informativos. No nível de infraestrutura, utiliza imagens base Linux declaradas no arquivo Docker.

### Onde essas dependências estão registradas?
Todas estão mapeadas de forma descritiva no manifesto principal `package.json`, possuindo suas assinaturas exatas e árvores de sub-dependências rigidamente gravadas no arquivo `package-lock.json`.

### Qual risco existe se uma dependência for atualizada sem teste?
A atualização cega de dependências traz sérios riscos de introdução de incompatibilidades de sintaxe (*breaking changes*), quebras em funções depreciadas de roteamento do Angular ou comportamentos inesperados em elementos gráficos. Isso pode fazer com que o pipeline automatizado falhe e impeça a geração da build em produção.

### Como a equipe controlaria a atualização dessas dependências?
A equipe adota o congelamento das versões via `package-lock.json`. Qualquer proposta de atualização deve ocorrer de forma isolada em uma branch dedicada de testes (ex: `feature/update-angular`). Essa branch disparará o workflow de CI no GitHub Actions para verificar se o código compila sem erros, necessitando obrigatoriamente de validação local antes de receber permissão de Pull Request para a branch estável principal (`main`).