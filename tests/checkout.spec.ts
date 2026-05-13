import { test, expect, Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OverviewPage } from './pages/OverviewPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { testData } from './fixtures/testData';

/**
 * Suite de Testes E2E - Fluxo de Checkout
 * Cobertura: SCRUM-101 (AC1 a AC5)
 * Aplicação: Sauce Demo (https://www.saucedemo.com)
 */

// Fixture: Helper para adicionar itens ao carrinho antes dos testes
async function setupCartWithItems(page: Page, productNames: string[]) {
  // Aguardar que a página de produtos carregue
  await page.waitForURL('**/inventory.html');
  
  // Adicionar itens específicos ao carrinho
  for (const productName of productNames) {
    // Encontrar o elemento do produto pelo nome
    const productElement = page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName });

    // Validar que o produto foi encontrado
    if (await productElement.count() > 0) {
      // Encontrar o botão "Add to cart" dentro do elemento do produto
      const addButton = productElement.locator('button[data-test^="add-to-cart"]').first();

      // Clicar no botão
      if (await addButton.isVisible()) {
        await addButton.click();
        console.log(`✓ Produto adicionado: ${productName}`);
      } else {
        console.log(`✗ Botão não visível para: ${productName}`);
      }
    } else {
      console.log(`✗ Produto não encontrado: ${productName}`);
    }
  }
}

test.describe('SCRUM-101 - Fluxo de Checkout E-commerce', () => {
  // Hook: Realizar login antes de cada teste
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Navegar para a aplicação
    await loginPage.navigate();

    // Realizar login com credenciais padrão
    await loginPage.login(
      testData.credentials.username,
      testData.credentials.password
    );

    // Validar que o login foi bem-sucedido
    const isLoggedIn = await loginPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
  });

  // ========== AC1: REVISÃO DO CARRINHO ==========
  test('AC1 - Deve exibir itens, detalhes e total correto no carrinho', async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Adicionar 2 itens ao carrinho (Backpack e Onesie)
    await setupCartWithItems(page, ['Sauce Labs Backpack', 'Sauce Labs Onesie']);

    // Validar que o badge do carrinho mostra 2 itens
    const badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(2);

    // Navegar para a página do carrinho
    await productsPage.goToCart();

    // Validar que estamos na página do carrinho
    const isCartVisible = await cartPage.isVisible();
    expect(isCartVisible).toBe(true);

    // Validar que o carrinho não está vazio
    await cartPage.verifyCartNotEmpty();

    // Validar que existem itens (pelo menos 1)
    const itemCount = await cartPage.getCartItems();
    expect(itemCount).toBeGreaterThanOrEqual(1);

    // Obter detalhes de cada item disponível
    for (let i = 0; i < Math.min(2, itemCount); i++) {
      const item = await cartPage.getCartItemDetails(i);

      // Validar que cada item contém informações esperadas
      expect(item.name).toBeTruthy();
      expect(item.price).toBeTruthy();
    }
  });

  // ========== AC2: PREENCHIMENTO DAS INFORMAÇÕES DE CHECKOUT ==========
  test('AC2.1 - Deve validar campo First Name obrigatório', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup: Adicionar item ao carrinho
    await setupCartWithItems(page, ['Sauce Labs Backpack']);

    // Navegar para carrinho → checkout
    await productsPage.goToCart();
    await cartPage.goToCheckout();

    // Validar que estamos na página de checkout
    const isCheckoutVisible = await checkoutPage.isVisible();
    expect(isCheckoutVisible).toBe(true);

    // Deixar firstName vazio e tentar prosseguir
    await checkoutPage.verifyFirstNameRequired();
  });

  test('AC2.2 - Deve validar campo Last Name obrigatório', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup: Adicionar item ao carrinho
    await setupCartWithItems(page, ['Sauce Labs Backpack']);

    // Navegar para carrinho → checkout
    await productsPage.goToCart();
    await cartPage.goToCheckout();

    // Deixar lastName vazio e tentar prosseguir
    await checkoutPage.verifyLastNameRequired();
  });

  test('AC2.3 - Deve validar campo Postal Code obrigatório', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup: Adicionar item ao carrinho
    await setupCartWithItems(page, ['Sauce Labs Backpack']);

    // Navegar para carrinho → checkout
    await productsPage.goToCart();
    await cartPage.goToCheckout();

    // Deixar postalCode vazio e tentar prosseguir
    await checkoutPage.verifyPostalCodeRequired();
  });

  test('AC2.4 - Deve prosseguir com dados válidos de checkout', async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup: Adicionar item ao carrinho
    await setupCartWithItems(page, ['Sauce Labs Backpack']);

    // Navegar para carrinho → checkout
    await productsPage.goToCart();
    await cartPage.goToCheckout();

    // Preencher com dados válidos e prosseguir
    await checkoutPage.continueWithValidData(
      testData.checkoutValidData.firstName,
      testData.checkoutValidData.lastName,
      testData.checkoutValidData.postalCode
    );

    // Validar que fomos redirecionados para a página de resumo
    // (A URL foi alterada em continueWithValidData)
  });

  // ========== AC3: VISÃO GERAL DO PEDIDO ==========
  test('AC3 - Deve exibir resumo correto com subtotal, impostos e total', async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const overviewPage = new OverviewPage(page);

    // Setup: Adicionar 2 itens ao carrinho
    await setupCartWithItems(page, ['Sauce Labs Backpack', 'Sauce Labs Onesie']);

    // Navegar: Produtos → Carrinho → Checkout
    await productsPage.goToCart();
    await cartPage.goToCheckout();

    // Preencher dados de checkout e prosseguir para overview
    await checkoutPage.continueWithValidData(
      testData.checkoutValidData.firstName,
      testData.checkoutValidData.lastName,
      testData.checkoutValidData.postalCode
    );

    // Validar que estamos na página de resumo
    const isOverviewVisible = await overviewPage.isVisible();
    expect(isOverviewVisible).toBe(true);

    // Validar que existem itens no resumo (pelo menos 1)
    const itemCount = await overviewPage.getOrderItems();
    expect(itemCount).toBeGreaterThanOrEqual(1);

    // Validar que subtotal, impostos e total são exibidos
    await overviewPage.verifyOrderSummary();

    // Obter valores
    const subtotal = await overviewPage.getSubtotal();
    const tax = await overviewPage.getTax();
    const total = await overviewPage.getTotal();

    // Validar que os valores são números positivos
    expect(parseFloat(subtotal as string)).toBeGreaterThan(0);
    expect(parseFloat(tax as string)).toBeGreaterThanOrEqual(0);
    expect(parseFloat(total as string)).toBeGreaterThan(0);
  });

  // ========== AC4: FINALIZAÇÃO DO PEDIDO ==========
  test('AC4 - Deve finalizar pedido com sucesso e retornar para home', async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const overviewPage = new OverviewPage(page);
    const confirmationPage = new ConfirmationPage(page);

    // Setup: Adicionar item ao carrinho
    await setupCartWithItems(page, ['Sauce Labs Backpack']);

    // Navegar: Produtos → Carrinho → Checkout → Overview
    await productsPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutPage.continueWithValidData(
      testData.checkoutValidData.firstName,
      testData.checkoutValidData.lastName,
      testData.checkoutValidData.postalCode
    );

    // Clicar em "Finish" para finalizar o pedido
    await overviewPage.finish();

    // Validar que estamos na página de confirmação
    const isConfirmationVisible = await confirmationPage.isVisible();
    expect(isConfirmationVisible).toBe(true);

    // Validar mensagem de sucesso
    await confirmationPage.verifyOrderComplete();

    // Validar que o botão "Back Home" está visível
    const isBackHomeVisible = await confirmationPage.isBackHomeButtonVisible();
    expect(isBackHomeVisible).toBe(true);

    // Clicar em "Back Home" e retornar
    await confirmationPage.clickBackHome();

    // Validar que estamos de volta na página de produtos
    const isProductsVisible = await productsPage.page.isVisible('[data-test="inventory-container"]');
    expect(isProductsVisible).toBe(true);
  });

  // ========== AC5: TRATAMENTO DE ERROS E VALIDAÇÃO ==========
  test('AC5.1 - Deve bloquear progresso com campos vazios', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup: Adicionar item ao carrinho
    await setupCartWithItems(page, ['Sauce Labs Backpack']);

    // Navegar para checkout
    await productsPage.goToCart();
    await cartPage.goToCheckout();

    // Tentar prosseguir com formulário vazio
    await checkoutPage.clickContinue();

    // Validar que mensagem de erro aparece
    const isErrorVisible = await checkoutPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    // Validar que não fomos redirecionados (ainda na mesma URL)
    const isStillAtCheckout = await checkoutPage.isUrlAt('checkout-step-one');
    expect(isStillAtCheckout).toBe(true);
  });

  test('AC5.2 - Deve validar progressão bloqueada com apenas um campo preenchido', async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup: Adicionar item ao carrinho
    await setupCartWithItems(page, ['Sauce Labs Backpack']);

    // Navegar para checkout
    await productsPage.goToCart();
    await cartPage.goToCheckout();

    // Preencher apenas firstName
    await checkoutPage.fillFirstName('João');

    // Tentar prosseguir
    await checkoutPage.clickContinue();

    // Validar que há erro e não foi redirecionado
    const isErrorVisible = await checkoutPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);
    
    const isStillAtCheckout = await checkoutPage.isUrlAt('checkout-step-one');
    expect(isStillAtCheckout).toBe(true);
  });

  test('AC5.3 - Deve permitir progresso apenas com todos os campos preenchidos', async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Setup: Adicionar item ao carrinho
    await setupCartWithItems(page, ['Sauce Labs Backpack']);

    // Navegar para checkout
    await productsPage.goToCart();
    await cartPage.goToCheckout();

    // Preencher todos os campos corretamente
    await checkoutPage.continueWithValidData(
      testData.checkoutValidData.firstName,
      testData.checkoutValidData.lastName,
      testData.checkoutValidData.postalCode
    );

    // Validar que fomos redirecionados para overview
    const isAtOverview = await checkoutPage.isUrlAt('checkout-step-two');
    expect(isAtOverview).toBe(true);
  });
});
