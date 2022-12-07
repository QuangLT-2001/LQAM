import  {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"

import axios, { AxiosHeaders } from "axios";

import axiosClient from "./axiosClient";
export interface TAuthState  {
     lishMent?: string;
     typeContract?: string;
     status?: number |string|boolean;
     description?: string;
     id?: string | number ;
     createdAt ?: string | number|undefined,

}
export interface TLishMentState {
     id?: any;
     createdAt?: string|number;
     nameLishMent?: string;
     MST?: string|number;
     flagActive?: boolean;
     orgId?: string |number,
     nameAbb?:string,
     typeLishMent?: string,
     address?: string,
     userContact?: string,
     emailContact?:string,
     telContact?: string
}
export interface ITimerState {
     id?: string| number;
     createdAt?: string |number;
     name?: string;
     type?:string;
     status?: boolean;
     isDefault?: boolean;
}
export interface IHolidayState {
     id?:string |number;
     createdAt?: string|number;
     day?: number|string;
     month?: number|string;
     name: string
}
export interface IMapWork {
     id?: string|number;
     createdAt?: string|number;
     name?: string;
     lishMent?: string;
     status?: boolean;
     coordinates?: string;
}
export interface AuthState {
     contract?: TAuthState[],
     isLoading: boolean,
     lishMent?: TLishMentState[],
     lishMentDetail?: TLishMentState,
     listTimer?: ITimerState[]
     holiday?: IHolidayState[]
     timeDetail?: ITimerState | undefined,
     mapWork?: IMapWork[]
}

const initialState: AuthState = {
     contract: [],
     lishMent: [],
     isLoading: false,
     lishMentDetail: {},
     listTimer: [],
     holiday: [],
     timeDetail: undefined,
     mapWork: []
}
const BASE_URL = "https://622a9e9914ccb950d220ac3e.mockapi.io"
const BASE_URL2 = "https://61c7b39990318500175474a1.mockapi.io/api"
export let getContract = createAsyncThunk("contract/getContract", async (thunkApi) => {

     try {
          const url = thunkApi;



          const respon = await axiosClient.get(`/${url}`)
          return respon
     }catch(err) {}
})
export let deleteContract = createAsyncThunk("contract/deleteContract", async (params:any, thunkApi?:any) => {
     try {

          const respon = await axios.delete(`${BASE_URL}/${params.url}/${params.id}`)
          return respon
     }catch (err) {}
})


export let postContract = createAsyncThunk("contract/postContract", async (params:any) => {
     try {
          const respon = await axios.post(`${BASE_URL}/${params.url}`, params.state)

          return respon
     }catch (err) {}
})
export let putContract = createAsyncThunk("contract/putContract", async(params:any) => {
     try {
          const respon = await axios.put(`${BASE_URL}/${params.url}/${params.state.id}`, params.state)


          return respon;
     }catch(err) {}
})
export let getLishMent = createAsyncThunk("lishMent/getLishMent", async(params:any) => {
    try {
     const respon = await axios.get(`${BASE_URL}/${params}`)
     return respon;
    }catch(err) {}
})


export let putLishMent = createAsyncThunk("lishMent/putLishMent", async(params:any) => {
     try {
          const respon = await axios.put(`${BASE_URL}/${params.url}/${params.state.id}`, params.state)


          return respon;
     }catch(err) {}
})

export let deleteLishMent = createAsyncThunk("lishMent/deleteLishMent", async (params:any, thunkApi?:any) => {
     try {

          const respon = await axios.delete(`${BASE_URL}/${params.url}/${params.id}`)
          return respon
     }catch (err) {}
})

export let postLishMent = createAsyncThunk("lishMent/postLishMent", async (params:any) => {
     try {
          const respon = await axios.post(`${BASE_URL}/${params.url}`, params.state)

          return respon
     }catch (err) {}
})

export let getLishMentByCode = createAsyncThunk("lishMent/getLishmentByCode", async (params:any,thunkApi) => {

     try {

          const respon = await axiosClient.get(`${BASE_URL}/${params.url}/${params.id}`)
          return respon
     }catch(err) {}
})
export let getListTimerWork = createAsyncThunk("timer/getListTimerWork", async (params:any) => {
     try {
          const respon = axiosClient.get(`${BASE_URL}/${params.url}`)
          return respon;
     }catch(err) {}
})
export let deleteTimerWork = createAsyncThunk("timer/deleteTimerWork", (params:any) => {
     try {
          const respon = axios.delete(`${BASE_URL}/${params.url}/${params.id}`)
          return respon
     }catch(err) {}
})
export let getTimerWorkByCode = createAsyncThunk('timer/getTimerWorkByCode', (params: any) => {
     try {
          const respon = axios.get(`${BASE_URL}/${params.url}/${params.id}`)
          return respon
     }catch (err) {}
})
export let putTimerWork = createAsyncThunk("timer/putTimerWork", (params: any) => {
     try {
          const respon = axios.put(`${BASE_URL}/${params.url}/${params.id}`, params.object)
          return respon
     }catch(err) {}
})
export let postTimerWork = createAsyncThunk("timer/postTimerWork", (params:any) => {
     try {
          const respon  = axios.post(`${BASE_URL}/${params.url}`, params.object)
          return respon
     }catch(err) {}
})
export let getListHoliday = createAsyncThunk("holiday/getListHoliday", (params: any) => {
     try {
          const respon =  axios.get(`${BASE_URL2}/${params.url}`)
          return respon
     }catch(err) {}
})
export const postHoliday = createAsyncThunk("holiday/postHoliday", (params:any) => {
     try {
          const  respon = axios.post(`${BASE_URL2}/${params.url}`, params.object)
          return respon
     }catch(err) {}
})
export const deleteHoliday = createAsyncThunk("holiday/deleteHoliday", (params:any) => {
     try {
          const respon = axios.delete(`${BASE_URL2}/${params.url}/${params.id}`)
          return respon;
     }catch(err) {}
})
export const getListMapWork = createAsyncThunk("mapWork/getListMapWork", (params: any) => {
    try {
     const respon = axios.get(`${BASE_URL2}/${params.url}`);
     return respon;
    }catch(err) {}
})
export const putMapWork = createAsyncThunk("mapWork/putMapWork", (params: any) => {
     try {
          const respon = axios.put(`${BASE_URL2}/${params.url}/${params.id}`, params.obj)
          return respon
     }catch(err) {}
})
export const postMapWork = createAsyncThunk("mapWork/postMapWork", (params: any) => {
     try {
          const respon = axios.post(`${BASE_URL2}/${params.url}`, params.url)
          return respon
     }catch(err) {}
})
export const deleteMapWork = createAsyncThunk("mapWork/deleteMapWork", (params:any) => {
     try {
          const respon = axios.delete(`${BASE_URL2}/${params.url}/${params.id}`)
          return respon
     }catch(err) {}
})
export const authSlice = createSlice({
     name: 'auth',
     initialState,
     reducers: {
           getLstContract(state, {payload}) {
               state.contract = payload
          },

     },
     extraReducers(builder) {
          builder.addCase(getContract.pending, (state, action) => {
               state.isLoading = true
          })
          builder.addCase(getContract.fulfilled, (state, action) => {
               state.isLoading = false
               state.contract = action.payload?.data

          })
          builder.addCase(deleteContract.fulfilled, (state, action) => {
               state.isLoading = false
               let data = state.contract?.filter(item => item.id !== action.payload?.data.id)
               state.contract = data
             })
             builder.addCase(postContract.pending, (state, action) => {
                   state.isLoading = true

             })
             builder.addCase(postContract.fulfilled, (state, action) => {
               state.isLoading = false
               state.contract?.push(action.payload?.data)



         })
         builder.addCase(putContract.pending, (state, action) => {
               state.isLoading = true;
         })
         builder.addCase(putContract.fulfilled, (state, action) => {
          state.isLoading = false;
          const data = state.contract?.map(item => {
               if(item.id == action.payload?.data.id) {
                    return action.payload?.data
               }return item;
          })
          state.contract = data;
         })
         builder.addCase(getLishMent.pending, (state, action) => {
          state.isLoading = true
         })
         builder.addCase(getLishMent.fulfilled, (state , action) => {
               state.isLoading = false;
               state.lishMent = action.payload?.data;
         })
         builder.addCase(getListTimerWork.pending, (state, action) => {
               state.isLoading = true
         })
         builder.addCase(getListTimerWork.fulfilled, (state, action) => {
          state.isLoading  =false;
          state.listTimer = action.payload?.data;
         })
         builder.addCase(deleteTimerWork.pending, (state, action) => {
          state.isLoading = true;
         })
         builder.addCase(deleteTimerWork.fulfilled, (state,action) => {
          state.isLoading = false
          const data = state.listTimer?.filter(item => item.id !== action.payload?.data.id)
          state.listTimer = data;
         })
         builder.addCase(getTimerWorkByCode.pending, (state, action) => {
          state.isLoading = true
         })
         builder.addCase(getTimerWorkByCode.fulfilled, (state, action) => {
          state.isLoading = false;
          state.timeDetail = action.payload?.data;
         })
         builder.addCase(putTimerWork.fulfilled, (state, action) => {
          const data = state.listTimer?.map(item => {
               if(item.id === action.payload?.data.id) {
                    return action.payload?.data
               }return item
          })
          state.listTimer = data;
         })
         builder.addCase(postTimerWork.pending , (state, action) => {
          state.isLoading = true;
         })
         builder.addCase(postTimerWork.fulfilled, (state, action) => {
          state.isLoading = false;
          state.listTimer?.push(action.payload?.data)
         })

     builder.addCase(deleteLishMent.fulfilled, (state, action) => {
          state.isLoading = false
          let data = state.lishMent?.filter(item => item.id !== action.payload?.data.id)
          state.lishMent = data
        })

        builder.addCase(postLishMent.pending, (state, action) => {
          state.isLoading = true

    })
    builder.addCase(postLishMent.fulfilled, (state, action) => {
      state.isLoading = false
      state.lishMent?.push(action.payload?.data)



})
builder.addCase(getLishMentByCode.pending, (state, action) => {
     state.isLoading = true
})
builder.addCase(getLishMentByCode.fulfilled, (state, action) => {
     state.isLoading = false;
     state.lishMentDetail = action.payload?.data;
})


builder.addCase(putLishMent.fulfilled, (state, action) => {

const data = state.lishMent?.map(item => {
     if(item.id == action.payload?.data.id) {
          return action.payload?.data
     }return item;
})
state.lishMent = data;
})


builder.addCase(getListHoliday.fulfilled, (state, action) => {
     state.isLoading =  false;
     state.holiday = action.payload?.data
})
builder.addCase(postHoliday.pending,(state,action) => {
     state.isLoading = true
})
builder.addCase(postHoliday.fulfilled, (state, action) => {
     state.isLoading = false;
     state.holiday?.push(action.payload?.data)
})

builder.addCase(deleteHoliday.fulfilled, (state, action) => {
     const data  = state.holiday?.filter(item => item.id !== action.payload?.data.id);
     state.holiday = data;
})
builder.addCase(getListMapWork.pending, (state, action) => {
     state.isLoading = true
})
builder.addCase(getListMapWork.fulfilled, (state, action) => {
     state.isLoading = false;
     state.mapWork = action.payload?.data;
})
builder.addCase(putMapWork.pending, (state, action) => {
     state.isLoading = true;
})
builder.addCase(putMapWork.fulfilled, (state, action) => {
     state.isLoading = false;
     const data = state.mapWork?.map(item => {
          if(item.id === action.payload?.data.id) {
               return action.payload?.data
          }
          return item
     })
     state.mapWork = data
})
builder.addCase(postMapWork.pending, (state, action) => {
     state.isLoading = true;
})
builder.addCase(postMapWork.fulfilled, (state, action) => {
     state.isLoading = false;
     state.mapWork?.push(action.payload?.data);
})
builder.addCase(deleteMapWork.pending, (state) =>{
     state.isLoading = true
})
builder.addCase(deleteMapWork.fulfilled, (state,action) => {
     state.isLoading = false;
     const data = state.mapWork?.filter(item => item.id !== action.payload?.data.id);
     state.mapWork = data;
})

     }
})





// action
export const authActions = authSlice.actions;

// reducer
const authReducer = authSlice.reducer;
export const selectContract = (state:any) => state.auth.contract
export const selectIsLoading = (state:any) => state.auth.isLoading
export const selectLishMent = (state:any) => state.auth.lishMent
export const selectLishMentDetail = (state:any) => state.auth.lishMentDetail
export const selectListTimer = (state:any) => state.auth.listTimer;
export const selectHoliday = (state:any) => state.auth.holiday;
export const selectTimeDetail = (state:any) => state.auth.timeDetail;
export const selectMapWork = (state:any) => state.auth.mapWork
export default authReducer;
