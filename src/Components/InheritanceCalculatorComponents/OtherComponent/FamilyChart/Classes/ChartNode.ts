class ChartNode {
  id: string;
  type: string;
  data: { label: string };
  position: { x: number; y: number };
  xLevel: number;
  draggable = false;
  connectable = false;

  constructor(
    id: string,
    type: string,
    data: { label: string },
    position: { x: number; y: number },
    xLevel: number
  ) {
    this.id = id;
    this.type = type;
    this.data = data;
    this.position = position;
    this.xLevel = xLevel;
  }
}

export default ChartNode;
