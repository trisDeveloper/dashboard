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
};
</script>
<style lang="scss" scoped>
#app {
  background-image: url("./assets/backdashboard.png");
  background-size: cover;
  background-position: left;
}

@media (min-width: 1904px) {
  .container {
    max-width: 1185px;
  }
}
</style>
