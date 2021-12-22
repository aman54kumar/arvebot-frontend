import { useSelector } from "react-redux";
import ReactFlow, { Background, BackgroundVariant, Controls } from "react-flow-renderer";
import chartSelector from "../../../../store/chartSelector";
import { processData } from "./ProcessDataForChart";
import { useEffect, useState, useMemo, memo, useCallback } from "react";
import { useZoomPanHelper, useUpdateNodeInternals } from "react-flow-renderer";
import PartnerNodeComponent from "./PartnerNode";
import CustomEdge from "./Classes/CustomEdge";
import ChartNode from "./Classes/ChartNode";
import ChartConnector from "./Classes/ChartConnector";

const flowStyles = { height: "80vh" };

const OrgChartTree = () => {
  // const [chartContent, setChartContent] = useState([])
  const result = useSelector(chartSelector);
  const updateNodeInternals = useUpdateNodeInternals();

  // const chartContent = useMemo(() => {
  //   return processData(result)
  // }, [result])
  const chartContent = processData(result)

  const getNodeData = () => chartContent.forEach((chartData: ChartNode | ChartConnector) => {
    //
    if (chartData instanceof ChartNode) {
      updateNodeInternals(chartData.id)
    }
  })
  useEffect(() => {
    setTimeout(() => {
      getNodeData()
    }, 100);

  }, [chartContent]);
  // useEffect(() => {
  //   getNodeData();


  // });

  // const updateNode = useCallback(() => updateNodeInternals('1'), [updateNodeInternals]);


  const { fitView } = useZoomPanHelper();

  const nodeTypes = {
    specialNode: PartnerNodeComponent,
  };
  const edgeTypes = {
    custom: CustomEdge,
  };


  useEffect(() => {
    fitView({ padding: 0.1 });
  });

  return (
    <div id="ChartContainer" style={{ height: "100%", paddingTop: "3rem" }}>
      <ReactFlow
        elements={chartContent}
        style={flowStyles}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
      >
        <Background variant={BackgroundVariant.Dots} gap={1} size={2} />
        <Controls />

      </ReactFlow>
      <button onClick={getNodeData}>update internals</button>;

    </div>
  );
};

export default OrgChartTree;
