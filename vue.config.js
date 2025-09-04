const {defineConfig} = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin()
        ]
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9090',
                changeOrigin: true,
            },
            '/api/ws': {
                target: 'http://localhost:9090',
                changeOrigin: true,
                ws: true
            }
        }
    }
})
