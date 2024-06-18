// 【早上好|下午好|晚上好】
// 封装一个函数，获取一个结果：当前是上午/下午/晚上，通过内置函数Date
export const getTime = ()=>{
  let message = ''
  let hours = new Date().getHours()
  if(hours <= 9) {
    message = '早上'
  } else if(hours <= 12) {
    message = '上午'
  } else if(hours <= 14) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}