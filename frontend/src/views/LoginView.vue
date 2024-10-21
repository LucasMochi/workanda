<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="login-card">
      <v-card-title class="text-center title-centered">INICIAR SESION</v-card-title>
      <v-card-text>
        <LoginForm @loginSuccess="handleLoginSuccess" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  components: {
    LoginForm
  },
  methods: {
    handleLoginSuccess() {
      this.$router.push("/users"); 
    }
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}

.login-card {
  width: 500px;
  padding: 20px;
}

.title-centered {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>