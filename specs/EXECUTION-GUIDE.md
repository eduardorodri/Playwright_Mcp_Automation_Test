# Instruções de Execução - Suite de Testes Checkout

## 🚀 Quick Start

### Executar tudo de uma vez
```bash
npx playwright test checkout.spec.ts
```

### Ver relatório de resultados
```bash
npx playwright show-report
```

---

## 📋 Estrutura de Testes

### 30 Testes em 3 Navegadores (Chrome, Firefox, Safari)

**AC1** (3 testes): Revisão do Carrinho
- Validar items, detalhes e total

**AC2** (12 testes): Campos Obrigatórios
- AC2.1, AC2.2, AC2.3: Validar campos obrigatórios
- AC2.4: Prosseguir com dados válidos

**AC3** (3 testes): Visão Geral do Pedido
- Validar subtotal, impostos e total

**AC4** (3 testes): Finalização do Pedido
- Validar mensagem de sucesso e carrinho limpo

**AC5** (9 testes): Tratamento de Erros
- AC5.1, AC5.2, AC5.3: Validação de bloqueio de progresso

---

## 🎯 Comandos Úteis

### Por Navegador
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Por Critério de Aceite
```bash
npx playwright test -g "AC1"
npx playwright test -g "AC2"
npx playwright test -g "AC3"
npx playwright test -g "AC4"
npx playwright test -g "AC5"
```

### Modo Debug
```bash
npx playwright test --debug
```

### Com Trace e Vídeo
```bash
npx playwright test --trace on --video on
```

---

## 📊 Estrutura de Código

- `pages/LoginPage.ts` - Login
- `pages/ProductsPage.ts` - Produtos
- `pages/CartPage.ts` - Carrinho (AC1)
- `pages/CheckoutPage.ts` - Checkout (AC2, AC5)
- `pages/OverviewPage.ts` - Resumo (AC3)
- `pages/ConfirmationPage.ts` - Confirmação (AC4)
- `fixtures/testData.ts` - Dados de teste
- `checkout.spec.ts` - Suite completa

---

## ✅ Checklist de Sucesso

- [x] 30/30 testes passando
- [x] AC1-AC5 100% cobertos
- [x] 3 navegadores testados
- [x] Relatório HTML gerado
- [x] Page Object Model implementado

---

**Taxa de Sucesso: 100% ✅**
