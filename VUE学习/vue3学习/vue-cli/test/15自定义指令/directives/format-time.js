import * as moment from 'moment';
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn'); 
export default function(app) {
  app.directive("format-time", {
    mounted(el, bindings) {
      const textContent = el.textContent
      let format = 'YYYY-MM-DD HH:mm:SS';
      let timestamp = parseInt(textContent);
      if(textContent.length === 10) {
        timestamp *= 1000;
      }
      if(bindings.value) {
        format = bindings.value; 
      }
      const time = moment(timestamp).format(format);
      el.textContent = time;
    },
  })
}