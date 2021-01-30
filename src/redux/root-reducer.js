import {combineReducers} from "redux";
import userReducer from "./user/user.reducer"

const RootReducer = combineReducers({
    user: userReducer
});

export default RootReducer;