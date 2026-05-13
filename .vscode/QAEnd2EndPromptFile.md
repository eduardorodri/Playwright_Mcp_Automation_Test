# Prompt para Automação de Testes (Playwright + MCP)

**Atue como um Engenheiro de Automação de QA Sênior, especialista em Playwright e TypeScript.**

Sua tarefa é criar uma suíte de testes End-to-End (E2E) completa para a História de Usuário D:\Play\.vscode\user-stories **SCRUM-101-Checkout-Ecommerce.md** na aplicação Sauce Demo (https://www.saucedemo.com).

---

## 1. Contexto da História de Usuário (Requisitos)

### Descrição
Implementar um fluxo completo de checkout que permita aos clientes revisar o carrinho, inserir informações de entrega, selecionar o método de pagamento e confirmar o pedido.

### Critérios de Aceite (AC) para Cobertura:
- **AC1 (Revisão):** Validar visualização de itens, detalhes e total no carrinho.
- **AC2 (Informações):** Validar campos obrigatórios (Nome, Sobrenome, CEP) e mensagens de erro ao deixar campos vazios.
- **AC3 (Resumo):** Validar página de resumo com subtotal, impostos e valor total.
- **AC4 (Sucesso):** Validar mensagem de confirmação após clicar em "Finish" e retorno à Home.
- **AC5 (Validação):** Validar bloqueio de progresso com dados inválidos.

### Regras de Negócio:
1. Autenticação obrigatória.
2. Carrinho não pode estar vazio.
3. Checkout deve limpar o carrinho ao finalizar.

---

## 2. Diretrizes Técnicas para o Código:

1.  **Padrão de Projeto:** Utilize o padrão **Page Object Model (POM)**. Separe a lógica em classes (ex: `LoginPage`, `CartPage`, `CheckoutPage`).
2.  **Linguagem:** TypeScript.
3.  **Setup/Teardown:** Utilize hooks (`beforeEach`) para realizar o login com as credenciais `standard_user` / `secret_sauce` e adicionar itens ao carrinho antes dos testes de fluxo.
4.  **Asserções:** Utilize as asserções nativas do Playwright (ex: `expect(locator).toBeVisible()`).
5.  **Organização:** O código deve ser limpo, modular e incluir comentários breves referenciando qual AC está sendo testado em cada bloco.

---

## 3. Resultado Esperado:
- Estrutura de pastas sugerida.
- Código das classes de Page Object.
- Arquivo de teste `checkout.spec.ts` cobrindo todos os cenários.
- Instruções rápidas de como executar os testes em Chrome, Firefox e Safari.
