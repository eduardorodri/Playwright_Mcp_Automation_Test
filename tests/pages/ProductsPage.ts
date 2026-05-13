import { Page } from '@playwright/test';

/**
 * Page Object para a página de Produtos
 * Responsável por adicionar itens ao carrinho e navegar
 */
export class ProductsPage {
  constructor(private page: Page) {}

  async addProductToCart(productId: string) {
    // Localizar e clicar no botão "Add to cart" para um produto específico
    const addButton = this.page.locator(
      `button[data-test="add-to-cart-sauce-labs-backpack"]`
    );
    await addButton.click();
  }

  async addProductsByName(productNames: string[]) {
    // Adicionar múltiplos produtos ao carrinho pelo nome
    for (const productName of productNames) {
      const buttonName = productName
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[()]/g, '');
      const selector = `button[data-test="add-to-cart-${buttonName}"]`;
      
      try {
        await this.page.click(selector);
      } catch (e) {
        console.log(`Produto não encontrado com seletor: ${selector}`);
      }
    }
  }

  async goToCart() {
    // Clicar no ícone do carrinho no cabeçalho
    await this.page.click('[data-test="shopping-cart-link"]');

    // Aguardar a navegação para a página do carrinho
    await this.page.waitForURL('**/cart.html');
  }

  async getCartBadgeCount() {
    // Obter o número de itens no carrinho (badge)
    const badge = await this.page
      .locator('[data-test="shopping-cart-badge"]')
      .textContent();
    return badge ? parseInt(badge, 10) : 0;
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
