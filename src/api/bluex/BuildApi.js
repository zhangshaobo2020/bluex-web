import request from '../axios'

export function graphTransferTest(data) {
    return request({
        url: '/build/graphTransferTest',
        method: 'post',
        data: data
    })
}