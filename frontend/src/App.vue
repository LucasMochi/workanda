<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="text-uppercase">Test Lucas</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="isLoggedIn"
        @click="logout"
        text
      >
        Cerrar Sesion
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

<script>
import { logout } from '@/services/authService';

export default {
  data() {
    return {
      isLoggedIn: false
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('token');
    },
    logout() {
      logout();
      this.isLoggedIn = false;
      this.$router.push('/login');
    }
  },
  watch: {
    $route(to, from) {
      this.checkLoginStatus();
    }
  }
};
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
}
</style>
