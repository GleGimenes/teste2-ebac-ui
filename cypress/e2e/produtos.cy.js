


describe('Funcionalidade página de produtos', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('[class="product-block grid"]')
            // .first()
            //.last()
            //.eq(3)
            .contains('Abominable Hoodie')
            .click()
    });

    it('Deve adicionar um produto ao carrinho', () => {
        var quantidade = 3

        cy.get('[class="product-block grid"]')
            .contains('Abominable Hoodie').click()
            cy.get('.button-variable-item-XL').click()
            cy.get('.button-variable-item-Green').click()
            cy.get('.input-text').clear().type(quantidade)
            cy.get('.single_add_to_cart_button').click()

            cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
            cy.get('.woocommerce-message').should('contain', quantidade + ' × “Abominable Hoodie” foram adicionados no seu carrinho')

    });

    it('Deve adicionar produtos ao carrinho - Usando comandos customizados', () =>{
        cy.addProdutos('Abominable Hoodie', 'M', 'Green', 2)
    } )

    it.only('Deve adicionar produtos ao carrinho - Usando comandos customizados', () =>{
        cy.addProdutos('Abominable Hoodie', 'L', 'Blue', 2)
    })
});