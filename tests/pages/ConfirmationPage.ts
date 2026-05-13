import { Page, expect } from '@playwright/test';

/**
 * Page Object para a página de Confirmação
 * Responsável por validar mensagem de sucesso e limpeza do carrinho (AC4)
 */
export class ConfirmationPage {
  constructor(private page: Page) {}

  async isVisible() {
    // Validar que estamos na página de confirmação
    return await this.page.isVisible('[data-test="checkout-complete-container"]');
  }

  async getSuccessMessage() {
    // AC4: Obter mensagem de sucesso
    return await this.page
      .locator('[data-test="complete-header"]')
      .textContent();
  }

  async getSuccessText() {
    // AC4: Obter texto completo de confirmação
    return await this.page
      .locator('[data-test="complete-text"]')
      .textContent();
  }

  async verifyOrderComplete() {
    // AC4: Validar que a mensagem de sucesso é exibida
    const message = await this.getSuccessMessage();
    expect(message).toContain('Thank you');
  }

  async isBackHomeButtonVisible() {
    // AC4: Validar presença do botão "Back Home"
    return await this.page.isVisible('[data-test="back-to-products"]');
  }

  async clickBackHome() {
    // AC4: Clicar no botão "Back Home" para retornar à página de produtos
    await this.page.click('[data-test="back-to-products"]');

    // Aguardar navegação para página de produtos
    await this.page.waitForURL('**/inventory.html');
  }

  async verifyCartClearedAfterOrder() {
    // AC4: Voltar para home e validar que o carrinho foi limpo
    await this.clickBackHome();

    // Validar que o badge do carrinho não está mais visível ou tem valor 0
    const badge = this.page.locator('[data-test="shopping-cart-badge"]');
    const isBadgeVisible = await badge.isVisible().catch(() => false);
    
    if (isBadgeVisible) {
      const count = await badge.textContent();
      expect(parseInt(count || '0', 10)).toBe(0);
    } else {
      expect(isBadgeVisible).toBe(false);
    }
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
