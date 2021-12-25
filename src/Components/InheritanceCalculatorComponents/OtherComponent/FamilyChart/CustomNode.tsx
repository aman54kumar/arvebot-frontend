import { Popover, Popper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { Handle, Position } from "react-flow-renderer";

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
  padding: 2,
  minWidth: "7rem",
  borderRadius: "3px",
  borderColor: "midnightblue",
  borderStyle: "solid",
  borderWidth: "1px",
  letterSpacing: "0.5px",
  lineHeight: 1.5,
}


const CustomNode = (totalData: any) => {
  const data = totalData.data;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  // const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   console.log(event);

  //   setAnchorEl(event.currentTarget);
  // };
  // useEffect(() => {

  // }, [data])
  // const handlePopoverClose = () => {
  //   // setAnchorEl(null);
  // };
  // const anchorEl = document.getElementById(`detail_${totalData.id}`) as HTMLElement;


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
        <Typography align="center" variant="subtitle2" style={{ textTransform: "uppercase", fontFamily: "Helvetica", padding: "0 5px" }}>{labelString}</Typography>
        {handles}
      </div>
      <Popper style={{ position: "absolute", display: data.showDialog ? "block" : "none" }}
        open={data.showDialog}

        anchorEl={document.getElementById(`detail_${totalData.id}`)}
      // anchorOrigin={{
      //   vertical: 'top',
      //   horizontal: 'right',
      // }}
      // transformOrigin={{
      //   vertical: 'top',
      //   horizontal: 'left',
      // }}
      >{`Hi popover ${data.label}`}</Popper>
    </div>
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