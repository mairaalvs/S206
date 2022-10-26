/// <reference types="cypress"/> 

describe('Criando cenário de teste para o site globalsqa', () => { //Cenário de teste
  
  it('Caso de teste: Registrando um usuário no site com sucesso', () => { //caso de teste, o it.skip faz com que o cypress pule este teste e não o execute
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type('inatel')
    cy.get('#Text1').type('inatel')
    cy.get('#username').type('inatel')
    cy.get('#password').type('inatel')
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Registration successful') //deve ter esse texto mas pode conter outras coisas além deste texto
  })

  it('Caso de teste: Registrando um usuário com falha (faltando senha)', () => { //caso de teste
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register') //visita a url que foi passada
    cy.get('#firstName').type('inatel') 
    cy.get('#Text1').type('inatel')      // o .type escreve no campo selecionado
    cy.get('#username').type('inatel')
    cy.get('#password').type('inatel')
    cy.get('#password').clear()
    cy.get('.has-error > .help-block').should('have.text', 'Password is required') //única coisa que pode estar escrita no texto
    cy.get('.btn-primary').should('be.disabled') //o botão deve estar desabilitado
  })

  it('Caso de teste: Realizando login com sucesso', () => { //caso de teste
    let info = criarUsuario()
    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1])
    cy.get('.btn-primary').click()
    cy.get('h1.ng-binding').should('contain.text', info[0])
  })

})

function criarUsuario(){

  let horas = new Date().getHours().toString()
  let minutos = new Date().getMinutes().toString()
  let seg = new Date().getSeconds().toString()
  let user = horas + minutos + seg + 'Id'
  let senha = horas + minutos + seg + 'senha'
  let userInfo = [user, senha]

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login') //visita a url que passamos
  cy.get('.btn-link').click()
  cy.get('#firstName').type(user) 
  cy.get('#Text1').type(user)
  cy.get('#username').type(user)
  cy.get('#password').type(senha)
  cy.get('.btn-primary').click()
  cy.get('.ng-binding').should('contain.text', 'Registration successful')

  return userInfo
}