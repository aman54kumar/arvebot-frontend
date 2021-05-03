export const isAlphaNumeric = (data) => {
  const letters = /^[a-zA-Z0-9\s]+$/;
  if (data.match(letters)) {
    return true;
  } else {
    return false;
  }
};

export const validateCurrency = (inputCurrency) => {
  const currencyMatchExpression = /^((\d{1,3},)*\d{3}|\d{1,3})\.\d{2}$|^((\d{1,3}\.)*\d{3}|\d{1,3}),\d{2}$/;
  if (inputCurrency.match(currencyMatchExpression)) {
    return true;
  } else {
    return false;
  }
};

export const currencyDisplayValue = (inputCurrencyValue) => {
  return new Intl.NumberFormat("nb-NB", {
    style: "currency",
    currency: "NOK",
    currencyDisplay: "narrowSymbol",
  }).format(inputCurrencyValue);
};
