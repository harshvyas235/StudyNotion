import axios from "axios"

export const acxiosInstance = axios.create({});

export  const apiconnector = (method,url,bodyData,headers,params)=>{
    return acxiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    })
}

