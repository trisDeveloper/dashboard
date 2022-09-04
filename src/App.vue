<template>
  <v-app>
    <SideMenu />
    <v-main>
      <router-view />
    </v-main>
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
.v-app {
  max-width: 1440px;
}
.v-main {
  margin-top: 40px;
  max-width: 1140px;
}
</style>
