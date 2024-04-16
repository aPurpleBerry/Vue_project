import { createApp } from 'vue'
import App from '@/App.vue'

// 引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// SVG插件需要配置代码
import 'virtual:svg-icons-register'
// 自定义插件
import gloablComponent from './components/index';

// 引入模板的全局样式
import '@/styles/index.scss'

// 引入路由进
import router from './router'

import pinia from './store'

// createApp(App).mount('#app')
const app = createApp(App) //获取实例对象

app.use(ElementPlus, {
  locale: zhCn, // 国际化
})
app.use(gloablComponent);

app.use(router)

app.use(pinia)

// 将应用挂载
app.mount('#app')

