<template>
  <div>
      <!-- 路由组件出口 -->
        <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    border: 0;
}
html,body {
  /* max-width:720px; */
  margin: 0 auto;
  overflow-x: hidden;
}
</style>
