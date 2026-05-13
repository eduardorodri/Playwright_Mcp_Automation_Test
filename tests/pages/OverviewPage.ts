import { Page, expect } from '@playwright/test';

/**
 * Page Object para a página de Resumo do Pedido (Checkout Step 2)
 * Responsável por validar subtotal, impostos e total (AC3)
 */
export class OverviewPage {
  constructor(private page: Page) {}

  async isVisible() {
    // Validar que estamos na página de resumo
    return await this.page.isVisible('[data-test="checkout-summary-container"]');
  }

  async getOrderItems() {
    // AC3: Obter lista de itens no resumo
    // Usar múltiplos seletores possíveis
    const priceItems = await this.page.locator('[data-test="inventory-item-price"]').count();
    if (priceItems > 0) return priceItems;
    
    // Fallback: procurar por elementos com classe "cart_item"
    const cartItemsClass = await this.page.locator('[class*="cart_item"]').count();
    if (cartItemsClass > 0) return cartItemsClass;
    
    // Fallback final: procurar por qualquer elemento que tenha price
    const anyPriceElements = await this.page.locator('xpath=//*[contains(@data-test, "price")]').count();
    return anyPriceElements;
  }

  async getOrderItemDetails(itemIndex: number) {
    // AC3: Obter detalhes de um item do pedido
    const item = this.page.locator('[data-test="inventory-item"]').nth(itemIndex);

    return {
      name: await item.locator('[data-test="inventory-item-name"]').textContent(),
      price: await item.locator('[data-test="inventory-item-price"]').textContent(),
      quantity: await item.locator('[data-test="item-quantity"]').textContent(),
    };
  }

  async getSubtotal() {
    // AC3: Obter subtotal
    const subtotal = await this.page
      .locator('[data-test="subtotal-label"]')
      .textContent();
    return subtotal ? subtotal.match(/([\d.]+)$/)?.[1] : '0.00';
  }

  async getTax() {
    // AC3: Obter valor de impostos
    const tax = await this.page
      .locator('[data-test="tax-label"]')
      .textContent();
    return tax ? tax.match(/([\d.]+)$/)?.[1] : '0.00';
  }

  async getTotal() {
    // AC3: Obter valor total do pedido
    const total = await this.page
      .locator('[data-test="total-label"]')
      .textContent();
    return total ? total.match(/([\d.]+)$/)?.[1] : '0.00';
  }

  async verifyOrderSummary() {
    // AC3: Validar que a página de resumo contém todos os elementos esperados
    await expect(this.page.locator('[data-test="subtotal-label"]')).toBeVisible();
    await expect(this.page.locator('[data-test="tax-label"]')).toBeVisible();
    await expect(this.page.locator('[data-test="total-label"]')).toBeVisible();
  }

  async verifyTotalCalculation(expectedSubtotal: number, expectedTax: number, expectedTotal: number) {
    // AC3: Validar cálculo correto de subtotal + impostos = total
    const subtotal = parseFloat(await this.getSubtotal());
    const tax = parseFloat(await this.getTax());
    const total = parseFloat(await this.getTotal());

    expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
    expect(tax).toBeCloseTo(expectedTax, 2);
    expect(total).toBeCloseTo(expectedTotal, 2);
  }

  async getShippingInformation() {
    // AC3: Obter informações de entrega exibidas
    return {
      firstName: await this.page
        .locator('[data-test="shipping-info-value"]')
        .first()
        .textContent(),
      lastName: await this.page
        .locator('[data-test="shipping-info-value"]')
        .nth(1)
        .textContent(),
      postalCode: await this.page
        .locator('[data-test="shipping-info-value"]')
        .nth(2)
        .textContent(),
    };
  }

  async finish() {
    // Clicar no botão "Finish" para completar o pedido
    await this.page.click('[data-test="finish"]');

    // Aguardar navegação para página de confirmação
    await this.page.waitForURL('**/checkout-complete.html');
  }

  async cancel() {
    // Clicar no botão "Cancel" para voltar à página anterior
    await this.page.click('[data-test="cancel"]');
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
