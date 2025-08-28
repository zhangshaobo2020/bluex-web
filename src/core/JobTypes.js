const jobTypes = [
    {
        value: 'A',
        label: 'CRON定时任务'
    },
    {
        value: 'B',
        label: '文件系统监听'
    },
    {
        value: 'C',
        label: 'HTTP请求'
    },
    {
        value: 'D',
        label: 'WebSocket侦听'
    },
    {
        value: 'E',
        label: 'MQ消息队列'
    }
]

function matchJobType(type) {
    return jobTypes.filter(jobType => jobType.value === type)[0].label
}

export {
    jobTypes, matchJobType
}