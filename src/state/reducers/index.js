import { combineReducers } from "redux";
import cartReducer from './cartReducer';

let reducers = combineReducers({
    quantity:cartReducer
})

export default reducers;