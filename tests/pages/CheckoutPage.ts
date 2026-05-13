import { Page, expect } from '@playwright/test';

/**
 * Page Object para a página de Checkout (Step 1)
 * Responsável por preenchimento de dados e validação de campos obrigatórios (AC2, AC5)
 */
export class CheckoutPage {
  constructor(private page: Page) {}

  async isVisible() {
    // Validar que estamos na página de checkout
    return await this.page.isVisible('[data-test="checkout-info-container"]');
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    // AC2: Preencher formulário de checkout com dados válidos
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
  }

  async fillFirstName(firstName: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.fill('[data-test="lastName"]', lastName);
  }

  async fillPostalCode(postalCode: string) {
    await this.page.fill('[data-test="postalCode"]', postalCode);
  }

  async clickContinue() {
    // Clicar no botão "Continue"
    await this.page.click('[data-test="continue"]');
  }

  async getErrorMessage() {
    // AC2 & AC5: Obter mensagem de erro de campo obrigatório
    const errorBox = this.page.locator('[data-test="error"]');
    return await errorBox.textContent();
  }

  async isErrorMessageVisible() {
    // AC2 & AC5: Validar se há mensagem de erro visível
    return await this.page.isVisible('[data-test="error"]');
  }

  async verifyFirstNameRequired() {
    // AC2: Deixar firstName vazio e validar erro
    await this.page.fill('[data-test="firstName"]', '');
    await this.page.fill('[data-test="lastName"]', 'Teste');
    await this.page.fill('[data-test="postalCode"]', '12345');
    await this.clickContinue();

    const errorMessage = await this.getErrorMessage();
    expect(errorMessage).toContain('First Name');
  }

  async verifyLastNameRequired() {
    // AC2: Deixar lastName vazio e validar erro
    await this.page.fill('[data-test="firstName"]', 'Teste');
    await this.page.fill('[data-test="lastName"]', '');
    await this.page.fill('[data-test="postalCode"]', '12345');
    await this.clickContinue();

    const errorMessage = await this.getErrorMessage();
    expect(errorMessage).toContain('Last Name');
  }

  async verifyPostalCodeRequired() {
    // AC2: Deixar postalCode vazio e validar erro
    await this.page.fill('[data-test="firstName"]', 'Teste');
    await this.page.fill('[data-test="lastName"]', 'Teste');
    await this.page.fill('[data-test="postalCode"]', '');
    await this.clickContinue();

    const errorMessage = await this.getErrorMessage();
    expect(errorMessage).toContain('Postal Code');
  }

  async continueWithValidData(firstName: string, lastName: string, postalCode: string) {
    // AC2: Preencher com dados válidos e prosseguir
    await this.fillCheckoutForm(firstName, lastName, postalCode);
    await this.clickContinue();

    // Aguardar navegação para próxima página (overview)
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  async clickCancel() {
    // Clicar no botão "Cancel" para voltar ao carrinho
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
