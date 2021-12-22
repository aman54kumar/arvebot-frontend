export default function chartSelector(state) {
  return {
    nodeMap: state.nodeMap,
    personsMap: state.personsMap,
    testator: state.testator,
  };
}

export function messageSelector(state) {
  return {
    messages: state.messages,
  };
}
