import './styles/index.scss' // 样式文件
import Icon from './components/icon'
import Card from './components/card'

const components = {
    Icon,
    Card
}

const oview = {
    ...components,
    oCard: Card,
    oIcon: Icon
}

const install = function(Vue) {
    if (install.installed) return;
    // locale.use(opts.locale);
    // locale.i18n(opts.i18n);

    Object.keys(oview).forEach(key => {
        Vue.component(key, oview[key]);
    });

    // Vue.prototype.$Loading = LoadingBar;
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
const API = {
    version: process.env.VERSION, // eslint-disable-line no-undef
    install, // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    ...components
}

export default API
