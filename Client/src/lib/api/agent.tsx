import axios from "axios";
import { store } from "../stores/store";
const sleep = (delay : number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const agent = axios.create({
  baseURL :import.meta.env.VITE_API_URL,
});
agent.interceptors.request.use( async config => {
store.uiStore.isbusy();
return config;
});
agent.interceptors.response.use( async response => {
 try {   
    await sleep(1000);
    store.uiStore.isidle();
    return response;    
 } catch (error) {
   console.log(error);
   return Promise.reject(error);
 }
});

export default agent;
