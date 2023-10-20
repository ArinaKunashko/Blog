<template>
  <v-app>
    <v-app-bar app>
      <!-- Лого или название вашего приложения -->
      <v-toolbar-title>WEBBLOG</v-toolbar-title>
      <Navbar />

      <!-- Дополнительные элементы в заголовке, например, кнопки или меню -->
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn text @click="onLogout">Logout</v-btn>

    </v-app-bar>

    <!-- Основной контент вашего приложения -->
    <v-main class="white">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '../components/Navigations/Navbar.vue';

export default {
  name: 'DefaultLayout',
  data() {
    return {

    };
  },
  components: { Navbar },
  methods: {
    onLogout() {
      this.$store.dispatch("logout")
      this.$router.push("/admin/auth")
    }
  }
}

</script>
