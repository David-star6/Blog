
import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';

import rootReducer from './index'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

function configureStore(initialState) {

    return createStoreWithMiddleware(rootReducer, initialState)
}

const store = configureStore()

export default store