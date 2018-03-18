const PUSH_PATH = 'PUSH_PATH';
const pushPath = (directory) => {
  return {
    type: PUSH_PATH,
    directory,
  };
}

const POP_PATH = 'POP_PATH';
const popPath = () => {
  return { type: POP_PATH };
}

const SLICE_PATH = 'SLICE_PATH';
const slicePath = (end) => {
  return {
    type: SLICE_PATH,
    end,
  }
}

const pathActionsReducer = (state = [], action) => {
  switch (action.type) {
    case PUSH_PATH:
      return state.concat(action.directory);
    case POP_PATH:
      return state.slice(0, state.length - 1);
    case SLICE_PATH:
      return state.slice(0, action.end + 1);;
    default:
      return state;
  }
}

export {
  pathActionsReducer as default,
  pushPath,
  popPath,
  slicePath,
};