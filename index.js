// expose Buffer globally
window.Buffer = require('buffer/').Buffer;

import WadView from './src/WadView';
import pathActionsReducer from './src/actions/PathActions';
import WadSelector from './src/WadSelector';
import wadSelectorActionsReducer from './src/actions/WadSelectorActions'

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const toolstore = combineReducers({
  nodes: wadSelectorActionsReducer,
})

const App = () => (
<div>
  <WadSelector />
  <WadView />
</div>
);

const store = createStore(toolstore, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));