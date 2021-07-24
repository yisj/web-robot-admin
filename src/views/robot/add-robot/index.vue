<template functional>
  <div style="padding:30px;">
    <el-form label-position="right" label-width="100px">
      <el-form-item label="로봇 IP 주소">
        <el-input-number v-model="ip1" :controls="false" class="input-ip" />.
        <el-input-number v-model="ip2" :controls="false" class="input-ip" />.
        <el-input-number v-model="ip3" :controls="false" class="input-ip" />.
        <el-input-number v-model="ip4" :controls="false" class="input-ip" />
      </el-form-item>
      <el-form-item>
        <p>IP주소:{{ ip1 }}</p>
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
      connect: false,
      ip1: 0,
      ip2: 0,
      ip3: 0,
      ip4: 0
    }
  }
}
</script>

<style>
.input-ip {
  width: 120px;
}
</style>
