// Invoice Number Generator - Generates invoice numbers with custom prefix
// Format: GP-0001, GP-0002, GP-0003, etc.

async function generateInvoiceNumber(Settings) {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      invoicePrefix: 'GP',
      invoiceStartNumber: 1
    });
  }

  const prefix = settings.invoicePrefix || 'GP';
  const number = `${prefix}-${String(settings.invoiceStartNumber).padStart(6, '0')}`;

  settings.invoiceStartNumber += 1;
  await settings.save();

  return number;
}

// Generate estimate number
async function generateEstimateNumber(Settings) {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      estimatePrefix: 'EST',
      estimateStartNumber: 1
    });
  }

  const prefix = settings.estimatePrefix || 'EST';
  const number = `${prefix}-${String(settings.estimateStartNumber).padStart(6, '0')}`;

  settings.estimateStartNumber += 1;
  await settings.save();

  return number;
}

// Generate purchase order number
async function generatePONumber(Settings) {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      poPrefix: 'PO',
      poStartNumber: 1
    });
  }

  const prefix = settings.poPrefix || 'PO';
  const number = `${prefix}-${String(settings.poStartNumber).padStart(6, '0')}`;

  settings.poStartNumber += 1;
  await settings.save();

  return number;
}

// Generate credit note number
async function generateCreditNoteNumber(Settings) {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      creditNotePrefix: 'CN',
      creditNoteStartNumber: 1
    });
  }

  const prefix = settings.creditNotePrefix || 'CN';
  const number = `${prefix}-${String(settings.creditNoteStartNumber).padStart(6, '0')}`;

  settings.creditNoteStartNumber += 1;
  await settings.save();

  return number;
}

// Generate debit note number
async function generateDebitNoteNumber(Settings) {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      debitNotePrefix: 'DN',
      debitNoteStartNumber: 1
    });
  }

  const prefix = settings.debitNotePrefix || 'DN';
  const number = `${prefix}-${String(settings.debitNoteStartNumber).padStart(6, '0')}`;

  settings.debitNoteStartNumber += 1;
  await settings.save();

  return number;
}

// Generate payment receipt number
async function generateReceiptNumber(Settings) {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({
      receiptPrefix: 'RCP',
      receiptStartNumber: 1
    });
  }

  const prefix = settings.receiptPrefix || 'RCP';
  const number = `${prefix}-${String(settings.receiptStartNumber).padStart(6, '0')}`;

  settings.receiptStartNumber += 1;
  await settings.save();

  return number;
}

module.exports = {
  generateInvoiceNumber,
  generateEstimateNumber,
  generatePONumber,
  generateCreditNoteNumber,
  generateDebitNoteNumber,
  generateReceiptNumber
};
