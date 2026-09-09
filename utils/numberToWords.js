const NUM_ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const NUM_TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function twoDigitWords(n) {
  if (n < 20) return NUM_ONES[n];
  return NUM_TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + NUM_ONES[n % 10] : '');
}

function threeDigitWords(n) {
  let s = '';
  if (n >= 100) {
    s += NUM_ONES[Math.floor(n / 100)] + ' Hundred';
    n = n % 100;
    if (n) s += ' ';
  }
  if (n) s += twoDigitWords(n);
  return s;
}

function numToWordsIndian(num) {
  num = Math.floor(num);
  if (num === 0) return 'Zero';

  let crore = Math.floor(num / 10000000);
  num %= 10000000;
  let lakh = Math.floor(num / 100000);
  num %= 100000;
  let thousand = Math.floor(num / 1000);
  num %= 1000;
  let rest = num;

  const parts = [];
  if (crore) parts.push(threeDigitWords(crore) + ' Crore');
  if (lakh) parts.push(threeDigitWords(lakh) + ' Lakh');
  if (thousand) parts.push(threeDigitWords(thousand) + ' Thousand');
  if (rest) parts.push(threeDigitWords(rest));

  return parts.join(' ');
}

function amountInWords(amount) {
  amount = Number(amount) || 0;
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);

  let words = 'Rupees ' + numToWordsIndian(rupees);
  if (paise > 0) words += ' and ' + numToWordsIndian(paise) + ' Paise';
  words += ' Only';

  return words;
}

module.exports = { numToWordsIndian, amountInWords };
