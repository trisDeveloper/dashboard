<template>
  <div class="shortlinks">
    <v-dialog v-model="dialog" persistent max-width="400px">
      <template v-slot:activator="{ on, attrs }">
        <div class="btn-div">
          <v-btn
            color="primary"
            :style="{
              maxWidth: '100%',
            }"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Add link
          </v-btn>
        </div>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add a link</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              label="URL"
              :rules="rules"
              v-model="url"
              hide-details="auto"
            ></v-text-field>
            <v-text-field
              label="Name"
              hint="Optional"
              v-model="urlname"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="dialog = false"> Close </v-btn>
          <v-btn color="darken-1" text @click="(dialog = false), add()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-for="(link, index) in links" :key="link.id" class="btn-div">
      <v-btn
        class="ma-2"
        :style="{
          padding: '0 0 0 5px',
          margin: '0px !important',
          maxWidth: '100px',
          width: '100%',
          justifyContent: 'space-between',
        }"
        outlined
        color="#9E9E9E"
      >
        <a :href="link.urlpath" target="_blank" :title="link.name" class="link">
          <img
            class="avatar-img"
            alt="user"
            :src="`https://s2.googleusercontent.com/s2/favicons?domain_url=${link.urlpath}`"
          />
          <div class="linkname">
            {{ link.name }}
          </div>
        </a>
        <v-snackbar v-model="snackbar" :timeout="timeout">
          You should type something

          <template v-slot:action="{ attrs }">
            <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-dialog v-model="link.dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
          </template>

          <v-card color="grey lighten-4" min-width="300px" flat>
            <v-toolbar dark>
              <v-card-title>
                <span class="text-h5">Edit link</span>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-btn icon v-on:click="deleted(index)">
                <v-icon>mdi-trash-can-outline</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text>
              <v-container>
                <v-text-field
                  label="URL"
                  v-model="link.newurlpath"
                  hide-details="auto"
                ></v-text-field>
                <v-text-field
                  label="Name"
                  hint="Optional"
                  v-model="link.newname"
                ></v-text-field>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="checknewname(link)"> Ok </v-btn>
              <v-btn
                text
                color="secondary"
                @click="(link.dialog = false), (link.newname = link.name)"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    links: [],
    snackbar: false,
    dialog: false,
    url: "https://",
    urlname: "",
    timeout: 3000,
    rules: [(value) => !!value || "Required."],
    num: 0,
  }),
  created() {
    this.links = JSON.parse(localStorage.getItem("links")) || this.links;
    this.num = JSON.parse(localStorage.getItem("num")) || this.num;
  },
  methods: {
    add() {
      if (this.url) {
        this.links.push({
          id: this.num++,
          name: this.urlname ? this.urlname : this.url,
          newname: this.urlname,
          urlpath: this.url,
          newurlpath: this.url,
          dialog: false,
        });

        localStorage.setItem("links", JSON.stringify(this.links));
        localStorage.setItem("num", JSON.stringify(this.num));
        this.url = "https://";
      } else {
        this.snackbar = true;
      }
    },
    checking() {
      localStorage.setItem("links", JSON.stringify(this.links));
    },
    deleted(index) {
      this.links.splice(index, 1);
      localStorage.setItem("links", JSON.stringify(this.links));
    },
    checknewname(link) {
      if (link.newurlpath) {
        (link.dialog = false),
          link.newname ? (link.name = link.newname) : link.name,
          (link.urlpath = link.newurlpath),
          this.checking();
      } else {
        this.snackbar = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shortlinks {
  display: grid;
  flex-wrap: wrap;
  position: relative;
  height: 150px;
  grid-template-columns: repeat(auto-fit, minmax(107px, 1fr));
  max-width: 370px;
  min-width: 260px;
  margin: 10px;
  padding: 10px;
  overflow: auto;
  border: 1px solid #ccc;
  flex-direction: row;
  .btn-div {
    padding: 5px;
    max-width: 100%;
    position: relative;
  }
  .link {
    display: flex;
    color: #1c2b32;
    width: calc(100% - 18px);
    gap: 1px;
    font-size: 11px;
    overflow: hidden;
    text-decoration: none;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    text-overflow: ellipsis;
    .linkname {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .v-btn::v-deep .v-btn__content {
    max-width: calc(100% - 5px);
  }
  .avatar-img {
    height: 18px;
    width: 18px;
  }
  .v-icon.v-icon {
    align-items: center;
    display: inline-flex;
    font-feature-settings: "liga";
    font-size: 19px;
  }
}
</style>
