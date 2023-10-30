//Otimização na escrita do código utilizando hooks.
//O primeiro hooks é o BEFORE = cenário ou rotina que roda antes de todos os cenários.
//O segundo hooks é o AFTER = cenário ou rotina que roda depois de todos os cenários. Exemplo: Limpar uma base de dados depois de rodar todos os testes.
//O terceiro é o AFTEREACH = cenário ou rotina que roda depois de cada teste. Exemplo: Limpar algum dado comum depois de cada teste (não é comum o uso, porque o Cypress já limpa os dados depois de cada teste)
const perfil = require('../fixtures/perfil.json')

context('funcionalidade Login', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta') //não utilizei baseUrl devido ter quebrado o teste(notfound404)
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

    it('Deve fazer login com sucesso - usando arquvo de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()

        cy.get('a > .hidden-xs').should('contain' , 'Welcome')
    });

    it.only('Deve fazer login com sucesso - Usando fixtures', () => {
        cy.fixture('perfil').then(dados => {
        cy.get('#username').type(dados.usuario)
        cy.get('#password').type(dados.senha, {log: false})
        cy.get('.woocommerce-form > .button').click()

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