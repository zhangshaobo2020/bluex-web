import request from '../axios'

export function programPage(params) {
    return request({
        url: '/program/programPage',
        method: 'get',
        params: params
    })
}

export function programDetail(params) {
    return request({
        url: '/program/programDetail',
        method: 'get',
        params: params
    })
}

export function programSubmit(data) {
    return request({
        url: '/program/programSubmit',
        method: 'post',
        data: data
    })
}

export function programDelete(params) {
    return request({
        url: '/program/programDelete',
        method: 'post',
        params: params
    })
}