import request from '../axios'

export function jobPage(params) {
    return request({
        url: '/job/jobPage',
        method: 'get',
        params: params
    })
}

export function jobDetail(params) {
    return request({
        url: '/job/jobDetail',
        method: 'get',
        params: params
    })
}

export function jobSubmit(data) {
    return request({
        url: '/job/jobSubmit',
        method: 'post',
        data: data
    })
}

export function jobDelete(params) {
    return request({
        url: '/job/jobDelete',
        method: 'post',
        params: params
    })
}

export function jobRegister(params) {
    return request({
        url: '/job/jobRegister',
        method: 'post',
        params: params
    })
}

export function jobUnregister(params) {
    return request({
        url: '/job/jobUnregister',
        method: 'post',
        params: params
    })
}