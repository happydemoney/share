module.exports = {
    base: '/share',
    title: '相关技术及协议分享',
    description: '相关技术及协议分享',
    port: 8090,
    dest: '.vuepress/dist',
    themeConfig: {
        // nav: [
        //     {
        //         text: 'Languages',
        //         items: [
        //             { text: 'Chinese', link: '/language/chinese' },
        //             { text: 'Japanese', link: '/language/japanese' }
        //         ]
        //     }
        // ],
        sidebar: {
            '/base/': [
                'computer',
                'programming'
            ],
            '/Standard/': [
                ''
            ],
            '/HTTP/': [
                '',
                'Share'
            ],
            '/DesignPattern/': [
                '',
                'design',
                'simpleIntro',
                'detail'
            ]
        }
    }
}