const numberInputTypesObject = {
    0: ['0', 'zero', 'null', 'ingen', 'None', 'ikkje nokon'],
    1: ['1', 'one', 'en', 'ett', 'et', 'ein', 'eitt', 'eit'],
    2: ['2', 'two', 'to'],
    3: ['3', 'three', 'tre'],
    4: ['4', 'four', 'fire'],
    5: ['5', 'five', 'fem'],
    6: ['6', 'six', 'seks'],
    7: ['7', 'seven', 'syv', 'sju'],
    8: ['8', 'eight', 'aatte', 'åtte'],
    9: ['9', 'nine', 'ni'],
    10: ['10', 'ten', 'ti'],
    11: ['11', 'eleven', 'elleve'],
    12: ['12', 'twelve', 'tolv'],
    13: ['13', 'thirteen', 'tretten'],
    14: ['14', 'fourteen', 'fjorten'],
    15: ['15', 'fifteen', 'femten'],
    16: ['16', 'sixteen', 'seksten'],
    17: ['17', 'seventeen', 'sytten', 'søtten'],
    18: ['18', 'eighteen', 'atten'],
    19: ['19', 'nineeen', 'nitten'],
    21: ['21', 'twenty one', 'tjue en'],
    22: ['22', 'twenty two', 'tjue to'],
    23: ['23', 'twenty three', 'tjue tre'],
    24: ['24', 'twenty four', 'tjue fire'],
    25: ['25', 'twenty five', 'tjue fem'],
    26: ['26', 'twenty six', 'tjue seks'],
    27: ['27', 'twenty seven', 'tjue syv'],
    28: ['28', 'twenty eight', 'tjue åtte'],
    29: ['29', 'twenty nine', 'tjue ni'],
    30: ['30', 'thirty', 'tretti'],
    31: ['31', 'thirty one', 'tretti en'],
    32: ['32', 'thirty two', 'tretti to'],
    33: ['33', 'thirty three', 'tretti tre'],
    34: ['34', 'thirty four', 'tretti fire'],
    35: ['35', 'thirty five', 'tretti fem'],
    36: ['36', 'thirty six', 'tretti seks'],
    37: ['37', 'thirty seven', 'tretti syv'],
    38: ['38', 'thirty eight', 'tretti åtte', 'tretti atte'],
    39: ['39', 'thirty nine', 'tretti ni'],
    40: ['40', 'forty', 'førti', 'forti'],
};

/**
 * Returns the key from the dictionary based on the entered number text.
 * @param chosenValue The entered number text.
 * @returns The key corresponding to the entered number text, or the original value if no match is found.
 */
export const returnKeyFromEnteredNumberText = (chosenValue: string) => {
    // Format the chosen value by converting to lowercase and removing non-alphanumeric characters.
    const formattedChosenValue = chosenValue
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

    // Find the key in the dictionary `numberInputTypesObject` that matches the formatted chosen value.
    const key = Object.keys(numberInputTypesObject).find((key) =>
        (numberInputTypesObject as any)[key].some(
            (value: string) =>
                value.replace(/[^a-z0-9]/g, '') === formattedChosenValue,
        ),
    );

    // Return the key if a match is found, otherwise return the original value.
    return key ?? chosenValue;
};
