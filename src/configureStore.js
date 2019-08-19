import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { documentReducer } from './pages/Document/store/Document.reducer';

const reducers = combineReducers({
  documentReducer,
  toastr: toastrReducer,
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    composeWithDevTools()
  )
);

export default store;
