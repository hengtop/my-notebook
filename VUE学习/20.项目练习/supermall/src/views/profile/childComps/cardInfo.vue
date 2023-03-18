<template>
  <div class="card">
    <div class="card-item">
      <div class="number">
        <span class="balance">0.00</span>元
      </div>
      <div class="card-info">我的余额</div>
    </div>
    <div class="card-item">
      <div class="number">
        <span class="balance">0</span>个
      </div>
      <div class="card-info">我的优惠</div>
    </div>
    <div class="card-item">
      <div class="number">
        <span class="balance">0</span>分
      </div>
      <div class="card-info">我的积分</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "cardInfo",
	}
</script>

<style scoped>
  .card {
    display: flex;
  }

  .card-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }

  .card-item:last-of-type {
    margin-right: 0;
  }

  .card-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .card-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .card-info {
    margin-top: 6px;
  }
</style>