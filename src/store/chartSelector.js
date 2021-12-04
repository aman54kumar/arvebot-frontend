export default function chartSelector(state) {
  return {
    nodeMap: state.nodeMap,
    personsMap: state.personsMap,
    caseName: state.caseName,
  };
}

export function messageSelector(state) {
  return {
    messages: state.messages,
  };
}
