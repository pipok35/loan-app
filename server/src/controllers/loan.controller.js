const loanModel = require('../models/loan.model')
const { v4: uuidv4 } = require('uuid');

const getAllLoans = async (request, reply) => {
  const allLoans = await loanModel.find()
  if (allLoans.length === 0) {
    throw new Error('Заявки не найдены')
  }
  return allLoans
}

const createLoan = async (request, reply) => {
  const newLoan = new loanModel(request.body)
  await newLoan.save()
  reply.code(201).send(newLoan)
}

const getLoan = async (request, reply) => {
  const loan = await loanModel.findById(request.params.id)
  if (!loan) {
    throw new Error('Неверное значение')
  }
  reply.code(201).send(loan)
}

const deleteLoan = async (request, reply) => {
    await loanModel.findByIdAndDelete(request.params.id)
    reply.code(204).send()
}

const updateLoan = async (request, reply) => {
    const loan = await loanModel.findByIdAndUpdate(request.params.id, request.body, {new: true})
    reply.code(200).send(loan)
}

module.exports = {
  getAllLoans,
  createLoan,
  getLoan,
  deleteLoan,
  updateLoan
}
