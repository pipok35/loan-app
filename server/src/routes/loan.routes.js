const loanController = require('../controllers/loan.controller')

async function loanRoutes (fastify, options) {  

    fastify.get('/loans', loanController.getAllLoans)
    fastify.post('/loans', loanController.createLoan)
    fastify.get('/loans/:id', loanController.getLoan)
    fastify.delete('/loans/:id', loanController.deleteLoan)
    fastify.put('/loans/:id', loanController.updateLoan)
    fastify.get('/analytics', loanController.countLoansByDate)
  }
  
  module.exports = loanRoutes