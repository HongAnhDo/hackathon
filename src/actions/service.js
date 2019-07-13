import axios from "axios/index";
import { MyConfig } from "../config/Config";

const getHeaders = (token) => {
    // const token = reactLocalStorage.get("user.token", "");
    if (!token) token = "";
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token
    }
}

const BASE_URL = MyConfig.getBaseUrl();

const MyService = {
    getRequestData: async function (url, params, token) {
        var result = await axios({
            method: 'get',
            url: BASE_URL + url,
            headers: getHeaders(token),
            params: params
        })
            .then(response => {
                return response.data;
            })
            .catch(
                error => console.log(error)
            )
        return result;
    },
    postRequestData: async function (url, data, token) {
        var result = await axios.post(BASE_URL + url, data, {
            headers: getHeaders(token)
        })
            .then(response => {
                return response.data;
            })
            .catch(
                error => console.log(error)
            )
        return result;
    },
    putRequestData: async (url, data, token) => {
        var result = await axios.put(BASE_URL + url, data, {
            headers: getHeaders(token)
        })
            .then(response => {
                return response.data;
            })
            .catch(
                error => console.log(error)
            )
        return result;
    },
    deleteRequestData: async (url, token) => {
        var result = await axios.delete(BASE_URL + url, {
            headers: getHeaders(token)
        })
            .then(response => {
                return response.data;
            })
            .catch(
                error => console.log(error)
            )
        return result;
    },
    postSendEmail: async function (url, params) {
        var result = await axios.post(url, {}, {
            headers: getHeaders(),
            params: params
        })
            .then(response => {
                return response.data;
            })
            .catch(
                error => console.log(error)
            )
        return result;
    },
}

export default MyService;