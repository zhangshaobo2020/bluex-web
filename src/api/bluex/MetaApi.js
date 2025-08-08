import request from '../axios'

export function graphDefinition() {
    return request({
        url: '/meta/graphDefinition',
        method: 'get',
    })
}