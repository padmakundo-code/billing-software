# Billing Software API Documentation

## Overview
This API provides endpoints for managing invoices, estimates, purchase orders, and related billing operations for the billing software system.

---

## Utility Functions

### 1. Number to Words Conversion

#### `numToWordsIndian(num)`
Converts numbers to Indian rupees words format.

**Parameters:**
- `num` (number): The number to convert

**Returns:** (string) Number in words
- Example: `numToWordsIndian(1234)` returns `"One Thousand Two Hundred Thirty Four"`

**Usage:**
```javascript
const { numToWordsIndian, amountInWords } = require('./utils/numberToWords');

const words = numToWordsIndian(5000);
console.log(words); // "Five Thousand"
```

#### `amountInWords(amount)`
Converts amount to words including rupees and paise.

**Parameters:**
- `amount` (number): The amount to convert

**Returns:** (string) Amount in words with rupees and paise
- Example: `amountInWords(1500.50)` returns `"Rupees One Thousand Five Hundred and Fifty Paise Only"`

**Usage:**
```javascript
const receipt = amountInWords(2500.75);
console.log(receipt); // "Rupees Two Thousand Five Hundred and Seventy Five Paise Only"
```

---

### 2. Tax Calculator

#### `calculateLineTotal(quantity, unitPrice, taxRate)`
Calculates total amount with tax for a single line item.

**Parameters:**
- `quantity` (number): Quantity of items
- `unitPrice` (number): Price per unit
- `taxRate` (number): Tax rate percentage (0, 5, 12, 18, 28)

**Returns:** (object)
```javascript
{
  amount: 1000,
  tax: 180,
  total: 1180
}
```

**Usage:**
```javascript
const { calculateLineTotal } = require('./utils/taxCalculator');

const lineItem = calculateLineTotal(10, 100, 18);
console.log(lineItem);
// { amount: 1000, tax: 180, total: 1180 }
```

#### `calculateInvoiceTotals(items)`
Calculates totals for entire invoice with tax breakdown.

**Parameters:**
- `items` (array): Array of items with properties: `quantity`, `unitPrice`, `tax`

**Returns:** (object)
```javascript
{
  subtotal: 5000,
  totalTax: 900,
  grandTotal: 5900,
  taxBreakdown: {
    '0': 0,
    '5': 250,
    '12': 600,
    '18': 50,
    '28': 0
  }
}
```

**Usage:**
```javascript
const { calculateInvoiceTotals } = require('./utils/taxCalculator');

const items = [
  { quantity: 10, unitPrice: 100, tax: 5 },
  { quantity: 5, unitPrice: 200, tax: 18 }
];

const totals = calculateInvoiceTotals(items);
console.log(totals);
```

#### `applyDiscount(amount, discountType, discountValue)`
Applies discount to an amount.

**Parameters:**
- `amount` (number): Original amount
- `discountType` (string): "percentage" or "fixed"
- `discountValue` (number): Discount amount or percentage

**Returns:** (number) Final amount after discount

**Usage:**
```javascript
const { applyDiscount } = require('./utils/taxCalculator');

const finalAmount = applyDiscount(5000, 'percentage', 10);
console.log(finalAmount); // 4500
```

#### `calculateCGST_SGST(amount, taxRate)`
Calculates Central and State GST for intra-state transactions.

**Parameters:**
- `amount` (number): Taxable amount
- `taxRate` (number): Tax rate percentage

**Returns:** (object)
```javascript
{
  cgst: 90,    // Central GST
  sgst: 90,    // State GST
  total: 180   // Total GST
}
```

**Usage:**
```javascript
const { calculateCGST_SGST } = require('./utils/taxCalculator');

const gst = calculateCGST_SGST(1000, 18);
console.log(gst);
// { cgst: 90, sgst: 90, total: 180 }
```

#### `isValidTaxRate(rate)`
Validates if tax rate is supported.

**Parameters:**
- `rate` (number): Tax rate to validate

**Returns:** (boolean) true if valid, false otherwise

**Valid Rates:** 0%, 5%, 12%, 18%, 28%

#### `getAvailableTaxRates()`
Returns all available tax rates.

**Returns:** (array) Array of tax rate strings

**Usage:**
```javascript
const { getAvailableTaxRates } = require('./utils/taxCalculator');

console.log(getAvailableTaxRates());
// ['0%', '5%', '12%', '18%', '28%']
```

---

### 3. Invoice Number Generator

#### `generateInvoiceNumber(Settings)`
Generates next invoice number with GP prefix.

**Parameters:**
- `Settings` (Model): Database Settings model

**Returns:** (Promise<string>) Invoice number (e.g., "GP-000001")

**Usage:**
```javascript
const { generateInvoiceNumber } = require('./utils/invoiceNumberGenerator');

const invoiceNo = await generateInvoiceNumber(Settings);
console.log(invoiceNo); // "GP-000001"
```

#### `generateEstimateNumber(Settings)`
Generates estimate number with EST prefix.

**Returns:** (Promise<string>) Estimate number (e.g., "EST-000001")

#### `generatePONumber(Settings)`
Generates purchase order number with PO prefix.

**Returns:** (Promise<string>) PO number (e.g., "PO-000001")

#### `generateCreditNoteNumber(Settings)`
Generates credit note number with CN prefix.

**Returns:** (Promise<string>) Credit note number (e.g., "CN-000001")

#### `generateDebitNoteNumber(Settings)`
Generates debit note number with DN prefix.

**Returns:** (Promise<string>) Debit note number (e.g., "DN-000001")

#### `generateReceiptNumber(Settings)`
Generates payment receipt number with RCP prefix.

**Returns:** (Promise<string>) Receipt number (e.g., "RCP-000001")

---

## Error Handling

All functions should be wrapped in try-catch blocks:

```javascript
try {
  const invoiceNo = await generateInvoiceNumber(Settings);
  console.log(invoiceNo);
} catch (error) {
  console.error('Error generating invoice number:', error);
}
```

---

## Common Use Cases

### Creating an Invoice

```javascript
const invoiceNo = await generateInvoiceNumber(Settings);
const items = [
  { quantity: 5, unitPrice: 1000, tax: 18 },
  { quantity: 3, unitPrice: 500, tax: 5 }
];

const totals = calculateInvoiceTotals(items);
const amountText = amountInWords(totals.grandTotal);

const invoice = {
  invoiceNumber: invoiceNo,
  items: items,
  subtotal: totals.subtotal,
  totalTax: totals.totalTax,
  grandTotal: totals.grandTotal,
  amountInWords: amountText,
  taxBreakdown: totals.taxBreakdown
};
```

### Applying Discount and Calculating Tax

```javascript
let finalAmount = totals.grandTotal;
finalAmount = applyDiscount(finalAmount, 'percentage', 10); // 10% discount
const gst = calculateCGST_SGST(finalAmount, 18);
```

---

## Database Schema

### Settings Collection
```javascript
{
  invoicePrefix: String (default: 'GP'),
  invoiceStartNumber: Number (default: 1),
  estimatePrefix: String (default: 'EST'),
  estimateStartNumber: Number (default: 1),
  poPrefix: String (default: 'PO'),
  poStartNumber: Number (default: 1),
  creditNotePrefix: String (default: 'CN'),
  creditNoteStartNumber: Number (default: 1),
  debitNotePrefix: String (default: 'DN'),
  debitNoteStartNumber: Number (default: 1),
  receiptPrefix: String (default: 'RCP'),
  receiptStartNumber: Number (default: 1)
}
```

---

## Support

For issues or questions, contact: padma.kundo@gmail.com
