import { useSelector } from "react-redux";
import ReactFlow, { Background, Controls } from "react-flow-renderer";

const elements = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
  },
];

const flowStyles = { height: 500 };
const OrgChartTree = () => {
  const final = useSelector((state) => {
    if (state) return state;
  });

  let finalString = "";
  console.log(final);
  for (const value of final.nodeMap.values()) {
    finalString += JSON.stringify(value);
  }
  return (
    <div>
      <ReactFlow elements={elements} style={flowStyles}>
        <Background variant="lines" gap={2} size={4} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default OrgChartTree;
// export default function OrgChartTree() {
//   // let [message, setMessage] = useState({});
//   const final = useSelector((state) => {
//     if (state) return state;
//   });

//   let finalString = "";
//   for (const value of final.nodeMap.values()) {
//     finalString += JSON.stringify(value);
//   }
//   return (
//     // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
//     <div
//       id="treeWrapper"
//       style={{ width: "50em", height: "50em", backgroundColor: "gray" }}
//     >
//       {/* <div>{finalString}</div> */}
//       {/* {<Tree data={orgChart} />} */}
//     </div>
//   );
// }
