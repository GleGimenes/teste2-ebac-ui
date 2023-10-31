
import EnderecoPage from '../support/page-objects/endereco.page'
describe('Funcionalidade Endereços - Faturamento e Entrega', () => {
    beforeEach(() => {
        cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/")
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha)
        })

    });
    it.only('Deve fazer cadastro de faturamento com sucesso', () => {
        EnderecoPage.editarEnderecoFaturamento('Juquinha', 'Do Ceu', 'Casa do Chapeu', 'Nicaragua', 'Rua 1', '99', 'Sao Judas', 'Birigui', '02852545', '987546311', 'email@emailruim.com')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso')

    });
});