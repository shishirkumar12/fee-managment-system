// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String, required: true },
  admissionNumber: { type: String, required: true, unique: true },
  parentName: String,
  contactNumber: String,
  email: String,
  address: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', StudentSchema);

// models/Fee.js
const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: Date,
  description: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Fee', FeeSchema);

// models/Payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  fee: { type: mongoose.Schema.Types.ObjectId, ref: 'Fee', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: String,
  transactionId: String,
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
});

module.exports = mongoose.model('Payment', PaymentSchema);
