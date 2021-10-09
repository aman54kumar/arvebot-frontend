// import { FormattedMessage } from "react-intl";

export const isAlphaNumeric = (data: string): boolean => {
  const letters = /^[a-zA-Z0-9\s]+$/;
  if (data.match(letters)) {
    return true;
  } else {
    return false;
  }
};

export const validateCurrency = (inputCurrency: string): boolean => {
  // const currencyMatchExpression = /^((\d{1,3},)*\d{3}|\d{1,3})\.\d{2}$|^((\d{1,3}\.)*\d{3}|\d{1,3})$/;
  const currencyMatchExpression = /^\d+$/;
  if (inputCurrency.match(currencyMatchExpression)) {
    return true;
  } else {
    return false;
  }
};

export const currencyDisplayValue = (inputCurrencyValue: number): string => {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    currencyDisplay: "narrowSymbol",
  }).format(inputCurrencyValue);
};
