export enum ValidationType {
    emptyValue = 0,
    invalidAmount = 1,
    onlyDigit = 2,
    incorrectValueForBoolean = 3,
    incorrectValueForUndividedOptions = 4,
}
export enum DefaultWarningMessage {
    emptyValueMessage = 'The field cannot be empty.',
    onlyDigitMessage = 'Only numerical values are allowed.',
    errorForBooleanMessage = "Please choose correct value or write 'yes/ja', 'no/nei'.",
    invalidAmountMessage = 'Please enter the amount in correct format.',
    incorrectValueForUndividedMessage = 'Please choose one of the options or write them in the answer field.',
}
