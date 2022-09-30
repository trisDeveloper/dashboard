<template>
  <v-app>
    <SideMenu />
    <v-container>
      <v-main>
        <router-view />
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import SideMenu from "./components/SideMenu";
export default {
  name: "App",
  components: {
    SideMenu,
  },
  data: () => ({
    //
  }),
  created() {
    this.$store.state.userdata.id =
      JSON.parse(localStorage.getItem("userid")) ||
      this.$store.state.userdata.id;

    if (localStorage.getItem("userid")) {
      this.$store.state.userdata.id = JSON.parse(
        localStorage.getItem("userid")
      );
      this.$store.state.isAuthenticated = true;
    } else {
      this.$store.state.userdata.id = "";
      this.$store.state.isAuthenticated = false;
    }
  },
};
</script>
<style lang="scss" scoped>
#app {
  background-image: url("./assets/backdashboard.png");
  background-size: cover;
  background-position: left;
}
.container {
  min-height: 100vh;
}
.v-main {
  min-height: 100%;
}
@media (min-width: 1904px) {
  .container {
    max-width: 1185px;
  }
}
</style>
