<template>
  <v-form ref="loginForm" v-model="valid" lazy-validation class="login-form">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Contraseña"
      type="password"
      required
    ></v-text-field>
    <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>

    <v-btn :disabled="!valid" @click="submitLogin" color="primary" class="login-btn">INICIAR SESION</v-btn>
  </v-form>
</template>

<script>
import { login } from '@/services/authService';

export default {
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      error: null,
      emailRules: [
        v => !!v || "El email es requerido",
      ],
      passwordRules: [
        v => !!v || "La contraseña es requerida",
        v => v.length >= 5 || "La contraseña debe tener al menos 5 caracteres"
      ]
    };
  },
  methods: {
    async submitLogin() {
      try {
        const response = await login(this.email, this.password);
        if (response.success) {
          this.$emit("loginSuccess");
        }
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.login-btn {
  display: block;
  margin: 20px auto;
}
</style>