<template>
  <div class="main">
    <div class="error">
      <div class="er">404</div>
      <p>抱歉！您访问的页面不存在或已转移&nbsp;:(</p>
    </div>
    <div>
      <div class="back" @click="toHome">返回首页</div>
    </div>
  </div>
</template>

<route>
{
  meta: {
    title: '404',
    constant: true,
    layout: false
  }
}
</route>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const toHome = () => {
  router.replace('/');
};
</script>

<style scoped lang="less">
.main {
  position: relative;
  padding-top: 20vh;
  .error {
    text-align: center;
    .er {
      width: 300px;
      margin: 0 auto;
      font-size: 60px;
      font-weight: 700;
      text-shadow: 0 0 0 whitesmoke;
      animation: smoky 5s;
      animation-iteration-count: infinite;
    }
    @keyframes smoky {
      to {
        text-shadow: 0 0 20px whitesmoke;
        opacity: 0;
      }
    }
    p {
      font-size: 18px;
      font-weight: 600;
    }
  }
  .back {
    width: 100px;
    text-align: center;
    margin: 20px auto;
    padding: 8px 0;
    border: 1px solid #333;
    border-radius: 100px;
    cursor: pointer;
    color: rbg(27, 27, 27);
    font-size: 15px;
  }
}
</style>
