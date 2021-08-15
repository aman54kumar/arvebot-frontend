export const isAlphaNumeric = (data) => {
  const letters = /^[a-zA-Z0-9\s]+$/;
  if (data.match(letters)) {
    return true;
  } else {
    return false;
  }
};

export const validateCurrency = (inputCurrency) => {
  // const currencyMatchExpression = /^((\d{1,3},)*\d{3}|\d{1,3})\.\d{2}$|^((\d{1,3}\.)*\d{3}|\d{1,3})$/;
  const currencyMatchExpression = /^\d+$/;
  if (inputCurrency.match(currencyMatchExpression)) {
    return true;
  } else {
    return false;
  }
};

export const currencyDisplayValue = (inputCurrencyValue) => {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    currencyDisplay: "narrowSymbol",
  }).format(inputCurrencyValue);
};

export const validateSpouseReply = (inputSpouseResponse) => {
  console.log(inputSpouseResponse);
  switch (inputSpouseResponse) {
    case "":
      console.log("blank");
      break;
    case 1:
      console.log("1");
      break;
    default:
      console.log("default");
  }
};
