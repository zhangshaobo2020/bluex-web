const jobTypes = [
    {
        value: 'CronJob',
        label: 'CRON定时任务'
    },
    {
        value: 'FileSystemJob',
        label: '文件系统监听'
    },
    {
        value: 'HttpJob',
        label: 'HTTP请求'
    },
    {
        value: 'WebSocketJob',
        label: 'WebSocket侦听'
    },
    {
        value: 'MQJob',
        label: 'MQ消息队列'
    }
]

function matchJobType(type) {
    const filtered = jobTypes.filter(jobType => jobType.value === type);
    return (filtered.length > 0) ? filtered[0].label : "";
}

export {
    jobTypes, matchJobType
}