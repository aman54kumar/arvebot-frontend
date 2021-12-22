class ChartConnector {
  id: string;
  type = "smoothstep";
  source: string;
  target: string;
  label: string;
  animated = false;
  // arrowHeadType = "arrowclosed";
  sourceHandle: string;
  targetHandle: string;

  constructor(
    id: string,
    type: string,
    source: string,
    target: string,
    label: string,
    sourceHandle = "",
    targetHandle = ""
  ) {
    this.id = id;
    this.type = type;
    this.source = source;
    this.target = target;
    this.label = label;
    this.sourceHandle = sourceHandle;
    this.targetHandle = targetHandle;
  }
}

export default ChartConnector;
