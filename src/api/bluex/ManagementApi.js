import request from '../axios'

export function taskList(params) {
    return request({
        url: '/management/taskList',
        method: 'get',
        params: params
    })
}

export function taskDetail(params) {
    return request({
        url: '/management/taskDetail',
        method: 'get',
        params: params
    })
}

export function taskSubmit(data) {
    return request({
        url: '/management/taskSubmit',
        method: 'post',
        data: data
    })
}