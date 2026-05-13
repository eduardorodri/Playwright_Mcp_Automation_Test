import { Page } from '@playwright/test';

/**
 * Page Object para a página de Login
 * Responsável pela autenticação de usuários no Sauce Demo
 */
export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    // Preencher campo de usuário
    await this.page.fill('[data-test="username"]', username);

    // Preencher campo de senha
    await this.page.fill('[data-test="password"]', password);

    // Clicar no botão de login
    await this.page.click('[data-test="login-button"]');

    // Aguardar a navegação para a página de produtos
    await this.page.waitForURL('**/inventory.html');
  }

  async isLoginSuccessful() {
    // Validar se estamos na página de produtos (indicador de login bem-sucedido)
    return await this.page.isVisible('[data-test="inventory-container"]');
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
