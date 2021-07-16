<template>
  <div class="app-container">
    <div v-if="user" />
  </div>
</template>

<script>

export default {
  name: 'Profile',
  data() {
    return {
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: '이승재',
        role: '관리자',
        email: 'admin@test.com'
      }
    }
  }
}
</script>
