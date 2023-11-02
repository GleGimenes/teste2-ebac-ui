
import EnderecoPage from '../support/page-objects/endereco.page'
const dadosEndereco = require('../fixtures/endereco.json')
describe('Funcionalidade Endereços - Faturamento e Entrega', () => {
    beforeEach(() => {
        cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/")
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha)
        })

    });
    it('Deve fazer cadastro de faturamento com sucesso', () => {
        EnderecoPage.editarEnderecoFaturamento('Juquinha', 'Do Ceu', 'Casa do Chapeu', 'Nicaragua', 'Rua 1', '99', 'Sao Judas', 'Birigui', '02852545', '987546311', 'email@emailruim.com')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso')

    });
    it('Deve fazer cadastro de faturamento com sucesso - Usando arquivo de dados', () => {
        EnderecoPage.editarEnderecoFaturamento(dadosEndereco[2].nome, 
        dadosEndereco[2].sobrenome, 
        dadosEndereco[2].empresa, 
        dadosEndereco[2].pais, 
        dadosEndereco[2].endereco, 
        dadosEndereco[2].numero, 
        dadosEndereco[2].cidade, 
        dadosEndereco[2].estado, 
        dadosEndereco[2].cep, 
        dadosEndereco[2].telefone, 
        dadosEndereco[2].email)
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso')

    });
});