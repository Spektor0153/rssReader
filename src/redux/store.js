import {createStore} from "redux";
import {rootReducer} from './rootReducer.js'
import {compose} from "redux";


const enhancers = compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(
    rootReducer,
    enhancers
);



export default store;