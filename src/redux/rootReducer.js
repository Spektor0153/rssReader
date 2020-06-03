import {combineReducers} from "redux";
import {leftColReducer} from './../Components/LeftCol/leftColReducer'
import {rightColReducer} from './../Components/RightCol/RightColReducer'


export const  rootReducer = combineReducers({
    rssArr: leftColReducer,
    rssNewsList: rightColReducer
});


