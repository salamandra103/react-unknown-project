import { Action } from "history";
import { AnyAction, combineReducers } from "redux";

const initialState = {}

import { set } from '../actions/'

const data = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case "SET":
			return { ...state };
		default:
			return state;
	}
};

export default combineReducers({
	data
});
