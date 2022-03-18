import ReactFlow, { Background, BackgroundVariant, Controls } from "react-flow-renderer";
import { processData } from "./ProcessDataForChart";
import { useEffect, useRef, useState } from "react";
import { useZoomPanHelper, useUpdateNodeInternals } from "react-flow-renderer";
import CustomNode from "./CustomNode";
import ChartNode from "./Classes/ChartNode";
import ChartConnector from "./Classes/ChartConnector";
import { componentCommunicatorService } from "../../ChatbotComponent/services/ComponentCommunicatorService";


// import { CustomDetailDialog } from "./Classes/CustomDetailDialog";

const flowStyles = { height: "80vh", width: "60%" };
let isHandleChange = true;
const OrgChartTree = () => {
  // const result = useSelector(chartSelector);
  const [result, setResult] = useState({ nodeMap: new Map(), personMap: new Map(), testator: null })
  const [chartContent, setChartContent] = useState([]);
  const componentWillUnmount = useRef(false)
  const updateNodeInternals = useUpdateNodeInternals();

  const getNodeData = () => chartContent.forEach((chartData: ChartNode | ChartConnector) => {
    //
    if (chartData instanceof ChartNode) {
      updateNodeInternals(chartData.id)
    }
  })
  useEffect(() => {
    return () => {
      componentWillUnmount.current = true
    }
  }, [])
  useEffect(() => {
    componentCommunicatorService.clearAllSubscription();
    const subscription = componentCommunicatorService.getChatbotMessage().subscribe((data: any) => setResult(data))
    componentCommunicatorService.addSubscription(subscription);
    if (componentWillUnmount.current) {
      componentCommunicatorService.clearAllSubscription();
    }
  }, [1])
  useEffect(() => {
    setTimeout(() => {
      getNodeData()
    }, 500);

  }, [chartContent]);
  useEffect(() => {
    setChartContent(processData(result))
    isHandleChange = true;
  }, [result])
  const { fitView } = useZoomPanHelper();
  const nodeTypes = {
    specialNode: CustomNode,
  };


  useEffect(() => {
    if (isHandleChange) {
      fitView();
    }
  });

  // const onNodeMouseEnter = (event: any, node: any) => {
  //   // setHoverNode(node);
  //   console.log(event);

  //   const dialog = new CustomDetailDialog(node, event.currentTarget, chartContent)
  //   dialog.showDialog();
  //   const newChartContent = [...chartContent]
  //   setChartContent(newChartContent)
  //   isHandleChange = false;
  //   // getNodeData()
  //   // setRerender(!rerender)
  //   // highlightPath()

  // }

  // const onNodeMouseLeave = (event: any, node: any) => {
  //   const dialog = new CustomDetailDialog(node, event.currentTarget, chartContent)
  //   dialog.hideDialog();
  //   const newChartContent = [...chartContent]
  //   setChartContent(newChartContent)
  //   isHandleChange = false;
  //   // getNodeData()

  //   // setRerender(!rerender)

  // }


  return (
    <div id="ChartContainer" style={{ height: "100%", paddingTop: "3rem" }}>
      <ReactFlow
        elements={chartContent}
        style={flowStyles}
        nodeTypes={nodeTypes}
        nodesConnectable={false}
        paneMoveable={false}
        selectNodesOnDrag={false}
        elementsSelectable={false}
        nodesDraggable={false}
      // onNodeMouseEnter={onNodeMouseEnter}
      // onNodeMouseLeave={onNodeMouseLeave}
      >
        <Background variant={BackgroundVariant.Dots} gap={1} size={2} />
        <Controls />

      </ReactFlow>
    </div>
  );
};

export default OrgChartTree;
