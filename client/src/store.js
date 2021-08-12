import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import loginReducer from "./Reducers/loginReducer";
import videoReducer from './Reducers/videoReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import commentReducer from "./Reducers/commentReducer";

const allReducers = combineReducers({
    user: loginReducer,
    video: videoReducer,
    comment: commentReducer,
})

const store = createStore(
    allReducers,
    compose(
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
)
console.log(store.getState())
export default store;