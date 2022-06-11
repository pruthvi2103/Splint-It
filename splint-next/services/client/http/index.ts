import axios, { AxiosRequestConfig } from "axios";
export const httpService = {
  get: (url: string, config?: AxiosRequestConfig) => {
    return axios.get(url, config);
  },
  post: <T>(url: string, payload: any, config?: AxiosRequestConfig) => {
    return axios.post<T>(url, payload, config);
  },
  put: (url: string, payload: any, config?: AxiosRequestConfig) => {
    return axios.put(url, payload, config);
  },
};
