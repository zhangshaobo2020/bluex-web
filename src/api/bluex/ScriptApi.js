import request from '../axios'

export function scriptPage(params) {
    return request({
        url: '/script/scriptPage',
        method: 'get',
        params: params
    })
}

export function scriptDetail(params) {
    return request({
        url: '/script/scriptDetail',
        method: 'get',
        params: params
    })
}

export function scriptSubmit(data) {
    return request({
        url: '/script/scriptSubmit',
        method: 'post',
        data: data
    })
}

export function scriptDelete(params) {
    return request({
        url: '/script/scriptDelete',
        method: 'post',
        params: params
    })
}

export function scriptRegister(params) {
    return request({
        url: '/script/scriptRegister',
        method: 'post',
        params: params
    })
}

export function scriptUnregister(params) {
    return request({
        url: '/script/scriptUnregister',
        method: 'post',
        params: params
    })
}