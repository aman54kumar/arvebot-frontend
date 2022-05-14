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
    "1 første og annet ledd":
      "Næraste slektsarvingar er avkomet (livsarvingane) til arvelataren.\n\nBarna til arvelataren arvar likt dersom ikkje anna går fram av særskilde lovreglar. Er eit barn død, går arvelotten til livsarvingane etter barnet, med lik part på kvar grein.",
    "2 første, andre og tredje ledd":
      "Har arvelataren ikkje livsarving, går arven til foreldra hans.\n\nForeldre arvar likt. Er far eller mor død, går arvelotten til hans eller hennar livsarvingar, med lik part på kvar grein.\n\nEr ein av foreldra død, og er det ikkje livsarving etter han, går heile arven til den andre av foreldra eller til hans eller hennar livsarvingar. Døyr arvelataren før fylte 18 år, går likevel halve arven til besteforeldra på den døde fars eller mors side eller til deira livsarvingar i samsvar med § 3, dersom foreldra ikkje var gifte med kvarandre då den første døydde eller det låg føre omstende som nemnt i § 8. Er det heller ingen slike arvingar i live, gjeld reglane i første punktum.",
    "3 første ledd, andre punktum":
      "Fjernare slektningar enn barnebarn til besteforeldre har likevel ikkje arverett etter loven.",
    "3 første og annet ledd":
      "Har arvelataren ikkje livsarving eller ektemake, og lever ikkje far eller mor, eller livsarving etter far eller mor, går arven til besteforeldra hans eller til livsarvingar etter dei, slik at reglane i § 2 andre ledd gjeld tilsvarande. Fjernare slektningar enn barnebarn til besteforeldre har likevel ikkje arverett etter loven.\n\nEr ein av besteforeldra død utan barn eller barnebarn i live, går arvelotten hans til den andre av besteforeldra på same side eller til barn eller barnebarn til denne. Er det ikkje arvingar på den eine sida, går heile arven til arvingane på den andre sida.",
    4: "Arverett etter kapitlet her gjeld berre morskap eller farskap som følgjer av reglane i barnelova.​\n\nFaren og farsslekta tar ikkje arv etter barnet dersom det er avla med ei handling som er brotsverk mot noka føresegn i straffelovas​ §§ 291, 292 bokstav a og d, 293, 294, 295, 296, 299 bokstav a, 300 bokstav a og d, 301, 302 første punktum, 303, 312 og 314 bokstav a og som faren er dømd til fengselsstraff for utan vilkår. Dette gjeld likevel ikkje arvelott som i verdi svarar til arv eller gåve barnet har fått frå faren eller nokon i farsslekta",
    "6 første ledd":
      "Ektemaken har rett til fjerdeparten av arven når det er livsarvinger etter arvelateren. Minstearven skal likevel tilsvare 4 ganger grunnbeløpet i folketrygda ved dødsfallet. Er dei næraste slektsarvingane til arvelateren foreldra hans eller avkom etter desse, har ektemaken rett til halvparten av arven, likevel minst 6 ganger grunnbeløpet i folketrygda ved dødsfallet.",
    "6 første og annet ledd":
      "Ektemaken har rett til fjerdeparten av arven når det er livsarvinger etter arvelateren. Minstearven skal likevel tilsvare 4 ganger grunnbeløpet i folketrygda ved dødsfallet. Er dei næraste slektsarvingane til arvelateren foreldra hans eller avkom etter desse, har ektemaken rett til halvparten av arven, likevel minst 6 ganger grunnbeløpet i folketrygda ved dødsfallet.\n\nEr det ikkje arvingar som nemnt i første ledd, arvar ektemaken alt.",
    "28 b første ledd":
      "Den som var sambuar med den avdøde ved dødsfallet og har, har hatt eller ventar barn med den avdøde, har rett til arv svarande til 4 gonger grunnbeløpet i folketrygda ved dødsfallet, jamvel om det er livsarvingar etter arvelataren. Same retten til arv utan omsyn til livsarvingar har også den som har vore sambuar med den avdøde i minst dei siste fem åra før dødsfallet, dersom den avdøde har fastsett det i testament.",
    36: "Barn av arvelataren som ikkje har fått oppfostringa si fullenda på den tid arvelataren døyr, har krav på ein sum av buet som forlott til å sikre livsopphald og utdanning dersom dette er rimeleg etter tilhøva. Storleiken av summen skal avpassast etter tilhøva. Ved avgjerda skal det m.a. takast omsyn til den arvelotten det uforsytte barnet elles får, om barnet har eigen formue, om barnet er sikra oppfostring på annan måte, og kva utgifter arvelataren har hatt til utdanning av dei andre barna sine. Er det fleire barn utan forsyting, skal kvart barn ha så mykje som er rimelig når det blir tatt omsyn til kva dei treng og til tilhøva elles.​\n\nHeimeverande barn som utan rimeleg vederlag har gjort særleg mykje for arvelataren, kan ved arveoppgjeret krevje å få ein sum av buet som forlott dersom dette er rimeleg etter tilhøva. Storleiken av summen skal avpassast etter tilhøva. Ved avgjerda skal det m.a. takast omsyn til den innsats barnet har gjort, dei utsikter det har i arbeidslivet, kor stor arvelott barnet elles vil få og den økonomiske stoda i det heile til barnet​ og dei andre arvingane",
    "46 første ledd, første punktum":
      "Har avdøde ikkje slektningar, ektemake eller sambuar som arvar han, og har han ikkje gjort testament om arven, skal nettoformuen fordelast til frivillig verksemd til fordel for barn og unge.",
  };
}
