import request from '../axios'

export function manuallyTriggeredTest(data) {
    return request({
        url: '/build/manuallyTriggeredTest',
        method: 'post',
        data: data
    })
}

export function fileSystemListenerTest(data) {
    return request({
        url: '/build/fileSystemListenerTest',
        method: 'post',
        data: data
    })
}