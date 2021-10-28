import {
	call, put, takeEvery, takeLatest,
} from "redux-saga/effects";

function* mySaga() {
	yield put({ type: "SET", name: "Ivan" });
}
  
export default mySaga;
