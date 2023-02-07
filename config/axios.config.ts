import Axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000/"
export const BASE_URL = "http://192.168.1.64:8000/"

const AxiosWithContentType = (contentType: string) => {
    const axios = Axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-type": contentType,
      },
    });

    // axios.interceptors.request.use((request) => {
    //     console.log("Starting Request", JSON.stringify(request, null, 2));
    //     return request;
    // });
    
    // axios.interceptors.response.use((response) => {
    //     console.log("Response:", JSON.stringify(response, null, 2));
    //     return response;
    // });
    
    return axios;

};

export const AppAxios = AxiosWithContentType("application/json");

export const MultipartAxios = AxiosWithContentType("multipart/form-data");
