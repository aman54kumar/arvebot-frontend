import { ChatbotInterface } from '../ChatbotComponent/Generics';
import { NodeEntity } from '../ChatbotComponent/Helper/Classes/NodeEntity';
import Norsk from '../../../languages/translationNO.json';
import { createIntl, createIntlCache } from 'react-intl';
import ActionProvider from '../ChatbotComponent/ActionProvider';
import {
    getNode,
    getPerson,
    get_class_and_distance_closest_surviving_relative,
} from '../ChatbotComponent/ActionProviderMethods/OtherChatbotMethods';
import InheritanceConstants from '../ChatbotComponent/Helper/Methods/InheritanceConstants';
import { combine_duplicates, split_evenly_between_lines } from './ReportUtils';
const cache = createIntlCache();
const intl = createIntl({ locale: 'nb-NO', messages: Norsk }, cache);

interface InheritanceCalculationInterface {
    state: ChatbotInterface;
    actionProvider: ActionProvider;
    person: NodeEntity;
    survivor: number | null;
    survivor_type: string;
    class_closest: number | undefined;
    distance_closest: number | undefined;
    old_surviving_reference_paragraphs: string;
    surviving_reference_paragraphs: Array<string>;
    minimum_surviving_inheritance: number;
    surviving_fraction: number;
    descriptive_text: string;
    survivor_inheritance_sum: number;
    genealogy_inheritance_sum: number;
    splits_with_chains: Array<inheritanceFractionType>;
    genealogy_inheritance: Array<inheritanceFractionType>;
    inheritanceType: number;
    netWealth: number;
}
export type inheritanceFractionType = {
    person: string;
    frac: number;
    chains: Array<string>;
};

export interface ReportMethods {
    computeInheritance(): void;
    compute_default_genealogy_splits_with_chains(
        person: number,
    ): inheritanceFractionType[];
    computeGenealogyInheritance(person_id: number): inheritanceFractionType[];
}

export class ReportCalculationBase implements InheritanceCalculationInterface {
    state: ChatbotInterface;
    actionProvider: ActionProvider;
    person: NodeEntity;
    survivor: number | null = null;
    survivor_type = '';
    class_closest: number | undefined;
    distance_closest: number | undefined;
    old_surviving_reference_paragraphs = '';
    surviving_reference_paragraphs: string[] = [];
    minimum_surviving_inheritance = 0;
    surviving_fraction = 0;
    descriptive_text = '';
    survivor_inheritance_sum = 0;
    genealogy_inheritance_sum = 0;
    splits_with_chains: Array<inheritanceFractionType> = [];
    genealogy_inheritance: Array<inheritanceFractionType> = [];
    genealogy_splits: Array<inheritanceFractionType> = [];
    will: undefined;
    inheritanceType: number;
    netWealth: number;
    constructor(
        person: NodeEntity,
        actionProvider: ActionProvider,
        state: ChatbotInterface,
        inheritanceType: number,
        will = undefined,
    ) {
        this.state = state;
        this.actionProvider = actionProvider;
        this.person = getNode(person._id, this.state.nodeMap);
        this.will = will;
        this.inheritanceType = inheritanceType;
        this.netWealth = state.netWealth;
    }

    initializeInheritance = () => {
        if (this.person === undefined) {
            return;
        }
        console.log('Computing inheritances');
        this.initializeInheritanceVariablesCommon();
    };

    initializePliktInheritance = () => {
        console.log('Computing pliktdelsarv');

        [this.class_closest, this.distance_closest] =
            get_class_and_distance_closest_surviving_relative(
                this.state.testator,
                this.state,
            );

        if (this.person.has_surviving_spouse()) {
            this.survivor = this.person._spouse;
            this.survivor_type = intl.formatMessage({
                id: 'REPORT.Inheritance.survivorType1',
            });

            this.surviving_reference_paragraphs.push(
                intl.formatMessage({
                    id: 'REPORT.Inheritance.surviving_reference_paragraphs_10annet',
                }),
            );
            this.minimum_surviving_inheritance =
                InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN;
            if (this.class_closest === 1) {
                this.descriptive_text = intl.formatMessage({
                    id: 'REPORT.Inheritance.DescriptiveTest_firstClass_spouse_4G',
                });
            } else {
                this.descriptive_text = intl.formatMessage({
                    id: 'REPORT.Inheritance.DescriptiveTest_firstClass_spouse_6G',
                });
            }
        } else {
            this.survivor = null;
            this.surviving_reference_paragraphs = [];
            this.descriptive_text =
                InheritanceConstants.DESC_NO_SPOUSE_OR_COHABITANT;
            this.minimum_surviving_inheritance = 0;
        }
    };

    initializeUndividedInheritance = () => {
        console.log('Computing undivided estate inheritances');

        this.initializeInheritanceVariablesCommon();
    };

    computeMethod = (inheritanceOption: number) => {
        switch (inheritanceOption) {
            case 1:
                this.initializeInheritance();
                break;
            case 2:
                this.initializePliktInheritance();
                break;
            case 3:
                this.initializeUndividedInheritance();
                break;
            default:
                console.log('check error');
        }
    };

    initializeInheritanceVariablesCommon = () => {
        [this.class_closest, this.distance_closest] =
            get_class_and_distance_closest_surviving_relative(
                this.state.testator,
                this.state,
            );
        if (this.person.has_surviving_spouse()) {
            this.survivor = this.person._spouse;
            this.survivor_type = intl.formatMessage({
                id: 'REPORT.Inheritance.survivorType1',
            });

            if (this.class_closest === undefined || this.class_closest > 2) {
                this.old_surviving_reference_paragraphs = intl.formatMessage({
                    id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_6forste',
                });
                this.surviving_reference_paragraphs.push(
                    intl.formatMessage({
                        id: 'REPORT.Inheritance.surviving_reference_paragraphs_9annet',
                    }),
                );
                this.minimum_surviving_inheritance = 0;
                this.surviving_fraction = 1;
                this.descriptive_text = intl.formatMessage({
                    id: 'REPORT.Inheritance.DESC_SPOUSE_NO_CLOSE_RELATIVES',
                });
            } else if (this.class_closest === 1) {
                this.old_surviving_reference_paragraphs = intl.formatMessage({
                    id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_6forste',
                });
                this.surviving_reference_paragraphs.push(
                    intl.formatMessage({
                        id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_8forste',
                    }),
                );
                this.minimum_surviving_inheritance =
                    InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN;
                this.surviving_fraction =
                    InheritanceConstants.FRACTION_INHERITANCE_SPOUSE_VS_CHILDREN;
                this.descriptive_text = intl.formatMessage({
                    id: 'REPORT.Inheritance.DescriptiveText4G',
                });
            } else if (this.class_closest === 2) {
                this.old_surviving_reference_paragraphs = intl.formatMessage({
                    id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_6forste',
                });
                this.surviving_reference_paragraphs.push(
                    intl.formatMessage({
                        id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_9forste',
                    }),
                );
                this.minimum_surviving_inheritance =
                    InheritanceConstants.MINIMUM_INHERITANCE_SPOUSE_VS_PARENTS;
                this.surviving_fraction =
                    InheritanceConstants.FRACTION_INHERITANCE_SPOUSE_VS_PARENTS;
                this.descriptive_text = intl.formatMessage({
                    id: 'REPORT.Inheritance.DescriptiveText6G',
                });
            }
        } else if (this.person.has_surviving_cohabitant()) {
            this.survivor = this.person._cohabitant;
            this.survivor_type = intl.formatMessage({
                id: 'REPORT.Inheritance.survivorType2',
            });

            if (this.class_closest === undefined || this.class_closest > 3) {
                this.old_surviving_reference_paragraphs = intl.formatMessage({
                    id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste',
                });
                this.surviving_reference_paragraphs.push(
                    intl.formatMessage({
                        id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_12forste',
                    }),
                );
                this.minimum_surviving_inheritance = 0;
                this.surviving_fraction = 1;
                this.descriptive_text = intl.formatMessage({
                    id: 'REPORT.Inheritance.DESC_COHABITANT_NO_CLOSE_RELATIVES',
                });
            } else if (this.class_closest === 1) {
                this.old_surviving_reference_paragraphs = intl.formatMessage({
                    id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste',
                });
                this.surviving_reference_paragraphs.push(
                    intl.formatMessage({
                        id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_12forste',
                    }),
                );
                this.minimum_surviving_inheritance =
                    InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_CHILDREN;
                this.surviving_fraction =
                    InheritanceConstants.FRACTION_INHERITANCE_COHABITANT_VS_CHILDREN;
                this.descriptive_text = intl.formatMessage({
                    id: 'REPORT.Inheritance.DescriptiveText_firstClass_cohab_4G',
                });
            } else if (this.class_closest === 2) {
                this.old_surviving_reference_paragraphs = intl.formatMessage({
                    id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste',
                });
                this.surviving_reference_paragraphs.push(
                    intl.formatMessage({
                        id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_12forste',
                    }),
                );
                this.minimum_surviving_inheritance =
                    InheritanceConstants.MINIMUM_INHERITANCE_COHABITANT_VS_PARENTS;
                this.surviving_fraction =
                    InheritanceConstants.FRACTION_INHERITANCE_COHABITANT_VS_PARENTS;
                this.descriptive_text = intl.formatMessage({
                    id: 'REPORT.Inheritance.DescriptiveText_secondClass_cohab_4G',
                });
            } else if (this.class_closest === 3) {
                if (this.distance_closest && this.distance_closest <= 2) {
                    this.old_surviving_reference_paragraphs =
                        intl.formatMessage({
                            id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste',
                        });
                    this.surviving_reference_paragraphs.push(
                        intl.formatMessage({
                            id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_12forste',
                        }),
                    );
                    this.minimum_surviving_inheritance =
                        4 * InheritanceConstants.G;
                    this.surviving_fraction = 0;
                    this.descriptive_text = intl.formatMessage({
                        id: 'REPORT.Inheritance.DescriptiveText_thirdClass_cohab_4G',
                    });
                } else {
                    this.old_surviving_reference_paragraphs =
                        intl.formatMessage({
                            id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_28Bforste',
                        });
                    this.surviving_reference_paragraphs.push(
                        intl.formatMessage({
                            id: 'REPORT.Inheritance.old_surviving_reference_paragraphs_12forste',
                        }),
                    );
                    this.minimum_surviving_inheritance = 0;
                    this.surviving_fraction = 1;
                    this.descriptive_text = intl.formatMessage({
                        id: 'REPORT.Inheritance.DESC_COHABITANT_NO_CLOSE_RELATIVES_2',
                    });
                }
            }
        } else {
            this.survivor = null;
            this.surviving_reference_paragraphs = [];
            this.minimum_surviving_inheritance = 0;
            this.surviving_fraction = 0;
            this.descriptive_text = intl.formatMessage({
                id: 'REPORT.Inheritance.DESC_NO_SPOUSE_OR_COHABITANT',
            });
        }
    };

    computeGenealogyInheritance = (
        person_id: number,
        state: ChatbotInterface,
    ): void => {
        this.survivor_inheritance_sum = Math.min(
            this.state.netWealth,
            Math.max(
                this.minimum_surviving_inheritance,
                this.surviving_fraction * this.state.netWealth,
            ),
        );
        this.genealogy_inheritance_sum =
            this.state.netWealth - this.survivor_inheritance_sum;
        if (this.genealogy_inheritance_sum !== 0) {
            this.splits_with_chains =
                this.compute_default_genealogy_splits_with_chains(
                    person_id,
                    this.actionProvider,
                    state,
                );
            this.genealogy_splits = combine_duplicates(this.splits_with_chains);

            this.genealogy_splits.map(
                (genealogy_split: inheritanceFractionType) => {
                    this.genealogy_inheritance.push({
                        person: genealogy_split.person,
                        frac:
                            genealogy_split.frac *
                            this.genealogy_inheritance_sum,
                        chains: genealogy_split.chains,
                    });
                },
            );
        } else {
            this.splits_with_chains = [];
            this.genealogy_splits = [];
            this.genealogy_inheritance = [];
        }
    };

    computeGenealogyPliktInheritance = (
        person_id: number,
        state: ChatbotInterface,
    ): void => {
        this.survivor_inheritance_sum = Math.min(
            this.netWealth,
            this.minimum_surviving_inheritance,
        );

        this.genealogy_inheritance_sum = Math.min(
            this.netWealth - this.survivor_inheritance_sum,
            this.netWealth * InheritanceConstants.FRACTION_PLIKTDEL,
            InheritanceConstants.LINE_MAXIMUM_PLIKTDEL *
                this.person._children.length,
        );

        if (this.genealogy_inheritance_sum !== 0) {
            this.splits_with_chains =
                this.compute_default_genealogy_splits_with_chains(
                    person_id,
                    this.actionProvider,
                    state,
                );
            this.genealogy_splits = combine_duplicates(this.splits_with_chains);

            this.genealogy_splits.map(
                (genealogy_split: inheritanceFractionType) => {
                    return this.genealogy_inheritance.push({
                        person: genealogy_split.person,
                        frac:
                            genealogy_split.frac *
                            this.genealogy_inheritance_sum,
                        chains: genealogy_split.chains,
                    });
                },
            );
        }
    };

    compute_default_genealogy_splits_with_chains = (
        person: number,
        actionProvider: ActionProvider,
        state: ChatbotInterface,
    ): Array<inheritanceFractionType> => {
        const personNode = getNode(person, state.nodeMap);
        const personObject = getPerson(person, state.personsMap);
        const class_closest = get_class_and_distance_closest_surviving_relative(
            personNode,
            state,
        )[0];
        if (class_closest === 1) {
            return split_evenly_between_lines(
                actionProvider,
                state,
                personNode._children,
            );
        } else if (class_closest === 2) {
            const firstParentSpouse = getNode(
                personNode._parents[0],
                state.nodeMap,
            )._spouse;
            if (
                !personObject._underAge ||
                firstParentSpouse === personNode._parents[1]
            ) {
                return split_evenly_between_lines(
                    actionProvider,
                    state,
                    personNode._parents,
                );
            } else {
                return split_evenly_between_lines(
                    actionProvider,
                    state,
                    personNode._parents,
                    undefined,
                    true,
                );
            }
        } else if (class_closest === 3) {
            const grandParent_splits = split_evenly_between_lines(
                actionProvider,
                state,
                personNode._parents,
                2,
            );
            let num = 0;
            for (const splits of grandParent_splits) {
                if (splits) {
                    num = num + 1;
                }
            }
            const resultGrandParentSplit: Array<inheritanceFractionType> = [];
            grandParent_splits.map((grandParent_split) => {
                resultGrandParentSplit.push({
                    person: grandParent_split.person,
                    frac: grandParent_split.frac / num,
                    chains: grandParent_split.chains,
                });
            });
            return resultGrandParentSplit;
        } else if (class_closest === undefined || class_closest > 3) return [];
        else return [];
    };
}
