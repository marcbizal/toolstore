import React from 'react';
import WadParser from './WadParser'
import Dropzone from 'react-dropzone';

import { connect } from 'react-redux';
import _ from 'lodash';

import uuidv5 from 'uuid/v5';
import uuidv1 from 'uuid/v1';

import { wadLoaded } from './actions/WadSelectorActions';

const makeNodesRecursive = (currentPath, data, parent, rootName) => {
  const isRoot = !Boolean(currentPath);
  const uuid = isRoot ? uuidv1() : uuidv5(currentPath, parent);

  const children = _.uniq(data
    .filter(({ path }) => path.startsWith(currentPath))
    .map(({ path }) => {
      const indexOfNextSlash = path.indexOf('\\', currentPath.length);
      return indexOfNextSlash < 0 ? path : path.substring(0, indexOfNextSlash + 1);
    })).filter(child => child !== currentPath);

  const isDirectory = children.length > 0;
  const componentName = isRoot ? rootName : currentPath.split('\\').filter(Boolean).pop();
  const childNodes = children.reduce((accumulator, child) => accumulator.concat(makeNodesRecursive(child, data, uuid)), []);

  return childNodes.concat({
    id: uuid,
    label: componentName,
    icon: isRoot ? 'box' : (isDirectory ? 'folder-close' : 'document'),
    parent: parent,
    childNodes: childNodes.filter(childNode => childNode.parent == uuid).map(childNode => childNode.id),
  });
};

const makeNodes = (paths, objects, rootName) => {
  const zippedObjects = _.zip(paths, objects).map(_.spread((path, object) => ({
    path: path,
    object: object,
  })));

  return makeNodesRecursive('', zippedObjects, null, rootName);
}


const WadSelector = connect(
  () => {
    return {
      accept: '.wad',
    }
  },
  (dispatch) => {
    return {
      onDrop: (acceptedFiles) => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                const buffer = Buffer.from(reader.result);
                const wad = WadParser.parse(buffer);

                console.time('makeNodes');
                const nodes = makeNodes(wad.relative_paths, wad.objects, file.name);
                console.timeEnd('makeNodes');

                dispatch(wadLoaded(file.name, nodes));
            };
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');

            reader.readAsArrayBuffer(file);
        });
      }
    }
  }
)(Dropzone);

export default WadSelector;