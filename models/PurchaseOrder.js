const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  poNumber: {
    type: String,
    unique: true,
    required: true
  },
  poDate: {
    type: Date,
    default: Date.now
  },
  dueDate: Date,
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor'
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
  subtotal: Number,
  taxAmount: Number,
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'acknowledged', 'received', 'cancelled'],
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

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
