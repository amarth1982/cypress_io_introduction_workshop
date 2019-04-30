describe(`dashboard`, () => {

    before(() => {

        cy.visit(`dashboard`);

        console.log(`Hero ${Cypress.env("defaultHeroName")} and bad boy ${Cypress.env("badBoy")}`)
    })

    it(`has title 'Tour of Heroes'`, () => {
        cy.title().should(`eq`, `Tour of Heroes`)
    })

    it(`intercept and check dashboard to display only one big blue button`,
        () => {

            cy.server();
            cy.route(`/api/heroes`, `fixture:me`)

            cy.visit(`dashboard`)
            cy.get(`.module.hero`).should(`have.length`, 1)
        })

    it(`check if dashboard button exists`, () => {
        // * creating a alias to to the anchor ("actually alias is reference to a dom element, meaning the result will vary, if the dom is update")
        cy.get(`nav>a[href="/dashboard"]`).as('dashboardlink')

        // * using the alias to assert
        cy.get(`@dashboardlink`).should("exist")
    })

    it(`check if Heroes button exists`, () => {
        cy.get(`nav>a[href="/heroes"]`).should("exist")
    })

    it(`check the order of nav buttons`, () => {
        cy.get(`nav>a`)
            .first().contains(`Dashboard`)
            .parent().children(`a`)
            .last().contains(`Heroes`)
    })

    it(`has "Top Heroes" header`, () => {
        cy.contains(`Top Heroes`) // * looks for this text in the whole page
    })

    //#search-component>h4
    it(`check heroes search title "Hero Search"`, () => {
        cy.get(`#search-component>h4`).should(`have.text`, `Hero Search`)
    })

    it(`check can search`, () => {
        cy.get(`#search-box`)
            .type(`Mr. Nicey`) // * Hero name is incorrect
            .type(`{backspace}`) // * fixing it by backspace

        cy.get('ul.search-result li').as(`resultpane`)

        cy.get(`@resultpane`)
            .first()
            .contains(`Mr. Nice`) // * assert if the result has Mr. Nice
            .click() // * perform an action on the li

        cy.url().should('include', `detail/11`)

    })
})