const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { Schema, model } = mongoose;

const loanSchema = new Schema({
  id: {type: String, default: uuidv4},
  fio: { type: String, required: true},
  gender: { type: String, required: true},
  bDate: { type: Date, required: true},
  amount: { type: Number, required: true},
  time: { type: Number, required: true},
  measureTime: { type: String, required: true},
  creationDate: { type: Date, default: new Date(), required: true },
  updateDate: { type: Date}
});

module.exports = model('loan', loanSchema);