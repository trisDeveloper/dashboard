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
.v-main {
  margin-left: 60px;
}
</style>
