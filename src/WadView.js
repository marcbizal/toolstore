import { connect } from 'react-redux';
import { Classes, Tree } from '@blueprintjs/core';
import { nodeExpand } from './actions/WadSelectorActions'
import React from 'react';

const expandRecursive = (nodeId, nodes) => {
  const node = nodes.find(node => node.id == nodeId);

  return {
    ...node,
    childNodes: node.childNodes.map(child => expandRecursive(child, nodes)),
  }
};

const expand = (nodes) => {
  const root = nodes.find(node => node.parent == null);
  const tree = expandRecursive(root.id, nodes);
  console.log(tree);
  return tree;
}

const WadView = connect(
  (state) => {
    return {
      nodes: state.nodes.length ? [expand(state.nodes)] : []
    }
  },
  (dispatch) => {
    return {
      onNodeExpand: (node) => {
        dispatch(nodeExpand(node))
      }
    }
  }
)(({nodes, onNodeExpand}) => (<Tree contents={nodes} className={Classes.ELEVATION_0} onNodeExpand={onNodeExpand} />));

export default WadView;