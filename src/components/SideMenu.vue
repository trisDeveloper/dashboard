<template>
  <div class="nav">
    <v-app-bar-nav-icon
      class="menu"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-list-item :style="{ justifyContent: 'space-between' }" class="px-2">
        <router-link
          v-if="!this.$store.state.isAuthenticated"
          to="/login"
          :style="{ display: 'flex', flexDirection: 'row' }"
        >
          <v-btn depressed large dark color="#890a01d4"> Sign Up </v-btn>
        </router-link>
        <router-link
          v-if="this.$store.state.isAuthenticated"
          to="/profile"
          :style="{ display: 'flex', flexDirection: 'row' }"
        >
          <v-list-item-avatar
            color="#ebe8e4"
            :style="{ fontSize: '35px', color: '#b08f88' }"
          >
            <img
              v-if="avatar"
              :src="avatar"
              :style="{ objectFit: 'cover' }"
              :alt="username"
            />
            {{ avatar ? "" : username.charAt(0).toUpperCase() }}
          </v-list-item-avatar>
          <v-list-item-title>{{ username }}</v-list-item-title>
        </router-link>

        <v-btn icon @click.stop="drawer = !drawer" :style="{ order: '3' }">
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
import axios from "axios";
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-view-dashboard", link: "/" },
        //{ title: "Work", icon: "mdi-domain", link: "/work" },
      ],
      username: "",
      avatar: null,
      logedin: true,
    };
  },
  created() {
    axios
      .get(
        `https://trisdev.pythonanywhere.com/api/users/${this.$store.state.userdata.id}`
      )
      .then((response) => {
        this.username = response.data.username;
        this.avatar = response.data.userimage;
      });
  },
};
</script>
<style lang="scss" scoped>
.menu {
  position: fixed;
  left: 10px;
  top: 10px;
  padding: 10px;
  background: #dadada5e;
  border: 1px solid #052251;
  z-index: 3;
  .v-btn--icon.v-size--default .v-icon,
  .v-icon.v-icon {
    color: #052251;
  }
}
.v-list-item__content,
.v-list-item__title,
.v-list-item__icon,
.v-icon.v-icon {
  color: white;
}
.v-navigation-drawer {
  background: #684f50;
  position: fixed;
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
