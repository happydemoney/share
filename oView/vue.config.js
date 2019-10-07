// vue.config.js - https://cli.vuejs.org/zh/config
const path = require('path')

module.exports = {
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    }
}