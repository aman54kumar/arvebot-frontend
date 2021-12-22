import { Typography } from "@mui/material";
import { memo, useMemo } from "react";
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
    style: { left: "50%", background: '#555' },
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


const PartnerNodeComponent = ({ data }: { data: any }) => {
  const isConnectable = data.isConnectable;
  // data = data;
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

  return (
    <div style={partnerNodeStyles}>
      <Typography align="center" variant="subtitle1" style={{ textTransform: "uppercase", fontFamily: "Helvetica" }}>{data.label}</Typography>
      {handles}
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
export default PartnerNodeComponent
  // return (



  // <div style={partnerNodeStyles}>
  //   <div>{data.label}</div>

  //   {
  //     !data.pos ? <></> : data.pos.left === "left" ? (
  //       <Handle
  //         type="source"
  //         position={Position.Left}
  //         id="s_left"
  //         style={{ top: "25%", borderRadius: 0 }}
  //         isConnectable={isConnectable}
  //       />
  //     ) : (
  //       <></>
  //     )
  //   }
  //   {
  //     !data.pos ? <></> : data.pos.right === "right" ? (
  //       <Handle
  //         type="source"
  //         position={Position.Right}
  //         id="s_right"
  //         style={{ top: "25%", borderRadius: 0 }}
  //         isConnectable={isConnectable}
  //       />
  //     ) : (
  //       <></>
  //     )
  //   }
  //   {
  //     !data.pos ? <></> : data.pos.top === "top" ? (
  //       <Handle
  //         type="source"
  //         position={Position.Top}
  //         id="s_top"
  //         style={{ left: "25%", borderRadius: 0 }}
  //         isConnectable={isConnectable}
  //       />
  //     ) : (
  //       <></>
  //     )
  //   }
  //   {
  //     !data.pos ? <></> : data.pos.bottom === "bottom" ? (
  //       <Handle
  //         type="source"
  //         position={Position.Bottom}
  //         id="s_bottom"
  //         style={{ left: "25%", borderRadius: 0 }}
  //         isConnectable={isConnectable}
  //       />
  //     ) : (
  //       <></>
  //     )
  //   }
  //   {
  //     !data.pos ? <></> : data.pos.left === "left" ? (
  //       <Handle
  //         type="target"
  //         position={Position.Left}
  //         id="t_left"
  //         style={{ top: "75%", borderRadius: 0 }}
  //         isConnectable={isConnectable}
  //       />
  //     ) : (
  //       <></>
  //     )
  //   }
  //   {
  //     !data.pos ? <></> : data.pos.right === "right" ? (
  //       <Handle
  //         type="target"
  //         position={Position.Right}
  //         id="t_right"
  //         style={{ top: "75%", borderRadius: 0 }}
  //         isConnectable={isConnectable}
  //       />
  //     ) : (
  //       <></>
  //     )
  //   }
  //   {
  //     !data.pos ? <></> : data.pos.top === "top" ? (
  //       <Handle
  //         type="target"
  //         position={Position.Top}
  //         id="t_top"
  //         style={{ left: "75%", borderRadius: 0 }}
  //         isConnectable={isConnectable}
  //       />
  //     ) : (
  //       <></>
  //     )
  //   }
  //   {
  //     !data.pos ? <></> : data.pos.bottom === "bottom" ? (
  //       <Handle
  //         type="target"
  //         position={Position.Bottom}
  //         id="t_bottom"
  //         style={{ left: "75%", borderRadius: 0 }}
  //         isConnectable={isConnectable}
  //       />
  //     ) : (
  //       <></>
  //     )

  //   }
  // </div>
  // )
// };



// {customHandleData.forEach((element) => {
//     // {
//     /* <Handle
//     type="source"
//     position="right"
//     id="s_right"
//     style={{ top: "50%", borderRadius: 0 }}
//   />
//   ;
//   <Handle
//     type="target"
//     position="left"
//     id="t_left"
//     style={{ top: "50%", borderRadius: 0 }}
//   /> */
//     // }
//     if (check(data.pos, element.position)) {
//   <Handle
//     type={element.type}
//     position={element.position}
//     id={element.id}
//     style={element.style}
//   />;
//     }
//   })}
// customHandleData.forEach((item: any) => {
  // if (check(data.data.pos, item.position)) {
  //   return (
  //     <Handle
  //       type={item.type}
  //       position={item.position}
  //       id={item.id}
  //       style={item.style}
  //     />

  //   )
  // }
// })
// console.log(handleList.length);

// return (
//   <div style={partnerNodeStyles}>
//     {data.data.label}
//     {handleList}
//   </div>
// );
