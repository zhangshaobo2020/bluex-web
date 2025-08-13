import request from '../axios'

export function autoMatchTest(data) {
    return request({
        url: '/build/autoMatchTest',
        method: 'post',
        data: data
    })
}