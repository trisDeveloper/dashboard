<template>
  <div class="nav">
    <v-app-bar-nav-icon
      class="menu"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-list-item class="px-2">
        <router-link to="/profile">
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/women/19.jpg"
            ></v-img>
          </v-list-item-avatar>
        </router-link>
        <v-list-item-title>{{ username }}</v-list-item-title>

        <v-btn icon @click.stop="drawer = !drawer">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-view-dashboard", link: "/" },
        { title: "Work", icon: "mdi-domain", link: "/work" },
      ],
      username: "Takoua Bouden",
    };
  },
};
</script>
<style lang="scss" scoped>
.menu {
  position: fixed;
  left: 10px;
  top: 10px;
  padding: 10px;
  background: #ff75a400;
  border: 1px solid #e91e63;
  z-index: 3;
  .v-btn--icon.v-size--default .v-icon,
  .v-icon.v-icon {
    color: #e91e63;
  }
}
.v-list-item__content,
.v-list-item__title,
.v-list-item__icon,
.v-icon.v-icon {
  color: white;
}
.v-navigation-drawer {
  background: #070e36;
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
