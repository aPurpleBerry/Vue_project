import {defineStore} from 'pinia'

let useLayoutSetting = defineStore('SettingStore', {
  state: ()=> {
    return {
      fold: false ,//用户控制菜单折叠还是收起
      refsh: false, // 用户是否点击了刷新按钮
    }
  }
})

export default useLayoutSetting