/**
 * Arquivo de Dados de Teste Reutilizáveis
 * Contém credenciais, IDs de produtos e dados para o fluxo de checkout
 */

export const testData = {
  // Credenciais de acesso
  credentials: {
    username: 'standard_user',
    password: 'secret_sauce',
  },

  // IDs de produtos disponíveis no Sauce Demo
  products: {
    backpack: '4',
    bikeLights: '0',
    tShirt: '1',
  },

  // Dados de checkout válidos
  checkoutValidData: {
    firstName: 'João',
    lastName: 'Silva',
    postalCode: '01310-100',
  },

  // Dados de checkout inválidos para teste AC5
  checkoutInvalidData: {
    firstName: '@#$%',
    lastName: '!!!',
    postalCode: 'ABC',
  },

  // Mensagens de erro esperadas
  errorMessages: {
    firstNameRequired: 'Error: First Name is required',
    lastNameRequired: 'Error: Last Name is required',
    postalCodeRequired: 'Error: Postal Code is required',
  },

  // Textos de sucesso esperados
  successMessages: {
    orderComplete: 'Thank you for your order!',
    confirmation: 'Your order has been dispatched',
  },
};
