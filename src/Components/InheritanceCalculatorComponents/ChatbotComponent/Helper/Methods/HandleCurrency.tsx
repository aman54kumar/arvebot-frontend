
// error:
// 1- no digits in input error
// 2- separatorCount error
// 3- digitsBeforeSeparatorValue error
// 4- unknown error, debug
// 5- normal pass
//
const checkSeparatorCount = (initialCurrencyValue: string): number => {
    let checkSeparatorCount = 0;
    for (const i of initialCurrencyValue) {
        if (i == "," || i == " " || i == ".") {
            checkSeparatorCount += 1;
        }
    }
    if (checkSeparatorCount == 0) {
        return 0 // no separators, valid input, format it.
    }
    else if (checkSeparatorCount > 1) {
        // more than 1 symbol in the entered value, invalid input, error
        return 2
    }
    else {
        return 1 // one separator, valid input.
    }
}


const checkDigitsBeforeSeparatorValue = (initialCurrencyValue: string): string => {
    let digitsBeforeSymbol = 0;
    for (const i of initialCurrencyValue) {
        if (digitsBeforeSymbol > 3) {
            // more than 3 digits before symbol
            return "incorrect"
        }
        else if (i !== "," && i !== " " && i !== ".") {
            digitsBeforeSymbol += 1;
        }
        else {
            digitsBeforeSymbol = 0;
        }

    }
    return "correct"
}

const removeTextFromCurrencyString = (inputCurrency: string): string => {
    let beginningValue = "";
    let endValue = ""

    // match and remove extra text at the beginning
    const matchesStart: RegExpMatchArray | null = inputCurrency.match(/^[\D]{0,}/)
    if (matchesStart) {
        const matchStartResult = matchesStart[0];
        beginningValue = inputCurrency.substring(matchStartResult.length,)
    }

    // match and remove extra text at the end
    const matchesEnd: RegExpMatchArray | null = beginningValue.match(/[^\d]{0,}$/)
    if (matchesEnd) {
        const matchEndResult = matchesEnd[0];
        endValue = beginningValue.substring(0, beginningValue.length - matchEndResult.length)
    }

    return endValue.replace(" ", "").replace(".", "").replace(",", "")
}

export const ParseCurrencyStringForOutput = (unformattedCurrency: string): string => {
    return new Intl.NumberFormat("no-NO", {
        style: "currency",
        currency: "NOK",
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(Number(unformattedCurrency.replace(/[^0-9.-]+/g, ""))).replace("kr", "kr.").concat(",-");

}

export const validateCurrency = (inputCurrency: string): boolean => {
    // const currencyMatchExpression = /^((\d{1,3},)*\d{3}|\d{1,3})\.\d{2}$|^((\d{1,3}\.)*\d{3}|\d{1,3})$/;
    const currencyMatchExpression = /^\d+$/;
    if (inputCurrency.match(currencyMatchExpression)) {
        return true;
    } else {
        return false;
    }
};

export const CurrencyOutput = (inputCurrency: string): [number, string] => {

    if ((/\d/).test(inputCurrency)) {
        const initialCurrencyValue: string = removeTextFromCurrencyString(inputCurrency)

        let digitsBeforeSeparatorValue = "correct"
        const separatorCount = checkSeparatorCount(initialCurrencyValue);
        if (separatorCount !== 0) {
            digitsBeforeSeparatorValue = checkDigitsBeforeSeparatorValue(initialCurrencyValue)
        }
        if ((separatorCount === 0 || separatorCount === 1) && digitsBeforeSeparatorValue === "correct") {
            return [5, initialCurrencyValue]
        }

        else {
            if (separatorCount === 2) {
                return [2, "separatorCount"]
            }
            else if (digitsBeforeSeparatorValue === "incorrect") {
                return [3, "digitsBeforeSeparatorValue"]
            }
            else {
                return [4, "unknown error, debug"]
            }
        }
    }
    else {
        // show error message and ask question again
        return [1, ""]
    }

}
