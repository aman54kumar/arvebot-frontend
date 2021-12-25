class ChartNode {
  id: string;
  type: string;
  data: NodeData;
  position: { x: number; y: number };
  xLevel: number;
  draggable = false;
  connectable = false;
  constructor(
    id: string,
    type: string,
    data: NodeData,
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
export class NodeData {
  label = "";
  showDialog: boolean;
  pos: {
    left?: null | string;
    right?: null | string;
    top?: null | string;
    bottom?: null | string;
  };

  constructor(label: string, data?: any) {
    this.label = label;
    this.pos = data;
    this.showDialog = false;
  }
}
export default ChartNode;
