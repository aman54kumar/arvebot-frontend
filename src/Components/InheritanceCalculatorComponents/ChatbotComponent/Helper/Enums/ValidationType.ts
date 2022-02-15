export enum ValidationType {
  emptyValue = 0,
  invalidAmount = 1,
  onlyDigit = 2,
  incorrectValueForBoolean = 3,
}
export enum DefaultWarningMessage {
  emptyValueMessage = "The field cannot be empty",
  onlyDigitMessage = "Please enter only number.",
  errorForBooleanMessage = "Please choose correct value or write 'yes/ja', 'no/nei'",
}
