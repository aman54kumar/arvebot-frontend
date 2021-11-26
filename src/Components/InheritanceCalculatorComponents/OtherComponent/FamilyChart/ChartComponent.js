import { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { ChatbotState } from "../../ChatbotComponent/Generics";
import { messageService } from "../../ChatbotComponent/MessageService";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.

const orgChart = {
  name: "Eve",
  children: [
    {
      name: "Cain",
    },
    {
      name: "Seth",
      children: [
        {
          name: "Enos",
        },
        {
          name: "Noam",
        },
      ],
    },
    {
      name: "Abel",
    },
    {
      name: "Awan",
      children: [
        {
          name: "Enoch",
        },
      ],
    },
    {
      name: "Azura",
    },
  ],
};

export default function OrgChartTree() {
  const [message, setMessages] = useState([]);
  useEffect(() => {
    // your post layout code (or 'effect') here.
    const subscription = messageService.getMessage().subscribe((message) => {
      console.log("111");
      console.log(message);
      if (message) {
        setMessages((messages) => [...messages, message]);
      } else {
        setMessages([]);
      }
    });
    return subscription.unsubscribe;
  }, []);

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div
      id="treeWrapper"
      style={{ width: "50em", height: "50em", backgroundColor: "gray" }}
    >
      <div>{JSON.stringify(message)}</div>
      {/* {<Tree data={orgChart} />} */}
    </div>
  );
}
