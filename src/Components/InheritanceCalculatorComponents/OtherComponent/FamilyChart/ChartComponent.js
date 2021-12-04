import { useSelector } from "react-redux";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
} from "react-flow-renderer";
import chartSelector from "../../../../store/chartSelector";
import { processData } from "./ProcessDataForChart";

import { useEffect, useRef } from "react";
import { useZoomPanHelper } from "react-flow-renderer";

const elements = [
  {
    id: "1",
    type: "input",
    data: { label: "firstNode" },
    position: { x: 20, y: 20 },
    draggable: false,
    connectable: false,
  },
];

const flowStyles = { height: "80vh" };

const OrgChartTree = () => {
  const result = useSelector(chartSelector);
  const chartContent = processData(result);
  const { fitView } = useZoomPanHelper();

  useEffect(() => {
    fitView({ padding: 0.1 });
  });

  return (
    <div id="ChartContainer" style={{ height: "100%", paddingTop: "3rem" }}>
      <ReactFlow elements={chartContent} style={flowStyles}>
        <Background variant="dots" gap={1} size={2} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default OrgChartTree;
