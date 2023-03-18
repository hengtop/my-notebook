<template>
  <div class="comments-box">
    <div v-if="commentsInfo[0]">
      <div class="comments-title">
        <div class="comments-text">用户评价</div>
        <div class="comments-more">
          <span class="more-text">更多</span>
          <i class="arrow-right">></i>
        </div>
      </div>
      <div class="comments-user-info">
        <div class="user-img">
          <img :src="commentsInfo[0].user.avatar" alt />
        </div>
        <div class="user-id">{{commentsInfo[0].user.uname}}</div>
      </div>
      <div class="detail-comments">
        <p class="comments-content">{{commentsInfo[0].content}}</p>
        <div class="goods-info">
          <div class="comments-time">{{commentsInfo[0].created | formatDate }}</div>
          <div class="goods-size">{{commentsInfo[0].style}}</div>
        </div>
        <div v-if="commentsInfo[0].images" class="imgs-info">
          <img v-for="(item,index) in commentsInfo[0].images" :key="index" :src="item" alt />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="comments-title">
        <div class="comments-text">用户评价</div>
      </div>
      <div class="no-comments">
        <p>该宝贝暂时还没有评论哦。</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { formatDate } from "common/utils";
export default {
  name: "detailCommentInfo",
  props: {
    commentsInfo: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  //将时间戳转换为年-月-日格式
  filters: {
    formatDate(time) {
      return formatDate(time);
    }
  },
  components: {}
};
</script>

<style scoped>
.comments-box {
  padding: 5px 12px;
  border-bottom: 5px solid #f2f5f8;
}
.comments-title {
  display: flex;
  line-height: 50px;
  justify-content: space-between;
  align-items: center;
  color: #333333;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.comments-text {
  font-size: 15px;
}
.more-text {
  font-size: 13px;
  margin-right: 10px;
}
.comments-user-info {
  display: flex;
  padding: 10px 0 5px;
}
.user-img img {
  width: 42px;
  border-radius: 50%;
  margin-right: 10px;
}
.user-id {
  line-height: 42px;
}
.detail-comments {
  padding: 0 5px 15px;
}
.comments-content {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}
.goods-info {
  display: flex;
  font-size: 12px;
  color: #999;
  margin: 10px 0;
}
.comments-time {
  margin-right: 8px;
}
.imgs-info img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
.no-comments {
  line-height: 50px;
  text-align: center;
}
</style>
