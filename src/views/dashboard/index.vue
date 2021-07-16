<template>
  <div class="container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>서버 시스템 정보</span>
      </div>
      OS: Ubuntu 20.04 LTS<br>
      IP: 213.23.121.43
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Dashboard',

  data() {
    return {
    }
  },
  created() {
  }
}
</script>

<style>
.container {
  padding: 20px;
  margin: 20px;
}
</style>
