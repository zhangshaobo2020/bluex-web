const programTypes = [
    {
        value: 'SingleTriggerJob',
        label: '单次触发任务'
    },
    {
        value: 'CronJob',
        label: 'CRON定时任务'
    },
    {
        value: 'FileSystemListenJob',
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
        label: 'MQ消息队列侦听'
    },
    {
        value: 'OracleTableListenerJob',
        label: 'Oracle数据表侦听'
    }
]

function matchProgramType(type) {
    const filtered = programTypes.filter(item => item.value === type);
    return (filtered.length > 0) ? filtered[0].label : "";
}

export {
    programTypes, matchProgramType
}