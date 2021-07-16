<template functional>
  <div style="padding:30px;">
    <el-form label-position="right" label-width="100px">
      <el-form-item label="로봇 IP 주소">
        <el-input class="input-ip" />.
        <el-input class="input-ip" />.
        <el-input class="input-ip" />.
        <el-input class="input-ip" />
        <el-button @click="connect = true">로봇 연결</el-button>
        <el-alert v-if="connect" title="연결이 확인되었습니다." type="success" />
      </el-form-item>
      <el-form-item>
        <el-button>추가</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddRobot',
  data() {
    return {
      connect: false
    }
  }
}
</script>

<style>
.input-ip {
  width: 120px;
}
</style>
