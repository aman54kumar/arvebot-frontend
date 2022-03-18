import { Popper } from "@mui/material";
import { Handle, Position } from "react-flow-renderer";
import { Textfit } from 'react-textfit';

enum HandleType {
  source = "source",
  target = "target"
}

const customHandleData = [
  {
    type: "source",
    position: Position.Right,
    id: "s_right",
    style: { top: "50%", background: '#555' },
  },
  {
    type: "source",
    position: Position.Bottom,
    id: "s_bottom",
    style: { left: "50%", background: '#555' },
  },
  {
    type: "target",
    position: Position.Left,
    id: "t_left",
    style: { top: "50%", background: '#555' },
  },
  {
    type: "target",
    position: Position.Top,
    id: "t_top",
    style: { left: "50%", background: '#555' },
  },
];

const partnerNodeStyles = {
  background: "#fff",
  color: "#000",
  padding: "5px",
  width: "7rem",
  height: "1.8rem",
  borderRadius: "3px",
  borderColor: "midnightblue",
  borderStyle: "solid",
  borderWidth: "1px",
  letterSpacing: "0.5px",
  lineHeight: 1.5,
  display: "flex"
}


const CustomNode = (totalData: any) => {
  const data = totalData.data;

  const isConnectable = data.isConnectable;
  // eslint-disable-next-line
  const handles = customHandleData.map((v, k) => {
    if (check(data.pos, v.position)) {
      return (
        <Handle
          key={v.id}
          type={v.type === "source" ? HandleType.source : HandleType.target}
          position={v.position}
          id={v.id}
          style={v.style}
          isConnectable={isConnectable}
        />
      )
    }
  });
  const labelString = deceasedFormatter(data.label)
  return (
    <div>
      <div id={`detail_${totalData.id}`} style={partnerNodeStyles}>
        <div style={{ width: "6.8rem", display: "contents" }}><Textfit style={{ margin: "auto", width: "6.8rem", textAlign: "center" }} max={20} mode="single" forceSingleModeWidth={false}>{labelString}</Textfit></div>
        {/* <Typography align="center" variant="subtitle2" style={{ textTransform: "uppercase", fontFamily: "Helvetica", padding: "0 5px" }}></Typography> */}
        {handles}
      </div>
      <Popper style={{ position: "absolute", display: data.showDialog ? "block" : "none" }}
        open={data.showDialog}
        anchorEl={document.getElementById(`detail_${totalData.id}`)}
      >{`Hi popover ${data.label}`}</Popper>
    </div >
  );
}
const check = (data: any, pos: string): boolean => {
  if (data && (
    data.left === pos ||
    data.right === pos ||
    data.top === pos ||
    data.bottom === pos
  ))
    return true;

  return false;
};

const deceasedFormatter = (personString: string) => {
  // const tempArray = personString.split("†");

  // if (tempArray.length === 2) {
  //   const spanElement = document.createElement("span");
  //   spanElement.innerHTML = `tempArray[0] <p style="color: red">tempArray[1]</p>`
  //   return spanElement
  // }
  return personString
}


export default CustomNode