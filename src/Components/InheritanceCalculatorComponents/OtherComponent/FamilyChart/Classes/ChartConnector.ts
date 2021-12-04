class ChartConnector {
  id: string;
  type = "smoothstep";
  source: string;
  target: string;
  label: string;
  animated = false;
  arrowHeadType = "arrow";

  constructor(
    id: string,
    type: string,
    source: string,
    target: string,
    label: string
  ) {
    this.id = id;
    this.type = type;
    this.source = source;
    this.target = target;
    this.label = label;
  }
}

export default ChartConnector;
