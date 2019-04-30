
describe(`hero details`, () => {


    before(() => {


        cy.visit(`detail/11`)
    })

    it(`check if header changes when hero name changes`, () => {
        cy.get(`app-hero-detail input[placeholder="name"]`)
            .type(`{backspace}`) // * delete a character in the input box

        cy.get(`app-hero-detail h2`).should(`have.text`, `MR. NICE Details`)
    })

    it(`check if save works`, () => {
        cy.server({
            delay: 1500
        })
        cy.route(`PUT`, `/api/heroes/*`, { id: 11, name: `Mr. Nicey` }).as(`hero11updated`)

        cy.get(`app-hero-detail input[placeholder="name"]`)
            .clear().type(`Mr. Nicey`)

        cy.get(`app-hero-detail button`).contains(`save`).click()

        // * ensure the xhr request is made, we can also use the onrequest handler for the route
        cy.wait(`@hero11updated`) 
    })
})