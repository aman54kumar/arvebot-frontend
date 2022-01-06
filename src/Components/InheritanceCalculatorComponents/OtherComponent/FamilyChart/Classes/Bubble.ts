export class Bubble {
  parent: number | undefined;
  elements: Array<number>;
  constructor(elements: Array<number>, parent?: number) {
    this.elements = elements;
    this.parent = parent;
  }
}
