import ChartNode from "./Classes/ChartNode";
import Person, { ParentChildSelector } from "../../ChatbotComponent/Helper/Classes/Person";
import { NodeEntity } from "../../ChatbotComponent/Helper/Classes/NodeEntity";
import ChartConnector from "./Classes/ChartConnector";


let maxLevel = -999999, minLevel = 999999;
const xLevelArray = [[0], [-1, 1], [-1, 0, 1], [-2, -1, 1, 2]];
let chartNodeMap = new Map<number, ChartNode>()
let connectorArray = new Array<ChartConnector>()
let xDiff = 200;
let yDiff = 100;
export const processData = (data: any): any => {
    maxLevel = -999999, minLevel = 999999;
    chartNodeMap = new Map<number, ChartNode>()
    connectorArray = new Array<ChartConnector>()
    xDiff = 200;
    yDiff = 100;
    // divide nodeMap into levels
    const levelMap = getLevelMap(data);
    const maxLevelData = levelMap.get(maxLevel);
    if (data.nodeMap.length === 0 || maxLevelData === undefined) {
        return [];
    }
    setxLevelForMaxLevel(maxLevelData)
    setxLevel(levelMap, data.nodeMap);
    setNodePosition(levelMap)
    return getChartNodeConnectorArray(data.nodeMap)
}


const setxLevel = (levelMap: Map<number, Array<ChartNode>>, nodeMap: Map<number, NodeEntity>) => {
    const processedNodes = new Array<string>();

    for (let i = maxLevel; i >= minLevel; i--) {
        const currentLevelChartNodes = levelMap.get(i);
        if (currentLevelChartNodes !== undefined) {
            for (const node of currentLevelChartNodes) {
                if (!processedNodes.includes(node.id)) {
                    processedNodes.push(node.id);
                }
                const currentNode = NodeEntity.getNode(parseInt(node.id), nodeMap)
                if (i !== maxLevel) {
                    let avgXlevel = 0;
                    const parentsCurrentNode = currentNode._parents;
                    parentsCurrentNode.map((parent_id) => {
                        const n = chartNodeMap.get(parent_id);
                        if (n !== undefined) {
                            avgXlevel += n.xLevel;
                        }
                    });
                    if (parentsCurrentNode.length !== 0)
                        node.xLevel = avgXlevel / parentsCurrentNode.length;
                }
                const currentNodePath = currentNode._path;
                for (let j = currentNodePath.length - 2; j >= 0; j--) {
                    if (!processedNodes.includes(currentNodePath[j][1].toString())) {
                        processedNodes.push(currentNodePath[j][1].toString())

                    }
                    let source = '', target = '';
                    if (currentNodePath[j + 1][0] <= currentNodePath[j][0] || (currentNodePath[j + 1][0] === ParentChildSelector.child && currentNodePath[j][0] === ParentChildSelector.testator)) {
                        source = currentNodePath[j][1].toString();
                        target = currentNodePath[j + 1][1].toString();

                    } else {
                        source = currentNodePath[j + 1][1].toString();
                        target = currentNodePath[j][1].toString();
                    }

                    if (connectorArray.filter(connector => {
                        return connector.id === `e${source}-${target}`
                    }).length === 0) {
                        const newConnector = new ChartConnector(`e${source}-${target}`, 'straight', source, target, '')
                        connectorArray.push(newConnector);
                    }

                }
                if (currentNode._children.length === 0) {
                    node.type = 'output'
                }
            }
        }

    }
}

const getLevelMap = (data: any) => {
    const levelMap = new Map<number, Array<ChartNode>>();
    data.nodeMap.forEach(function (node: NodeEntity, key: number) {
        const nodeDetails = Person.getPerson(node._id, data.personsMap)
        if (node._level > maxLevel) {
            maxLevel = node._level;
        }
        if (node._level < minLevel) {
            minLevel = node._level
        }
        if (!levelMap.has(node._level)) {
            levelMap.set(node._level, new Array<ChartNode>());
        }

        const newNode = new ChartNode(node._id.toString(), 'default', { label: nodeDetails._personID }, { x: 0, y: 0 }, 0)
        levelMap.get(node._level)?.push(newNode)
        chartNodeMap.set(node._id, newNode)
    })

    return levelMap;
}


const setNodePosition = (levelMap: Map<number, Array<ChartNode>>) => {
    let ypos = 0;
    for (let i = maxLevel; i >= minLevel; i--) {
        const currentLevelChartNodes = levelMap.get(i);
        let xpos = 0;
        if (currentLevelChartNodes !== undefined) {
            const sortedLevelChartNode = currentLevelChartNodes.sort((a, b) => a.xLevel >= b.xLevel ? 1 : -1)
            for (const node of sortedLevelChartNode) {
                node.position = { x: xpos, y: ypos };
                xpos += xDiff;
            }
        }
        ypos += yDiff;
    }

}

const getChartNodeConnectorArray = (nodeMap: Map<number, NodeEntity>): Array<ChartNode | ChartConnector> => {
    const finalArray = new Array<ChartNode | ChartConnector>()

    chartNodeMap.forEach((value, key) => {
        if (NodeEntity.getNode(parseInt(value.id), nodeMap)._path.length !== 0)
            finalArray.push(value)
    })
    return finalArray.concat(connectorArray)
}


const setxLevelForMaxLevel = (nodeArray: Array<ChartNode>) => {
    const xlevelDefault = xLevelArray[nodeArray.length - 1]
    for (let i = 0; i < nodeArray.length; i++) {
        nodeArray[i].xLevel = xlevelDefault[i]
        nodeArray[i].type = "input"
    }

}
