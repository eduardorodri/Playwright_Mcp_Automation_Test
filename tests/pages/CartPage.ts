import { Page, expect } from '@playwright/test';

/**
 * Page Object para a página do Carrinho
 * Responsável por validar itens, detalhes e total (AC1)
 */
export class CartPage {
  constructor(private page: Page) {}

  async isVisible() {
    // Validar que estamos na página do carrinho
    return await this.page.isVisible('[data-test="cart-list"]');
  }

  async getCartItems() {
    // Retornar lista de itens do carrinho
    // Usar múltiplos seletores possíveis para encontrar itens
    const priceItems = await this.page.locator('[data-test="inventory-item-price"]').count();
    if (priceItems > 0) return priceItems;
    
    // Fallback: procurar por elementos com classe "cart_item" ou similar
    const cartItemsClass = await this.page.locator('[class*="cart_item"]').count();
    if (cartItemsClass > 0) return cartItemsClass;
    
    // Fallback final: procurar por qualquer elemento dentro do carrinho que tenha price
    const anyPriceElements = await this.page.locator('xpath=//*[contains(@data-test, "price")]').count();
    return anyPriceElements;
  }

  async getCartItemDetails(itemIndex: number) {
    // Obter detalhes de um item específico do carrinho
    const item = this.page.locator('[data-test="inventory-item"]').nth(itemIndex);

    return {
      name: await item.locator('[data-test="inventory-item-name"]').textContent(),
      description: await item
        .locator('[data-test="inventory-item-desc"]')
        .textContent(),
      price: await item.locator('[data-test="inventory-item-price"]').textContent(),
      quantity: await item.locator('[data-test="item-quantity"]').textContent(),
    };
  }

  async getCartTotal() {
    // Obter valor total do carrinho
    const total = await this.page
      .locator('[data-test="subtotal-label"]')
      .textContent();
    return total ? total.match(/[\d.]+/)?.[0] : '0';
  }

  async verifyCartItems(expectedCount: number) {
    // AC1: Validar que o carrinho tem o número esperado de itens
    const itemCount = await this.getCartItems();
    expect(itemCount).toBe(expectedCount);
  }

  async verifyCartNotEmpty() {
    // AC1: Validar que o carrinho não está vazio
    const itemCount = await this.getCartItems();
    expect(itemCount).toBeGreaterThan(0);
  }

  async goToCheckout() {
    // Clicar no botão "Checkout"
    await this.page.click('[data-test="checkout"]');

    // Aguardar navegação para a página de checkout
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  async continueShopping() {
    // Clicar no botão "Continue Shopping"
    await this.page.click('[data-test="continue-shopping"]');

    // Aguardar navegação de volta para produtos
    await this.page.waitForURL('**/inventory.html');
  }

  async getCurrentUrl(): Promise<string> {
    // Retornar URL atual da página
    return this.page.url();
  }

  async isUrlAt(expectedPath: string): Promise<boolean> {
    // Validar se está em um caminho específico
    return this.page.url().includes(expectedPath);
  }
}
