<template>
  <div class="profilemain">
    <div class="viewprofile">
      <div class="userinfo">
        <h3>{{ username }}</h3>
        <div class="picture">
          <v-avatar
            color="#ebe8e4"
            :style="{ fontSize: '75px', color: '#b08f88' }"
            size="128"
          >
            <img
              v-if="avatar"
              :src="avatar"
              :style="{ objectFit: 'cover' }"
              :alt="username"
            />
            {{ avatar ? "" : username.charAt(0).toUpperCase() }}
          </v-avatar>
        </div>

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="#47777a"
              :style="{
                marginBottom: '20px',
              }"
              dark
              v-bind="attrs"
              v-on="on"
            >
              Change avatar
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="chooseavatar" link>
              <v-file-input
                :rules="imgrules"
                accept="image/png, image/jpeg, image/bmp"
                :style="{ display: 'none' }"
                id="avatar"
                @change="appendFile"
                v-model="avatar"
              ></v-file-input>
              <v-list-item-title>Change picture</v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleteavatar" link>
              <v-list-item-title>delete picture</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <p class="joindate">Member since: {{ joindate }}</p>
      </div>
    </div>
    <div class="editprofile">
      <div class="edit">
        <h3>Edit Profile</h3>
        <div class="editform">
          <form action="">
            <div class="inputs">
              <v-text-field
                v-model="username"
                :counter="30"
                :rules="nameRules"
                label="Name"
                required
                placeholder="Type your name"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                disabled
                placeholder="Type your Email"
                outlined
              ></v-text-field>
              <v-text-field
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                hint="At least 8 characters"
                value=""
                v-model="password"
                class="input-group--focused"
                @click:append="show = !show"
                placeholder="Type your new password"
                outlined
              ></v-text-field>
              <v-text-field
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="password2Rules"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                label="Confirm password"
                value=""
                v-model="password2"
                class="input-group--focused"
                @click:append="show = !show"
                placeholder="Confirm your new password"
                outlined
              ></v-text-field>
              <v-autocomplete
                ref="country"
                v-model="country"
                outlined
                :items="countries"
                label="Country"
                placeholder="Select..."
              ></v-autocomplete>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="birthday"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="birthday"
                    label="Birthday"
                    prepend-icon="mdi-calendar"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="birthday" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(birthday)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
            <div class="buttons">
              <v-btn large class="mr-4" @click="clear"> Cancel </v-btn>
              <v-btn large color="rgb(152 99 88)" dark @click="submit">
                Upload
              </v-btn>
            </div>
          </form>
        </div>
      </div>
      <div class="delete">
        <h3>Log Out</h3>
        <div class="deletewarn">
          If you log out, you can access your account, profile, Todos and data
          at any time after logging in again.
        </div>
        <div class="buttons">
          <v-btn depressed large dark color="#6a4e48" @click="logout()">
            Log out
          </v-btn>
        </div>
      </div>
      <div class="delete">
        <h3>Delete Account</h3>
        <div class="deletewarn">
          When you delete your account, your profile, Todos, Data will be
          removed. And you will not be able to sign in until you create a new
          account. If you still want to delete the account, click on delete
          account
        </div>
        <div class="buttons">
          <v-btn
            depressed
            large
            dark
            color="#890a01d4"
            @click="deleteaccount()"
          >
            Delete the account
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "profile",
  data() {
    return {
      username: "",
      show: false,
      password: "",
      password2: "",
      valid: true,

      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
        (v) => (v && v.length >= 4) || "Name must be more than 4 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "At least 8 characters",
      ],
      password2Rules: [
        (v) => v === this.password || "The password you entered don't match",
      ],
      imgrules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
      select: null,

      countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua &amp; Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia &amp; Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Cape Verde",
        "Cayman Islands",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Cote D Ivoire",
        "Croatia",
        "Cruise Ship",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Polynesia",
        "French West Indies",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kuwait",
        "Kyrgyz Republic",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Pierre &amp; Miquelon",
        "Samoa",
        "San Marino",
        "Satellite",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St Kitts &amp; Nevis",
        "St Lucia",
        "St Vincent",
        "St. Lucia",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        `Timor L'Este`,
        "Togo",
        "Tonga",
        "Trinidad &amp; Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks &amp; Caicos",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Venezuela",
        "Vietnam",
        "Virgin Islands (US)",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ],
      country: null,
      joindate: "",
      avatar: null,
      birthday: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
    };
  },
  created() {
    axios
      .get(
        `https://trisdev.pythonanywhere.com/api/users/${this.$store.state.userdata.id}`
      )
      .then((response) => {
        this.username = response.data.username;
        this.password = response.data.password;
        this.avatar = response.data.userimage;
        this.email = response.data.email;
        this.birthday = response.data.birthday;
        this.joindate =
          new Date(`${response.data.joindate}`).toLocaleDateString("en-US", {
            weekday: "short",
          }) +
          " " +
          new Date(`${response.data.joindate}`).toLocaleDateString("en-US", {
            day: "numeric",
          }) +
          " " +
          new Date(`${response.data.joindate}`).toLocaleDateString("en-US", {
            month: "short",
          }) +
          " " +
          new Date(`${response.data.joindate}`).toLocaleDateString("en-US", {
            year: "numeric",
          });
        this.country = response.data.country;
      });
  },
  methods: {
    async submit() {
      if (
        this.username &&
        this.password &&
        this.password == this.password2 &&
        this.email
      ) {
        const formData = {
          username: this.username,
          password: this.password,
          birthday: this.birthday,
          email: this.email,
          country: this.country,
        };
        await axios
          .put(
            `https://trisdev.pythonanywhere.com/api/users/${this.$store.state.userdata.id}/`,
            formData
          )
          .then((response) => {
            this.username = response.data.username;
            this.password = response.data.password;
            this.email = response.data.email;
            this.birthday = response.data.birthday;
            this.country = response.data.country;
          });
      }
    },
    clear() {
      axios
        .get(
          `https://trisdev.pythonanywhere.com/api/users/${this.$store.state.userdata.id}`
        )
        .then((response) => {
          this.username = response.data.username;
          this.password = response.data.password;
          this.email = response.data.email;
          this.birthday = response.data.birthday;
          this.country = response.data.country;
        });
    },
    chooseavatar() {
      document.getElementById("avatar").click();
    },
    async appendFile() {
      let formData = new FormData();
      formData.append("userimage", this.avatar);
      formData.append("username", this.username);
      formData.append("password", this.password);
      formData.append("birthday", this.birthday);
      formData.append("email", this.email);
      formData.append("country", this.country);

      await axios
        .put(
          `https://trisdev.pythonanywhere.com/api/users/${this.$store.state.userdata.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-CSRFToken": "{{ csrf_token }}",
            },
          }
        )
        .then((response) => {
          this.username = response.data.username;
          this.password = response.data.password;
          this.avatar = response.data.userimage;
          this.email = response.data.email;
          this.birthday = response.data.birthday;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteavatar() {
      let formData = new FormData();
      formData.append("userimage", "");
      formData.append("username", this.username);
      formData.append("password", this.password);
      formData.append("birthday", this.birthday);
      formData.append("email", this.email);
      formData.append("country", this.country);

      await axios
        .put(
          `https://trisdev.pythonanywhere.com/api/users/${this.$store.state.userdata.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-CSRFToken": "{{ csrf_token }}",
            },
          }
        )
        .then((response) => {
          this.username = response.data.username;
          this.password = response.data.password;
          this.avatar = response.data.userimage;
          this.email = response.data.email;
          this.birthday = response.data.birthday;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteaccount() {
      axios
        .delete(
          `https://trisdev.pythonanywhere.com/api/users/${this.$store.state.userdata.id}/`
        )

        .then(() => {
          this.$store.state.userdata.id = "";
          localStorage.removeItem("userid");
          localStorage.removeItem("events");
          localStorage.removeItem("links");

          this.$store.state.isAuthenticated = false;
          window.location.replace("/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      this.$store.state.userdata.id = "";
      localStorage.removeItem("userid");
      localStorage.removeItem("events");
      localStorage.removeItem("links");

      this.$store.state.isAuthenticated = false;
      window.location.replace("/dashboard");
    },
  },
};
</script>
<style lang="scss" scoped>
.profilemain {
  height: 100%;
  padding: 40px 0 0 0;
  display: flex;
  flex-direction: column;
  .viewprofile {
    background-color: white;
    padding: 25px;
    border-radius: 15px;
    overflow: hidden;
    margin: 10px;
    .userinfo {
      display: flex;
      flex-direction: column;
      align-items: center;
      h3 {
        font-size: 30px;
        color: #333;
        padding-bottom: 20px;
      }
      .picture {
        margin: 0 0 20px;
        border: 5px solid #b08f88;
        border-radius: 50%;
      }
      .joindate {
        font-size: 18px;
        color: #333;
        font-weight: 300;
      }
    }
  }
}

.editprofile {
  background-color: white;
  padding: 25px;
  border-radius: 15px;
  overflow: hidden;
  margin: 10px;
  h3 {
    font-size: 35px;
    color: #23606a;
  }
  form {
    padding: 35px 0;
  }
  .inputs {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
  }
  .delete {
    padding: 20px 0;
    .deletewarn {
      padding: 20px 0;
      font-size: 18px;
      color: #555;
    }
  }
}
.v-input {
  min-width: 40% !important;
}
.v-text-field--outlined::v-deep fieldset {
  border-color: #d6d6d6 !important;
}
@media (min-width: 1264px) {
  .profilemain {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    .viewprofile {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 2;
    }
    .editprofile {
      grid-column-start: 2;
      grid-column-end: 4;
      grid-row-start: 1;
      grid-row-end: 3;
    }
  }
}
@media (max-width: 1263px) and (min-width: 600px) {
  .profilemain {
    .viewprofile {
      .userinfo {
        flex-wrap: wrap;
        height: 180px;
        justify-content: center;
        align-items: flex-start;
        align-content: flex-start;
        h3 {
          order: 2;
        }
        .picture {
          margin: 20px 40px 20px 20px;
          order: 1;
        }
        .joindate {
          order: 4;
        }
        .v-btn {
          order: 3;
        }
      }
    }
  }
}
</style>
