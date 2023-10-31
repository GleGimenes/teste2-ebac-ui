//Otimização na escrita do código utilizando hooks.
//O primeiro hooks é o BEFORE = cenário ou rotina que roda antes de todos os cenários.
//O segundo hooks é o AFTER = cenário ou rotina que roda depois de todos os cenários. Exemplo: Limpar uma base de dados depois de rodar todos os testes.
//O terceiro é o AFTEREACH = cenário ou rotina que roda depois de cada teste. Exemplo: Limpar algum dado comum depois de cada teste (não é comum o uso, porque o Cypress já limpa os dados depois de cada teste)
const perfil = require("../fixtures/perfil.json") //utilizando massa de dados. Foi criado um file json com o nome perfil onde foi gerado a massa de dados para o login

context('funcionalidade Login', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    afterEach(() => {
        cy.screenshot() //Depois de cada teste salva um evidencia de cada teste (faz um print da tela do teste)
    });
    
    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()

        cy.get('a > .hidden-xs').should('contain' , 'Welcome')
    });

    it('Deve fazer login com sucesso - Usando arquivo de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()

        cy.get('a > .hidden-xs').should('contain' , 'Welcome')
    });

    it.only('Deve gerar login com sucesso - Usando fixture', () => {
        cy.fixture("perfil").then(dados => { //outra maneira é usando fixture. A partir da massa de dados criado no file perfil.json.
        cy.get('#username').type(dados.usuario) // A função/método then carrega primeiro a massa de dados para depois então realizar o login.
        cy.get('#password').type(dados.senha, {log: false}) //dados é uma variável criada para receber a massa de dados do file perfiljson.
        cy.get('.woocommerce-form > .button').click() // {log: false} serve para ocultar a senha na execução na tela de teste.

        cy.get('a > .hidden-xs').should('contain' , 'Welcome')
        })
    });

    it('Deve exibir uma mensagem de erro ao inserir usuario invalido', () => {
        cy.get('#username').type('aluno_ebacteste.com')
        cy.get('#password').type('teste@teste.com')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain' , 'o usuário')
    });

    it('Deve exibir uma mensagem de erro ao inserir senha invalida', () => {
        cy.get('#username').type('aluno_ebac@teste.com')
        cy.get('#password').type('testeteste.com')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-error').should('contain' , 'Erro: a senha fornecida para o e-mail aluno_ebac@teste.com está incorreta. Perdeu a senha?')


    })
});