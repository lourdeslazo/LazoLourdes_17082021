<template>
  <div>
    <LoginForm />
  </div>
</template>


<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm,
  }
}
</script>


<style scoped>
template {
  background-color: #f2f2f2;
}

.logo {
  width: 100%;
}

.white-block {
  display: flex;
  justify-content: center;
}

.btn-signup {
  background-color: #39ac73;
}
</style>