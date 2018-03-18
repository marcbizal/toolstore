import StructureView from './StructureView';

import { connect } from 'react-redux';
import { at } from 'lodash';

import { pushPath, popPath, slicePath } from './actions/PathActions';

const WadView = connect(
  (state) => {
    const { path, files } = state;

    const filename = path[0];
    const file = files[filename];

    if (path.length < 1 || typeof file === 'undefined') return {
      directory: files,
      path: [],
      objects: [],
    }

    const { relative_structure, objects } = file;
    return {
      directory: path.length > 1 ? at(file.relative_structure, [ path.slice(1) ])[0] : file.relative_structure,
      path,
      objects,
    };
  },
  (dispatch, ownProps) => {
    return {
      onPush: (event, object, key) => {
        event.preventDefault();
        if (typeof object === 'object') {
          dispatch(pushPath(key))
        } else return;
      },
      onPop: (event) => {
        event.preventDefault();
        dispatch(popPath());
      },
      onSlice: (event, end) => {
        event.preventDefault();
        dispatch(slicePath(end));
      }
    }
  }
)(StructureView);

export default WadView;