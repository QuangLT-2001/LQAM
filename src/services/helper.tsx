import {toast} from "react-toastify"
import axios from "axios"
const BASE_URL:string = "https://622a9e9914ccb950d220ac3e.mockapi.io/"
const get  = async (url: string) => {
     try {
          const requestOption = {
               method: "GET",
               headers: {
                    'Content-Type': 'application/json',
                },
          }
          let fullUrl = url.indexOf('http') === 0 ? url : BASE_URL  + url;
          const response = await fetch(fullUrl , requestOption);
          const data = await response.json();

          return data;
     }catch(error:any) {
          toast.error(error.message || 'Failed');
     }
}
const deleteData = async (url: string, params: any) => {
     try {
          const requestOption = {
               method: "DELETE",
               headers: {
                    'Content-Type': 'application/json',
                },
          }

          let fullUrl = url.indexOf('http') === 0 ? url : BASE_URL  + url;
          const response = await fetch(fullUrl + `/` + params.params, requestOption);

          const data = await response.json();

          return data;
     }catch(error:any) {
          toast.error(error.message || 'Failed');
     }
}

const getAll = async (url:string) => {
     let respon = await axios.get(BASE_URL + url).then(respon => respon
     );
     return respon
}





export {get, deleteData, getAll}
