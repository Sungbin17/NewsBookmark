import {NYT_Image_URL, NYT_Search_URL, PUBLIC_URL} from "../settings";
import {AsyncStorage} from "react-native";


export const add_bookmark = (headline, web_url, pub_date, image_url, token) => {
    return (dispatch, getState) => {
        console.log(token)
        let headers = {"Content-Type": "application/json"};
        headers["Authorization"] = `JWT ${token}`;
        let body = JSON.stringify({headline, web_url, pub_date, image_url});

        return fetch(PUBLIC_URL + "/api/mybookmarks/", {headers, body, method: "POST"})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                console.log(res.data)

            })
    }
};

export const remove_bookmark = (headline, web_url, pub_date, image_url, token, remove) => {
    return (dispatch, getState) => {
        console.log(token)
        let headers = {"Content-Type": "application/json"};
        headers["Authorization"] = `JWT ${token}`;
        let body = JSON.stringify({headline, web_url, pub_date, image_url, remove});

        return fetch(PUBLIC_URL + "/api/mybookmarks/", {headers, body, method: "POST"})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                console.log(res.data)

            })
    }
};


export const mybookmarks = (token) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        headers["Authorization"] = `JWT ${token}`;
        return fetch(PUBLIC_URL + '/api/mybookmarks/?format=json', {headers,})
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return {status: res.status, data};
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
             .then(res => res.data)
    }
}