import {ref, watch} from "vue"
export default function(title="默认title") {
  const titleRef = ref(title);
  watch(titleRef, (newValue) => {
    document.title = newValue;
  }, {
    immediate:true
  });
  
  //返回一个ref，监听修改来重设title
  return titleRef
}