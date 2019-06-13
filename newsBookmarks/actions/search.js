import {NYT_Search_URL, NYT_Image_URL} from "../settings";


export const search_keyword = (keyword, page) => {
    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let body = JSON.stringify({keyword});
        return fetch(NYT_Search_URL + "&fq=headline:(" + keyword + ")" + "&sort=newest&page=" + page.toString(), {headers,})
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
                // console.log(res.data)
                let response = res.data.response;
                let docs = response.docs;
                let news = [];
                docs.map((doc) => {
                    let headline = doc.headline;
                    let web_url = doc.web_url;
                    let pub_date = doc.pub_date;
                    let image = doc.multimedia;
                    let small_image = image.filter(img => img.subtype === 'smallSquare252');
                    let small_image_url;
                    {
                        if (small_image.length>0) {
                            small_image_url = NYT_Image_URL + small_image[0].url
                        } else {
                            small_image_url = false
                        }
                    }
                    let news_item = {
                        'headline': headline.main,
                        'web_url': web_url,
                        'pub_date': pub_date,
                        'image_url': small_image_url
                    };
                    news.push(news_item)
                });
                return {'news': news};
            })
    }
}