// Tax Calculator - Supports GST rates: 5%, 12%, 18%, 0%, 28%

function calculateLineTotal(quantity, unitPrice, taxRate) {
  const amount = quantity * unitPrice;
  const tax = amount * (taxRate / 100);
  return {
    amount,
    tax,
    total: amount + tax
  };
}

function calculateInvoiceTotals(items) {
  let subtotal = 0;
  let totalTax = 0;
  let taxBreakdown = {
    '0': 0,
    '5': 0,
    '12': 0,
    '18': 0,
    '28': 0
  };

  items.forEach(item => {
    const amount = item.quantity * item.unitPrice;
    subtotal += amount;
    const tax = amount * (item.tax / 100);
    totalTax += tax;
    
    // Track tax by rate
    const taxRate = item.tax || 0;
    if (taxBreakdown.hasOwnProperty(taxRate)) {
      taxBreakdown[taxRate] += tax;
    }
  });

  return {
    subtotal,
    totalTax,
    grandTotal: subtotal + totalTax,
    taxBreakdown
  };
}

function applyDiscount(amount, discountType, discountValue) {
  if (discountType === 'percentage') {
    return amount - (amount * (discountValue / 100));
  } else if (discountType === 'fixed') {
    return amount - discountValue;
  }
  return amount;
}

// Calculate IGST (Integrated GST) for inter-state transactions
function calculateIGST(amount, taxRate) {
  return amount * (taxRate / 100);
}

// Calculate CGST and SGST (Central and State GST) for intra-state transactions
// Both are half of the total GST rate
function calculateCGST_SGST(amount, taxRate) {
  const halfRate = taxRate / 2;
  return {
    cgst: amount * (halfRate / 100),
    sgst: amount * (halfRate / 100),
    total: amount * (taxRate / 100)
  };
}

// Validate tax rate
function isValidTaxRate(rate) {
  const validRates = [0, 5, 12, 18, 28];
  return validRates.includes(Number(rate));
}

// Get all available tax rates
function getAvailableTaxRates() {
  return ['0%', '5%', '12%', '18%', '28%'];
}

module.exports = {
  calculateLineTotal,
  calculateInvoiceTotals,
  applyDiscount,
  calculateIGST,
  calculateCGST_SGST,
  isValidTaxRate,
  getAvailableTaxRates
};
