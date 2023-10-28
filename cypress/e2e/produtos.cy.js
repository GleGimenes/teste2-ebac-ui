


describe('Funcionalidade página de produtos', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    });

    afterEach(() => {
        cy.screenshot()

    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('[class="product-block grid"]')
            // .first()
            //.last()
            //.eq(3)
            .contains('Grayson Crewneck Sweatshirt')
            .click()
    });

    it.only('Deve adicionar um produto ao carrinho', () => {
        let quantidade = 3

        cy.get('[class="product-block grid"]')
            .contains('Grayson Crewneck Sweatshirt').click()
        cy.get('.button-variable-item-XL').click()
        cy.get('.button-variable-item-Orange').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Grayson Crewneck Sweatshirt” foram adicionados no seu carrinho')

    });

});