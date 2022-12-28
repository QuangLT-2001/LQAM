import  {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit"
import _ from "lodash"

import axios, { AxiosHeaders } from "axios";
import { takeLatest } from "redux-saga/effects";

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
export interface IManagerCourse {
     id?: string|number;
     createdAt?: string|number;
     name?: string;
     department?: string;
     rank?: any;
     type?: string;
     checkFinish?: string;
     status?: boolean;
     contentCourse?: ContentCourseState[];
     totalStudent?:number;
     totalFinish?: number;
     endDate?: string|number;

}
export interface ContentCourseState {
     chapter: string;
     finish: string;
     desc: string;
     file: string;
     slideShow: Array<[]>,

}
export interface AuthState {
     contract?: TAuthState[],
     isLoading: boolean,
     lishMent?: TLishMentState[],
     lishMentDetail?: TLishMentState,
     listTimer?: ITimerState[]
     holiday?: IHolidayState[]
     timeDetail?: ITimerState | undefined,
     mapWork?: IMapWork[];
     managerCourse?: IManagerCourse[],
     managerCourceDetail?: any,
     imageSlide?: any,
     lstChapter?: any,
     lstFile?: any,
     lstChapterBackup?:any,
     lstQuestion?:any
}

let initialState: AuthState = {
     contract: [],
     lishMent: [],
     isLoading: false,
     lishMentDetail: {},
     listTimer: [],
     holiday: [],
     timeDetail: undefined,
     mapWork: [],
     managerCourse:[],
     managerCourceDetail: {
          contentCourse: [],
          name: "",
          department: "",
          rank: "",
          type: "",
          checkFinish: "",
          status: true,
          endDate: "",
          description: "",
          lstStudent: []
     },
     imageSlide: [],
     lstChapter: [],
     lstFile: [],
     lstChapterBackup: [],
     lstQuestion: []
}
const BASE_URL = "https://622a9e9914ccb950d220ac3e.mockapi.io"
const BASE_URL2 = "https://61c7b39990318500175474a1.mockapi.io/api"
const BASE_URL3 = "https://62b147d3196a9e987032776f.mockapi.io/v10"
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
export const getListManagerCourse = createAsyncThunk("managerCourse/getListManagerCourse", (params:any) => {
     try {
          const respon = axios.get(`${BASE_URL3}/${params.url}`)
          return respon;
     }catch(err) {}
})
export const postManagerCourse = createAsyncThunk("managerCourse/postManagerCourse", (params:any) => {
     try {
          const respon = axios.post(`${BASE_URL3}/${params.url}`, params.object)
          return respon;
     } catch(err) {}
})
export const getManagerCourseByCode = createAsyncThunk("managerCourse/getManagerCourseByCode", (params:any) => {
     try {
          const respon = axios.get(`${BASE_URL3}/${params.url}/${params.id}`)
          return respon
     }catch(err) {}
})
export const deleteManagerCourse = createAsyncThunk("managerCourse/deleteManagerCourse", (params:any) => {
     try {
          const respon  = axios.delete(`${BASE_URL3}/${params.url}/${params.id}`)
          return respon
     } catch(err) {}
})
export const putManagerCourse = createAsyncThunk("managerCourse/putManagerCourse", (params:any) => {
     try {
          const respon = axios.put(`${BASE_URL3}/${params.url}/${params.id}`, params.object)
          return respon
     }catch(err) {}
})
export const postListImages = createAsyncThunk("imageSlide/postListImages", (params:any) => {
     try {

          const respon =  axios.post(params.url, params.formData, params.options).then(respon => respon.data)
           return respon;
     }catch(err) {


     }
})
export const putManagerCourseAll = createAsyncThunk("managerCourse/putManagerCourseAll", (params:any) => {
     try {
          const respon = axios.put(`${BASE_URL3}/${params.url}/${params.id}`, params.object)
          return respon;
     }catch(err) {}
})
export const deleteCourse = createAsyncThunk("managerCourse/deleteCourse", (params:any) => {
     try {
          const respon = axios.delete(`${BASE_URL3}/${params.url}/${params.id}`)
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
          deleteFile(state, action) {
               const data = state.imageSlide.filter((item:any, index:number) => index !== action.payload.id);
               state.imageSlide = data
          },
          addChapter(state, action) {
               state.lstChapter = state.lstChapter.concat(action.payload)
               state.managerCourceDetail?.contentCourse?.push(action.payload)

          },
          addFileSource(state, action) {
               state.lstFile = state.lstFile.concat(action.payload)

          },
          deleteFileSource(state, action)  {
               state.lstFile = state.lstFile.filter((item:any, index:any) => item.name !== action.payload.name)
          },
          updateFileSource(state) {
               state.imageSlide = []
               state.lstFile = []
               state.lstChapter = []
          },
          addLstChapterBackup(state, action) {
               state.lstChapterBackup = action.payload
          },
          postLstChapterBackup(state, action) {
               state.lstChapterBackup.push(action.payload)
          },
          putLstChapterBackup(state, action)  {
               const data = state.lstChapterBackup.map((item:any) => {
                    if(item.id === action.payload.id) {
                         return action.payload
                    }else {
                         return item
                    }
               })
               state.lstChapterBackup = data

          },
          deleteChapterBackup(state, action)  {
               const data = state.lstChapterBackup.filter((item:any) => item.id !== action.payload.id)
               state.lstChapterBackup = data
          },
          addImageSlide(state,action) {
               state.imageSlide = _.intersectionBy(state.imageSlide.concat(action.payload), "asset_id")

          },
          deleteImageSlide(state, action) {
               state.lstFile = state.lstFile.filter((item:any, index:any) => item.asset_id !== action.payload.id)
          },
          addListQuestion(state, action) {
               state.lstQuestion = action.payload;
          }

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
builder.addCase(getListManagerCourse.pending, (state, action) => {
     state.isLoading = true;
})
builder.addCase(getListManagerCourse.fulfilled, (state, action) => {
     state.isLoading = false;
     state.managerCourse = action.payload?.data
})
builder.addCase(postManagerCourse.pending, (state, action) => {
     state.isLoading = true;
})
builder.addCase(postManagerCourse.fulfilled, (state, action) => {
     state.isLoading = false;
     state.managerCourse?.unshift(action.payload?.data)
})
builder.addCase(getManagerCourseByCode.pending, (state) => {
     state.isLoading = true;
})
builder.addCase(getManagerCourseByCode.fulfilled, (state, action) => {
     state.isLoading = false;
     const data = action.payload?.data

     state.managerCourceDetail =  data
})
builder.addCase(deleteManagerCourse.pending, (state, action) => {
     state.isLoading = true;
})
builder.addCase(deleteManagerCourse.fulfilled, (state, action) => {
     state.isLoading  = false;
     const data  = state.managerCourse?.filter(item => item.id !== action.payload?.data.id);
     state.managerCourse = data;
})

builder.addCase(postListImages.fulfilled, (state, action) => {
     state.isLoading = false;
     state.imageSlide = state.imageSlide.concat(action.payload)



})
builder.addCase(putManagerCourse.pending, (state, action) => {
     state.isLoading = true
})
builder.addCase(putManagerCourse.fulfilled, (state, action) => {
     state.isLoading = false;

     const data = state.managerCourse?.map(item => {
          if(item.id === action.payload?.data.id) {
               return action.payload?.data
          }return item;
     })
     state.managerCourse = data;
     // window.location.reload()

})
builder.addCase(putManagerCourseAll.pending, (state, action) => {
     state.isLoading  = true
})
builder.addCase(putManagerCourseAll.fulfilled, (state, action) => {
     state.isLoading = false;
     const data = state.managerCourse?.map((item:any) => {
          if(item.id === action.payload?.data.id) {
               return action.payload?.data
          }else {
               return item
          }
     })
     state.managerCourceDetail = data

})
builder.addCase(deleteCourse.pending, (state, action) => {
     state.isLoading = true
})
builder.addCase(deleteCourse.fulfilled, (state, action) => {
     state.isLoading = false
     const data  = state.managerCourse?.filter((item:any) => item.id !== action.payload?.data.id)
     state.managerCourse = data;

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
export const selectManagerCourse = (state:any) => state.auth.managerCourse;
export const selectManagerCourceDetail = (state:any) => state.auth.managerCourceDetail;
export const selectImageSlide = (state:any) => state.auth.imageSlide;
export const selectLstChapter  = (state:any) => state.auth.lstChapter
export const selectLstFile = (state:any) => state.auth.lstFile
export const selectLstChapterBackup = (state:any) => state.auth.lstChapterBackup
export  const selectLstQuestion = (state:any) => state.auth.lstQuestion
export default authReducer;
