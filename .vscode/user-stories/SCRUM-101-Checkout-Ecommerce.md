# História de Usuário: SCRUM-101 - Processo de Checkout E-commerce

## Título da História
**Como** cliente, **quero** concluir minha compra através de um processo de checkout **para que** eu possa realizar pedidos online.

## Descrição da História
Implementar um fluxo completo de checkout que permita aos clientes revisar o carrinho, inserir informações de entrega, selecionar o método de pagamento e confirmar o pedido. O processo de checkout deve ser intuitivo, seguro e fornecer feedback claro em cada etapa.

## URL da Aplicação
[https://www.saucedemo.com](https://www.saucedemo.com)

## Credenciais de Teste
- **Usuário:** `standard_user`
- **Senha:** `secret_sauce`

---

## Critérios de Aceite (AC)

### AC1: Revisão do Carrinho
- **DADO QUE** eu seja um usuário autenticado com itens no carrinho
- **QUANDO** eu navegar para a página do carrinho
- **ENTÃO** eu devo visualizar todos os itens adicionados com seus detalhes (nome, descrição, preço e quantidade)
- **E** eu devo visualizar o cálculo do valor total
- **E** eu devo ter opções para continuar comprando ou prosseguir para o checkout

### AC2: Preenchimento das Informações de Checkout
- **DADO QUE** eu esteja na página do carrinho com itens adicionados
- **QUANDO** eu clicar no botão "Checkout"
- **ENTÃO** eu devo ser redirecionado para a página de informações do checkout
- **E** eu devo visualizar os campos Nome, Sobrenome e CEP/Código Postal
- **E** todos os campos devem ser obrigatórios
- **QUANDO** eu deixar qualquer campo vazio e clicar em "Continue"
- **ENTÃO** eu devo visualizar uma mensagem de erro indicando qual campo é obrigatório

### AC3: Visão Geral do Pedido
- **DADO QUE** eu tenha preenchido informações válidas de checkout
- **QUANDO** eu clicar no botão "Continue"
- **ENTÃO** eu devo ser redirecionado para a página de resumo do pedido
- **E** eu devo visualizar um resumo de todos os itens do pedido
- **E** eu devo visualizar informações de pagamento e entrega
- **E** eu devo visualizar subtotal, impostos e valor total
- **E** eu devo ter opções para cancelar ou finalizar o pedido

### AC4: Finalização do Pedido
- **DADO QUE** eu esteja na página de resumo do checkout
- **QUANDO** eu clicar no botão "Finish"
- **ENTÃO** eu devo ser redirecionado para a página de confirmação do pedido
- **E** eu devo visualizar uma mensagem de sucesso confirmando o pedido
- **E** eu devo visualizar o botão "Back Home" para retornar à página de produtos

### AC5: Tratamento de Erros
- **DADO QUE** eu esteja na página de informações do checkout
- **QUANDO** eu inserir dados inválidos (ex.: caracteres especiais ou informações incompletas)
- **ENTÃO** eu devo visualizar mensagens apropriadas de validação
- **E** eu não devo conseguir prosseguir até que todos os campos estejam válidos

---

## Regras de Negócio
1. Todos os campos do formulário de checkout são obrigatórios.
2. O usuário deve estar autenticado para acessar o checkout.
3. O carrinho não pode estar vazio ao prosseguir para o checkout.
4. A confirmação do pedido deve limpar o carrinho.
5. O usuário pode cancelar o checkout em qualquer etapa e retornar ao carrinho.

## Observações Técnicas
- Utilizar **Playwright** para automação dos testes.
- Testar nos navegadores Chrome, Firefox e Safari.
- Garantir responsividade mobile no fluxo de checkout.
- Validar todas as mensagens de erro e validação.
- Testar fluxo de navegação e comportamento do botão voltar.

## Definição de Pronto (Definition of Done)
- [x] Todos os critérios de aceite possuem casos de teste.
- [x] Testes exploratórios manuais concluídos.
- [x] Scripts de automação criados e executando com sucesso.
- [x] Resultados dos testes documentados.
- [x] Bugs registrados para falhas encontradas.
- [x] Código versionado no repositório.
