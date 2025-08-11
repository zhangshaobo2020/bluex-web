import request from '../axios'

export function graphFile(data) {
    return request({
        url: '/save/graphFile',
        method: 'post',
        data: data,
        responseType: "blob"
    })
}