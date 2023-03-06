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
    20: ['20', 'twenty', 'tyve', 'tjue'],
    21: ['21'],
    // until 40.
};

export const returnKeyFromEnteredNumberText = (chosenValue: string) => {
    return Object.keys(numberInputTypesObject).find((key) =>
        (numberInputTypesObject as any)[key].includes(
            chosenValue.toLowerCase(),
        ),
    );
};
