import ChartConnector from "./ChartConnector";
import ChartNode from "./ChartNode";

export class CustomDetailDialog {

    constructor(private nodeData: any, private currentElement: Element, private chartContent: Array<ChartNode | ChartConnector>) {
    }

    showDialog = () => {
        const currentChartNode = this.getChartNodeFromArray();
        if (currentChartNode) {
            currentChartNode.data.showDialog = true;
        }

        this.highlightPath();
    }



    highlightPath = () => {
        //
    }
    hideDialog = () => {
        const currentChartNode = this.getChartNodeFromArray();
        if (currentChartNode) {
            currentChartNode.data.showDialog = false;
        }
    }
    getChartNodeFromArray = (): ChartNode | undefined => {
        for (const node of this.chartContent) {
            if (node.id === this.nodeData.id && node instanceof ChartNode) {
                return node
            }
        }
    }

}