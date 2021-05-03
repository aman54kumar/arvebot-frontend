export const isAlphaNumeric = (data) => {
  const letters = /^[a-zA-Z0-9\s]+$/;
  if (data.match(letters)) {
    return true;
  } else {
    return false;
  }
};

export const validateCurrency = (inputCurrency) => {
  if (inputCurrency.match(/^-?\d+$/) || inputCurrency.match(/^\d+\.\d+$/)) {
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
