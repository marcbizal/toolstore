const WAD_LOADED = 'WAD_LOADED';
const wadLoaded = (filename, nodes) => {
  return {
    type: WAD_LOADED,
    nodes,
  };
}

const NODE_EXPAND = 'NODE_EXPAND';
const nodeExpand = (node) => {
  return {
    type: NODE_EXPAND,
    nodeId: node.id,
  }
}

function update(array, newItem, atIndex) {
  return array.map((item, index) => index === atIndex ? newItem : item);
}

const wadSelectorActionsReducer = (state = [], action) => {
  switch (action.type) {
    case WAD_LOADED:
      return state.concat(action.nodes);
    case NODE_EXPAND:
      const nodeIndex = state.findIndex(node => node.id == action.nodeId);
      const node = state[nodeIndex];
      return update(state, { ...node, isExpanded: !node.isExpanded }, nodeIndex)
    default: 
      return state;
  }
}

export { 
  wadSelectorActionsReducer as default, 
  wadLoaded,
  nodeExpand,
};