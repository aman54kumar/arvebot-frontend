import { InheritanceCalculation } from "../InheritanceCalculation";
import { PliktdelsarvCalculation } from "../PliktdelsarvCalculation";
import { UndividedCalculation } from "../UndividedCalculation";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export class InheritanceReport {
  inheritance_calculation: InheritanceCalculation;
  pliktdelsarv_calculation: PliktdelsarvCalculation;
  undivided_calculation: UndividedCalculation;
  family_tree_filename: string;
  constructor(
    inheritance_calculation: InheritanceCalculation,
    pliktdelsarv_calculation: PliktdelsarvCalculation,
    undivided_estate_calculation: UndividedCalculation,
    family_tree_filename: string
  ) {
    this.inheritance_calculation = inheritance_calculation;
    this.pliktdelsarv_calculation = pliktdelsarv_calculation;
    this.undivided_calculation = undivided_estate_calculation;
    this.family_tree_filename = family_tree_filename;
  }

  add_inheritance_calculation = () => {
    this.add_survivor_paragraph();
    this.add_inheritance_calculation_relatives();
    this.add_inheritance_calculation_summary();
  };

  add_inheritance_calculation_summary = () => {
    throw new Error("Method not implemented.");
  };
  add_inheritance_calculation_relatives = () => {
    throw new Error("Method not implemented.");
  };
  add_survivor_paragraph = () => {
    throw new Error("Method not implemented.");
  };

  add_legal_references = () => {
    throw new Error("Method not implemented.");
  };

  add_legal_reference = () => {
    throw new Error("Method not implemented.");
  };
  add_introduction = () => {
    throw new Error("Method not implemented.");
  };
  add_undivided_estate_calculation = () => {
    throw new Error("Method not implemented.");
  };
  add_undivided_estate_relatives = () => {
    throw new Error("Method not implemented.");
  };
  add_undivided_estate_summary = () => {
    throw new Error("Method not implemented.");
  };
  add_pliktdelsarv = () => {
    throw new Error("Method not implemented.");
  };
  add_pliktdelsarv_introduction = () => {
    throw new Error("Method not implemented.");
  };
  add_pliktdelsarv_surviving_spouse_cohabitant = () => {
    throw new Error("Method not implemented.");
  };
  add_pliktdelsarv_relatives = () => {
    throw new Error("Method not implemented.");
  };
  add_pliktdelsarv_summary = () => {
    throw new Error("Method not implemented.");
  };
  add_notes_and_caveats = () => {
    throw new Error("Method not implemented.");
  };

  add_lovdata_link = () => {
    throw new Error("Method not implemented.");
  };
  unravel_chain_to_string = () => {
    throw new Error("Method not implemented.");
  };
  unravel_chains_to_string = () => {
    throw new Error("Method not implemented.");
  };
  add_hyperlink = () => {
    throw new Error("Method not implemented.");
  };
}
