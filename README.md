# Automação de Testes E2E Utilizando Playwright MCP - Sauce Demo Checkout 

Este repositório contém a automação de testes End-to-End (E2E) para o fluxo de checkout da aplicação [Sauce Demo](https://www.saucedemo.com), baseada na user story **SCRUM-101**.

## 🚀 Tecnologias Utilizadas

* **Linguagem:** TypeScript
* **Framework de Testes:** [Playwright](https://playwright.dev/)
* **Padrão de Projeto:** Page Object Model (POM)
* **Relatórios:** Allure Report ou Playwright HTML Report

## 📋 Cenários de Teste (User Story: SCRUM-101)

A suíte de testes cobre o processo completo de checkout, validando os seguintes critérios de aceite:

- **AC1 - Revisão do Carrinho:** Validação de itens, preços e quantidades.
- **AC2 - Informações de Checkout:** Validação de campos obrigatórios e mensagens de erro.
- **AC3 - Resumo do Pedido:** Conferência de impostos e valor total (Subtotal + Tax).
- **AC4 - Finalização:** Validação da mensagem de sucesso e limpeza do carrinho.
- **AC5 - Tratamento de Erros:** Validação de inputs inválidos e bloqueio de navegação.

## 📁 Estrutura do Projeto

```text
├── tests/
│   └── checkout.spec.ts      # Scripts de teste estruturados
├── pages/                    # Page Object Model
│   ├── LoginPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── ...
├── playwright.config.ts      # Configurações do framework (Browsers, timeouts, etc)
└── package.json              # Dependências e scripts
```

## 🛠️ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (v16 ou superior)
* [Git](https://git-scm.com/)

## 🔧 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/eduardorodri/Playwright_Mcp_Automation_Test
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Instale os browsers do Playwright:
   ```bash
   npx playwright install
   ```

## 🏃 Executando os Testes

Executar todos os testes em modo headless:
```bash
npx playwright test
```

Executar testes em um browser específico (ex: Chrome):
```bash
npx playwright test --project="chromium"
```

Abrir a interface visual do Playwright (UI Mode):
```bash
npx playwright test --ui
```

## 📊 Relatórios

Após a execução, visualize o relatório gerado:
```bash
npx playwright show-report
```

---
Desenvolvido para fins de estudo e prática de QA Automation.
