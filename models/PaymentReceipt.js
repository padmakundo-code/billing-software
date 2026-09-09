const mongoose = require('mongoose');

const paymentReceiptSchema = new mongoose.Schema({
  receiptNumber: {
    type: String,
    unique: true,
    required: true
  },
  receiptDate: {
    type: Date,
    default: Date.now
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  invoices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice'
  }],
  amountReceived: Number,
  paymentMethod: {
    type: String,
    enum: ['cash', 'cheque', 'card', 'bank_transfer', 'upi', 'online', 'other'],
    required: true
  },
  chequeNumber: String,
  chequeDate: Date,
  referenceNumber: String,
  notes: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PaymentReceipt', paymentReceiptSchema);
