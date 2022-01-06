import ChartNode, { NodeData } from "./Classes/ChartNode";
import Person from "../../ChatbotComponent/Helper/Classes/Person";
import { ParentChildSelector } from "../../ChatbotComponent/Helper/Enums/ParentChildSelector";
import { NodeEntity } from "../../ChatbotComponent/Helper/Classes/NodeEntity";
import ChartConnector from "./Classes/ChartConnector";
import { Bubble } from "./Classes/Bubble";


let maxLevel = -999999, minLevel = 999999;
const xLevelArray = [[1], [-1, 1], [-1, 0, 1], [-2, -1, 1, 2]];
let chartNodeMap = new Map<number, ChartNode>()
let connectorArray = new Array<ChartConnector>()
let xDiff: number;
let yDiff: number;
const nodeSize = 123;
let partnerBubbleLevelMap: Map<number, Array<number>>;
export const processData = (data: any): any => {
    maxLevel = -999999, minLevel = 999999;
    chartNodeMap = new Map<number, ChartNode>()
    connectorArray = new Array<ChartConnector>()
    partnerBubbleLevelMap = new Map<number, Array<number>>();
    xDiff = 180;
    yDiff = 100;

    // // divide nodeMap into levels
    const levelMap = getLevelMap(data);
    const maxLevelData = levelMap.get(maxLevel);
    if (data.nodeMap.length === 0 || maxLevelData === undefined) {
        return [];
    }
    setxLevelForMaxLevel(maxLevelData)
    setxLevel(levelMap, data.nodeMap);
    setNodePosition(levelMap, data.nodeMap)
    return getChartNodeConnectorArray(data.nodeMap)
    // const node1 = new ChartNode("1", 'specialNode', new NodeData("a", { right: "right" }), { x: 0, y: 0 }, 0)
    // const node2 = new ChartNode("2", 'specialNode', new NodeData("afasfasfas", { left: "left" }), { x: 200, y: 0 }, 0)
    // const connector = new ChartConnector(`1-2`, 'straight', "1", "2", '', 's_right', "t_left")
    // return [node1, node2, connector]
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
                const partnerNodeId = currentNode._spouse ? currentNode._spouse : currentNode._cohabitant ? currentNode._cohabitant : null;
                if (partnerNodeId !== null) {
                    if (!processedNodes.includes(`${partnerNodeId}`)) {
                        processedNodes.push(`${partnerNodeId}`);
                    }

                    const partnerChartNode = getChartNode(`${partnerNodeId}`);
                    if (!partnerChartNode.data.pos) {
                        partnerChartNode.data.pos = {};
                    }
                    if (!node.data.pos) {
                        node.data.pos = {};
                    }
                    if (!partnerBubbleLevelMap.has(i)) {
                        partnerBubbleLevelMap.set(i, new Array<number>())
                    }
                    const partnerBubbleArray = partnerBubbleLevelMap.get(i)

                    if (currentNode._undividedEstateSpouse) {
                        if (partnerBubbleArray) {
                            if (!partnerBubbleArray.includes(partnerNodeId)) {
                                partnerBubbleArray.push(partnerNodeId, currentNode._id)
                            }
                        }
                        partnerChartNode.xLevel = node.xLevel - 0.01;
                        partnerChartNode.data.pos.right = "right"
                        node.data.pos.left = "left"
                        if (connectorArray.filter(connector => {
                            return connector.id === `e${partnerNodeId}-${currentNode._id}`
                        }).length === 0) {
                            const newConnector = new ChartConnector(`e${partnerNodeId}-${currentNode._id}`, 'straight', `${partnerNodeId}`, `${currentNode._id}`, '', "s_right", "t_left")
                            connectorArray.push(newConnector);
                        }
                    } else {
                        if (partnerBubbleArray) {
                            if (!partnerBubbleArray.includes(partnerNodeId)) {
                                partnerBubbleArray.push(currentNode._id, partnerNodeId)
                            }
                        }
                        partnerChartNode.xLevel = node.xLevel + 0.01;
                        partnerChartNode.data.pos.left = "left"
                        node.data.pos.right = "right"
                        if (connectorArray.filter(connector => {
                            return connector.id === `e${currentNode._id}-${partnerNodeId}`
                        }).length === 0) {
                            const newConnector = new ChartConnector(`e${currentNode._id}-${partnerNodeId}`, 'straight', `${currentNode._id}`, `${partnerNodeId}`, '', "s_right", "t_left")
                            connectorArray.push(newConnector);
                        }
                    }




                }

                if (currentNode._undividedEstateSpouse !== null) {
                    if (!processedNodes.includes(`${currentNode._undividedEstateSpouse}`)) {
                        processedNodes.push(`${currentNode._undividedEstateSpouse}`);
                    }
                    const partnerChartNode = getChartNode(`${currentNode._undividedEstateSpouse}`);
                    if (!partnerChartNode.data.pos) {
                        partnerChartNode.data.pos = {};
                    }
                    if (!node.data.pos) {
                        node.data.pos = {};
                    }
                    if (!partnerBubbleLevelMap.has(i)) {
                        partnerBubbleLevelMap.set(i, new Array<number>())
                    }
                    const partnerBubbleArray = partnerBubbleLevelMap.get(i)
                    if (partnerBubbleArray) {
                        if (!partnerBubbleArray.includes(currentNode._undividedEstateSpouse)) {
                            if (!partnerBubbleArray.includes(currentNode._id)) {
                                partnerBubbleArray.push(currentNode._id)

                            }
                            partnerBubbleArray.push(currentNode._undividedEstateSpouse)
                        }
                    }
                    partnerChartNode.xLevel = node.xLevel + 0.01;
                    partnerChartNode.data.pos.left = "left"
                    node.data.pos.right = "right"
                    if (connectorArray.filter(connector => {
                        return connector.id === `e${currentNode._id}-${currentNode._undividedEstateSpouse}`
                    }).length === 0) {
                        const newConnector = new ChartConnector(`e${currentNode._id}-${currentNode._undividedEstateSpouse}`, 'straight', `${currentNode._id}`, `${currentNode._undividedEstateSpouse}`, '', "s_right", "t_left")
                        connectorArray.push(newConnector);
                    }
                }



                const currentNodePath = currentNode._path;
                for (let j = currentNodePath.length - 2; j >= 0; j--) {
                    if (currentNodePath[j][0] === ParentChildSelector.testator &&
                        (currentNodePath[j + 1][0] === ParentChildSelector.spouse ||
                            currentNodePath[j + 1][0] === ParentChildSelector.cohabitant ||
                            currentNodePath[j + 1][0] === ParentChildSelector.undividedSpouse)) {
                        break;
                    }
                    processedNodes.push(currentNodePath[j][1].toString())
                    let source = '', target = '';
                    if (currentNodePath[j + 1][0] <= currentNodePath[j][0] || (currentNodePath[j + 1][0] === ParentChildSelector.child && currentNodePath[j][0] === ParentChildSelector.testator)) {
                        source = currentNodePath[j][1].toString();
                        target = currentNodePath[j + 1][1].toString();

                    } else {
                        source = currentNodePath[j + 1][1].toString();
                        target = currentNodePath[j][1].toString();

                    }
                    const sourceNode = getChartNode(source)
                    if (!sourceNode.data.pos) {
                        sourceNode.data.pos = {};
                    }
                    sourceNode.data.pos.bottom = 'bottom'
                    const targetNode = getChartNode(target)
                    if (!targetNode.data.pos) {
                        targetNode.data.pos = {};
                    }
                    targetNode.data.pos.top = 'top'

                    if (connectorArray.filter(connector => {
                        return connector.id === `e${source}-${target}`
                    }).length === 0) {
                        const newConnector = new ChartConnector(`e${source}-${target}`, 'straight', source, target, '', "s_bottom", "t_top")
                        connectorArray.push(newConnector);
                    }

                }

            }
        }

    }
}



const getLevelMap = (data: any) => {
    const levelMap = new Map<number, Array<ChartNode>>();
    // eslint-disable-next-line
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
        const nodeLabel = nodeDetails._deceased ? `\u2020 ${nodeDetails._personName}` : nodeDetails._personName
        const newNode = new ChartNode(node._id.toString(), 'specialNode', new NodeData(nodeLabel,), { x: 0, y: 0 }, 0)
        levelMap.get(node._level)?.push(newNode)
        chartNodeMap.set(node._id, newNode)
    })

    return levelMap;
}


const setNodePosition = (levelMap: Map<number, Array<ChartNode>>, nodeMap: any) => {
    let ypos = 0;
    for (let i = maxLevel; i >= minLevel; i--) {
        const currentLevelChartNodes = levelMap.get(i);
        // let xpos = 0;
        if (currentLevelChartNodes !== undefined) {
            const sortedLevelChartNode = currentLevelChartNodes.sort((a, b) => a.xLevel >= b.xLevel ? 1 : -1)
            // create bubbles
            const bubbles = createLevelBubble(sortedLevelChartNode, partnerBubbleLevelMap.get(i), nodeMap);

            processBubbles(bubbles, ypos)
        }
        ypos += yDiff;
    }

}
const processBubbles = (bubbles: Array<Bubble>, ypos: number) => {
    let xleft = 0;
    const xgap = xDiff - nodeSize
    let previousXRight = -10000000;

    for (const bubble of bubbles) {
        //
        const n = bubble.elements.length;
        if (bubble.parent) {
            // find relative pos with parent

            const parentChartNode = getChartNode(bubble.parent.toString());
            let relativeXleft = parentChartNode.position.x + nodeSize / 2 - (n * nodeSize + (n - 1) * xgap) / 2;
            const relativeXRight = parentChartNode.position.x + nodeSize / 2 + (n * nodeSize + (n - 1) * xgap) / 2;

            if (previousXRight > relativeXleft) {
                relativeXleft = previousXRight;
            }
            previousXRight = relativeXRight + xgap;
            for (const eleID of bubble.elements) {
                const element = getChartNode(eleID.toString());
                element.position = { x: relativeXleft, y: ypos };
                relativeXleft += xDiff;
                xleft = relativeXleft;
            }

        } else {
            // x will start from xleft
            const relativeXRight = xleft + n * (xDiff);
            previousXRight = relativeXRight;
            for (const eleID of bubble.elements) {
                const element = getChartNode(eleID.toString());
                element.position = { x: xleft, y: ypos };
                xleft += xDiff;
            }
        }
    }
}
const createLevelBubble = (chartNodes: Array<ChartNode>, partnerBubble: Array<number> | undefined, nodeMap: any) => {
    const bubbles = new Array<Bubble>();
    let isPartnerProcessed = false;
    for (const chartNode of chartNodes) {
        const node = NodeEntity.getNode(parseInt(chartNode.id), nodeMap);
        // check in partnerMap

        if (partnerBubble && partnerBubble.includes(node._id)) {
            if (isPartnerProcessed) {
                continue;
            }
            isPartnerProcessed = true;
            let partnerParent: number | undefined;
            let isExistingBubble = false;
            for (const partner of partnerBubble) {
                const partnerNode = NodeEntity.getNode(partner, nodeMap);
                const existingBubbles = bubbles.filter(bubble => {
                    if (bubble.parent) {
                        return partnerNode._parents.includes(bubble.parent)
                    }
                    return false;
                });
                if (existingBubbles.length !== 0) {
                    // return that there is an existing bubble which will include bubble
                    existingBubbles[0].elements = existingBubbles[0].elements.concat(partnerBubble);
                    isExistingBubble = true;
                    break;
                } else {
                    if (partnerNode._parents.length !== 0)
                        partnerParent = partnerNode._parents[0]
                }
            }
            if (!isExistingBubble)
                bubbles.push(new Bubble(partnerBubble, partnerParent));

        } else {
            const existingBubble = bubbles.filter(bubble => {
                if (bubble.parent) {
                    return node._parents.includes(bubble.parent)
                }
                return false;
            })
            let bubble: Bubble;
            if (existingBubble.length !== 0) {
                bubble = existingBubble[0]
                bubble.elements.push(node._id)
            } else {
                if (node._parents.length !== 0) bubble = new Bubble([node._id], node._parents[0]);
                else bubble = new Bubble([node._id]);
                bubbles.push(bubble);
            }

        }



    }
    return bubbles;
}
const getChartNodeConnectorArray = (nodeMap: Map<number, NodeEntity>): Array<ChartNode | ChartConnector> => {
    const finalArray = new Array<ChartNode | ChartConnector>()
    // eslint-disable-next-line
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
    }

}
const getChartNode = (id: string) => {
    const chartNode: ChartNode | undefined = chartNodeMap.get(parseInt(id));
    if (chartNode == undefined) {
        throw new Error("Person not found with given id:" + id);
    }
    return chartNode;
}

