import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, take } from "redux-saga/effects";
import { authActions, AuthState, TAuthState } from "./authSlice";
import contractApi from "../../services/contractApi";
function* getListContractProcess() {
     try {

     }catch(err) {}
}
function* handleContract(payload: TAuthState) {


}
function* watchHandleContract() {

}
export function * authSaga() {
     yield fork(watchHandleContract)

}