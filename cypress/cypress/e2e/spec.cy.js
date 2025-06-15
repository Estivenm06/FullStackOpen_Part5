describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }
    const user2 = {
      username: 'test2',
      name: 'Test2',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.request('POST', 'http://localhost:3001/api/users', user2)
    cy.visit('')
  })
  
  it('login form is shown', function(){
    cy.contains('Blogs')
    cy.contains('log in to application')
    cy.contains('login')
  })
  describe('Login', function(){
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('login').click()
      cy.contains('Matti Luukkainen logged in')
    })
    it('fails with wrong credentials', function(){
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.contains('login').click()
      cy.get('.errorRed').contains('Wrong username or password')
      cy.get('.errorRed').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe('when logged in', function(){
    beforeEach(function(){
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('login').click()
    })
    it('A blog can be created', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('First note')
      cy.get('#author').type('Test1')
      cy.get('#url').type('www.test1.com')
      cy.contains('create').click()
      cy.contains('First note')
    })
  })
  describe('when logged in and a blog exists', function(){
    beforeEach(function(){
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('login').click()
      cy.contains('new blog').click()
      cy.get('#title').type('First note')
      cy.get('#author').type('Test1')
      cy.get('#url').type('www.test1.com')
      cy.contains('create').click()
    })
    it('The blog can be liked', function(){
      cy.contains('view').click()
      cy.get('#likes').contains('0')
      cy.get('#likes').parent().find('button').click()
      cy.get('#likes').contains('1')
    })
    it('The blog can be deleted', function(){
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.contains('First note').not()
    })
    it('only the user who created the blog can deleted', function(){
      cy.contains('view').click()
      cy.contains('delete')
      cy.contains('logout').click()
      cy.get('#username').type('test2')
      cy.get('#password').type('test')
      cy.contains('login').click()
      cy.contains('view').click()
      cy.contains('delete').not()
    })
  })
  describe('several blogs exists', function(){
    beforeEach(function(){
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('login').click()
      cy.contains('new blog').click()
      cy.get('#title').type('The title with the most likes')
      cy.get('#author').type('Test1')
      cy.get('#url').type('www.test1.com')
      cy.contains('create').click()
      cy.contains('new blog').click()
      cy.get('#title').type('The title with the second most likes')
      cy.get('#author').type('Test1')
      cy.get('#url').type('www.test1.com')
      cy.contains('create').click()
    })
    it.only('blogs are oredered by likes', function(){
      cy.contains('The title with the most likes')
        .contains('view').click()
      cy.contains('The title with the second most likes')
        .contains('view').click()
      cy.contains('0').parents().find('button').as('firstButton')
      cy.get('@firstButton').eq(6).click()
      cy.wait(1000)
      cy.get('@firstButton').eq(6).click()
      cy.wait(1000)
      cy.get('@firstButton').eq(10).click()
      cy.wait(1000)
      cy.get('.likes').eq(0).should('contain', '2')
      cy.get('.likes').eq(1).should('contain', '1')
    })
  })
})