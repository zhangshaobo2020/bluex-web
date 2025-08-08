const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/bluex': {
                target: 'http://localhost:9090',
                changeOrigin: true,
            }
        }
    }
})
