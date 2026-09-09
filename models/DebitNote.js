const mongoose = require('mongoose');

const debitNoteSchema = new mongoose.Schema({
  debitNoteNumber: {
    type: String,
    unique: true,
    required: true
  },
  debitNoteDate: {
    type: Date,
    default: Date.now
  },
  referenceInvoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice'
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  reason: {
    type: String,
    enum: ['price_correction', 'quality_issue', 'damage', 'other'],
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    description: String,
    quantity: Number,
    unitPrice: Number,
    tax: String,
    taxAmount: Number,
    lineTotal: Number
  }],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['draft', 'issued', 'cancelled'],
    default: 'draft'
  },
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

module.exports = mongoose.model('DebitNote', debitNoteSchema);
