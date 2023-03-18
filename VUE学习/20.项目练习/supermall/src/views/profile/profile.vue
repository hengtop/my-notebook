<template>
  <div id="profile">
   <navBar class="profile-nav">
     <div slot="center">我的档案</div>
   </navBar>
    <avatar></avatar>
    <cardInfo></cardInfo>
    <toolList :list-data="orderList"></toolList>
    <toolList :list-data="serviceList"></toolList>
  </div>
</template>

<script type="text/ecmascript-6">
import navBar from "components/common/navBar/navBar";
import avatar from "./childComps/avatar";
import cardInfo from './childComps/cardInfo'
import toolList from './childComps/toolList'
export default {
  name: "profile",
  data() {
    	return {
		    orderList: [
			    {icon: 'message.svg', info: '我的消息'},
			    {icon: 'pointer.svg', info: '积分商城'},
			    {icon: 'vip.svg', info: '会员卡'},
		    ],
		    serviceList: [
			    {icon: 'cart.svg', info: '我的购物车'},
			    {icon: 'shopping.svg', info: '下载购物APP'},
		    ]
      };
  },
  components: {
    avatar,
    navBar,
    cardInfo,
    toolList,
  },
};
</script>

<style scoped>
#profile{
  background-color: #f2f2f2;
}
.profile-nav{
  background-color: var(--color-tint);
  font-size: 16px;
  color: #fff;
}
</style>
