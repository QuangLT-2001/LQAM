import { ListReponse } from "./../modules/common";
import { contract } from "./../modules/contract";
import * as api from "./helper";
const contractApi =  {
     getAll() {
          return api.get("contract")
     }
}
const deleteApi = {
     deleteData(id:string|number) {
          const url = "contract";
          return api.deleteData(url, {params: id})
     }
}

const testApi = {
     getData() {
          return api.getAll("contract")
     }
}
export default {contractApi, deleteApi, testApi}