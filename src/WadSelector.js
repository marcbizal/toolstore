import React from 'react';
import WadParser from './WadParser'
import Dropzone from 'react-dropzone';

import { connect } from 'react-redux';
import { set } from 'lodash';

import { wadLoaded } from './actions/WadSelectorActions';

const createFolderStructure = (paths) => {
  return paths.reduce((structure, path, i) => {
    set(structure, path.split('\\').filter(Boolean), i);
    return structure;
  }, {});
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

                wad.relative_structure = createFolderStructure(wad.relative_paths);
                wad.absolute_structure = createFolderStructure(wad.absolute_paths);

                dispatch(wadLoaded(file.name, wad));
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