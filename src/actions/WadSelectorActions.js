const WAD_LOADED = 'WAD_LOADED';
const wadLoaded = (filename, meta) => {
  return {
    type: WAD_LOADED,
    filename,
    meta,
  };
}

const wadSelectorActionsReducer = (state = {}, action) => {
  switch (action.type) {
    case WAD_LOADED:
      return Object.defineProperty({ ...state }, action.filename, { value: action.meta, enumerable: true })
    default:
      return state;
  }
}

export { 
  wadSelectorActionsReducer as default, 
  wadLoaded,
};