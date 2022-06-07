export default class InheritanceConstants {
  DESC_COHABITANT_WITHOUT_COMMON_CHILD =
    "Arvelater har ikke felles barn med samboer og vedkommende har ikke krav på arv (MED MINDRE DE VENTER FELLES BARN!).";
  DESC_NO_SPOUSE_OR_COHABITANT =
    "Arvelater etterlater hverken ektefelle eller samboer.";
  DESC_COHABITANT_NO_CLOSE_RELATIVES_2 =
    "Arvelaters nærmeste gjenlevende slektning er i tredje arvegangsklasse, men etterkommer av barnebarn av arvelaters besteforeldre. Hele arven går da til gjenlevende samboer med felles barn.";
  DESC_COHABITANT_NO_CLOSE_RELATIVES =
    "Arvelater har ingen gjenlevende slektninger i de tre første arvegangsklassene. Hele arven går da til gjenlevende samboer med felles barn.";
  DESC_SPOUSE_NO_CLOSE_RELATIVES_2 =
    "Arvelaters nærmeste gjenlevende slektning er i andre arvegangsklasse, men etterkommer av barnebarn av arvelaters besteforeldre. Hele arven går da til gjenlevende ektefellep.";
  DESC_SPOUSE_NO_CLOSE_RELATIVES =
    "Arvelater har ingen gjenlevende slektninger i de to første arvegangsklassene. Hele arven går da til gjenlevende ektefelle.";

  G = 101351;
  MINIMUM_INHERITANCE_SPOUSE_VS_CHILDREN = 4 * this.G;
  FRACTION_INHERITANCE_SPOUSE_VS_CHILDREN = 1 / 4;
  MINIMUM_INHERITANCE_SPOUSE_VS_PARENTS = 6 * this.G;
  FRACTION_INHERITANCE_SPOUSE_VS_PARENTS = 1 / 2;
  MINIMUM_INHERITANCE_COHABITANT_VS_CHILDREN = 4 * this.G;
  FRACTION_INHERITANCE_COHABITANT_VS_CHILDREN = 0;
  MINIMUM_INHERITANCE_COHABITANT_VS_PARENTS = 4 * this.G;
  FRACTION_INHERITANCE_COHABITANT_VS_PARENTS = 0;
  FRACTION_PLIKTDEL = 2 / 3;
  LINE_MAXIMUM_PLIKTDEL = 15 * this.G;

  LAW_LINKS = {
    1: "https://lovdata.no/NL/lov/1972-03-03-5/§1",
    2: "https://lovdata.no/NL/lov/1972-03-03-5/§2",
    3: "https://lovdata.no/NL/lov/1972-03-03-5/§3",
    4: "https://lovdata.no/NL/lov/1972-03-03-5/§4",
    6: "https://lovdata.no/NL/lov/1972-03-03-5/§6",
    28: "https://lovdata.no/NL/lov/1972-03-03-5/§28",
    36: "https://lovdata.no/NL/lov/1972-03-03-5/§36",
    46: "https://lovdata.no/NL/lov/1972-03-03-5/§46",
    KapittelVI: "https://lovdata.no/pro/NL/lov/1972-03-03-5/KAPITTEL_1-7",
  };

  CODE_PARAGRAPHS = {
    "4 første og annet ledd":
      "De nærmeste slektsarvingene er arvelaterens livsarvinger.\n\nArven deles likt mellom arvelaterens barn, om ikke noe annet følger av særskilte lovregler. Hvis et barn er død, går dette barnets del av arven til barnets livsarvinger med lik andel på hver gren. På samme måte arver fjernere livsarvinger. Hvis et barn er død og ikke etterlater seg livsarvinger, går dette barnets del av arven til de andre barna eller deres livsarvinger med lik andel på hver gren.",
    "5 første, andre og tredje ledd":
      "Hvis arvelateren ikke har livsarvinger, går arven til foreldrene.\n\nForeldrene arver likt. Hvis en forelder er død, går denne forelderens del av arven til hans eller hennes livsarvinger med lik andel på hver gren.\n\nHvis den ene av foreldrene er død uten å etterlate seg livsarvinger, går hele arven til den andre forelderen eller til hans eller hennes livsarvinger med lik andel på hver gren. Dør arvelateren før fylte 25 år, går likevel halvparten av arven til besteforeldrene på den døde forelderens side eller til deres livsarvinger i samsvar med § 6 dersom foreldrene verken var gift eller samboende med hverandre da den første døde, eller det forelå omstendigheter som nevnt i § 11. Er heller ingen slike arvinger i live, gjelder reglene i første punktum.",
    "6 første og annet ledd":
      "Hvis arvelateren ikke har slektsarvinger som nevnt i §§ 4 og 5, går arven til besteforeldrene eller til livsarvinger etter dem, slik at reglene i § 5 annet ledd gjelder tilsvarende. Fjernere livsarvinger etter besteforeldrene enn deres barnebarn har likevel ikke arverett etter loven.\n\nHvis en av besteforeldrene er død, og ingen barn eller barnebarn er i live, går arven som ellers ville ha tilkommet ham eller henne, til den andre av besteforeldrene på samme side eller til dennes barn eller barnebarn. Hvis det ikke er arvinger på den ene siden, går hele arven til arvingene på den andre siden.",
    "6 første ledd, andre punktum":
      "Fjernere livsarvinger etter besteforeldrene enn deres barnebarn har likevel ikke arverett etter loven.",
    "7": "Arverett etter dette kapitlet gjelder bare foreldreskap som følger av reglene i barneloven, adopsjonsloven eller annen lov.\n\nFaren og farens slekt tar ikke arv etter barnet dersom det er unnfanget som følge av en handling som er et brudd på en bestemmelse i straffeloven §§ 291, 294, 295, 296, 299, 302, 312 eller 314, og som faren er dømt for. Første punktum gjelder også hvis dommen går ut på at faren ikke kan straffes på grunn av vilkårene i straffeloven § 20.",
    "8 første ledd":
      "Ektefellen har rett til en firedel av arven når det er livsarvinger etter arvelateren, men ektefellen har uansett rett til en minstearv på fire ganger folketrygdens grunnbeløp ved arvefallet.",
    "9 første ledd":
      "Ektefellen har rett til halvparten av arven når arvelaterens nærmeste slektsarvinger er foreldrene eller deres etterkommere, men ektefellen har uansett rett til en minstearv på seks ganger folketrygdens grunnbeløp ved arvefallet.",
    "9 annet ledd":
      "Ektefellen arver alt når det verken er livsarvinger eller slektsarvinger som nevnt i første ledd etter arvelateren.",
    "10 annet ledd":
      "Et beløp tilsvarende seks ganger folketrygdens grunnbeløp ved arvefallet kan ikke fratas ektefellen ved testament. Etterlater arvelateren seg livsarvinger, er beløpsgrensen etter første punktum fire ganger folketrygdens grunnbeløp.",
    "12 første ledd":
      "Den som var samboer med arvelateren ved dødsfallet og har, har hatt eller venter barn med arvelateren, har rett til en arv på fire ganger folketrygdens grunnbeløp ved arvefallet. Dette gjelder også om det er livsarvinger etter arvelateren. § 8 annet ledd gjelder tilsvarende",
    "50 første ledd":
      "To tredeler av formuen etter arvelateren er pliktdelsarv for livsarvingene. Pliktdelsarven er likevel aldri større enn 15 ganger folketrygdens grunnbeløp ved arvefallet til hvert av arvelaterens barn eller hvert barns linje.",
    "75 første ledd":
      "Har en livsarving mottatt en ytelse av økonomisk verdi fra arvelateren, skal ytelsen avkortes i livsarvingens arv hvis dette var satt som en betingelse for ytelsen. En betingelse om avkorting bør være skriftlig og gjort kjent for de andre livsarvingene.",
    "76 første ledd, første punktum":
      "Hvis den avdøde ikke har arvinger etter loven eller etter testament, skal nettoformuen gå til frivillig virksomhet til fordel for barn og unge.",
  };
}
