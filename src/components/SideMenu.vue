<template>
  <v-card>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
      <v-list-item class="px-2">
        <router-link to="/profile">
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/women/50.jpg"
            ></v-img>
          </v-list-item-avatar>
        </router-link>
        <v-list-item-title>{{ username }}</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense
        ><router-link v-for="item in items" :key="item.title" :to="item.link">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item></router-link
        >
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-view-dashboard", link: "/" },
        { title: "Work", icon: "mdi-domain", link: "/work" },
      ],
      mini: true,
      username: "Takoua Bouden",
    };
  },
};
</script>
<style lang="scss" scoped>
.v-list-item__content,
.v-list-item__title,
.v-list-item__icon,
.v-icon.v-icon,
.v-btn--icon.v-size--default .v-icon {
  color: white;
}
.v-navigation-drawer {
  background: #2a3e4e;
}
.v-card {
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  display: inline;
}
a {
  text-decoration: none;
}
</style>
