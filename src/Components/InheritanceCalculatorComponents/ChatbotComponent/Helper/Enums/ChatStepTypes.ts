export enum ChatStepTypes {
    initalStep = 'initialStep',
    testatorStep = 'testatorStep',
    undividedEstateStep = 'undividedEstateStep',
    netWealthStep = 'netWealthStep',
    underAgeStep = 'underAgeStep',
    spouseChoice = 'spouseChoice',
    spouseStep = 'spouseStep',
    cohabitantChoice = 'cohabitantChoice',
    cohabitantStep = 'cohabitantStep',
    successorStep = 'successorStep',
    parentsStep = 'parentsStep',
    rearChildrenStep = 'rearChildrenStep',
    marriedParentsStep = 'marriedParentsStep',
    grandParentStep = 'grandParentStep',
    finalStep = 'finalStep',
    secondParentChoice = 'secondParentChoice',
    testatorOtherChildStep = 'testatorOtherChildStep',
}

export enum QuestionType {
    initialQuestion = 'none',
    part1 = 'part1',
    part2 = 'part2',
    part3 = 'part3',
    part4 = 'part4',
    part5 = 'part5',
    part6 = 'part6',
    part7 = 'part7',
    part8 = 'part8',
}

// export enum undividedOwnershipType {
//     felleseie = 'FELLESEIE',
//     delvis = 'DELVIS SÆREIE',
//     fullt = 'FULLT SÆREIE',
// }

// export const undividedOwnershipTypeMap: {
//     [key: string]: Record<number, undividedOwnershipType>;
// } = {
//     undividedOwnershipType: {
//         1: undividedOwnershipType.felleseie,
//         2: undividedOwnershipType.delvis,
//         3: undividedOwnershipType.fullt,
//     },
// };

export enum FormattedMessages {
    FELLESEIE = 'Chatbot.OWNERSHIP_TYPE1',
    DELVIS = 'Chatbot.OWNERSHIP_TYPE2',
    FULLT = 'Chatbot.OWNERSHIP_TYPE3',
}

export const undividedOwnershipType = {
    felleseie: ['FELLESEIE', '1'],
    delvis: ['DELVIS SÆREIE', '2'],
    fullt: ['FULLT SÆREIE', '3'],
};
