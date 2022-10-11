<template>
  <div class="signup">
    <div class="image">
      <img
        src="./../assets/signup.jpg"
        alt="Productive day: today plan and notes, pen"
      />
    </div>
    <div class="form">
      <h2>Welcome again!</h2>
      <p class="desc">Log in to see your data.</p>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
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
          placeholder="Type your password"
          outlined
        ></v-text-field>
        <v-btn
          :disabled="!valid"
          color="#a47778"
          class="submit"
          @click="validate"
        >
          Log In
        </v-btn>
      </v-form>
      <div class="loginlink">
        <p>
          If you are new here create
          <router-link to="/signup" class="loglink">a new accout</router-link>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      show: false,
      password: "",
      passwordRules: [
        (value) => !!value || "Required.",
        (v) => v.length >= 8 || "Min 8 characters",
      ],
      valid: true,
      email: "",
      emails: [],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        (v) =>
          (v && this.emails.map((a) => a.email).indexOf(this.email) >= 0) ||
          "this email is not existing, try agian or sign up",
      ],
      select: null,
    };
  },

  created() {
    this.checkemail();
  },
  methods: {
    async validate() {
      this.$refs.form.validate();
      if (this.password && this.email) {
        let emailId =
          this.emails[this.emails.map((a) => a.email).indexOf(this.email)].id;
        await axios
          .get(`https://trisdev.pythonanywhere.com/api/users/${emailId}`)
          .then((response) => {
            if (response.data.password === this.password) {
              this.$store.state.userdata.id = response.data.id;
              localStorage.setItem(
                "userid",
                JSON.stringify(this.$store.state.userdata.id)
              );
              this.$store.state.userdata.id =
                JSON.parse(localStorage.getItem("userid")) ||
                this.$store.state.userdata.id;
              this.$store.state.isAuthenticated = true;
              window.location.replace("/dashboard");
            } else {
              this.passwordRules = [
                (value) => !!value || "Required.",
                (v) => v.length >= 8 || "Min 8 characters",
                (v) =>
                  response.data.password == v ||
                  `The email and password you entered don't match`,
              ];
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    checkemail() {
      axios
        .get("https://trisdev.pythonanywhere.com/api/users/")

        .then((response) => {
          this.emails = response.data.map((a) => {
            return { email: a.email, id: a.id };
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.signup {
  background: white;
  border-radius: 20px;
  max-width: 90%;
  box-shadow: 0 0 10px 1px #1e1e1ed1 !important;
  display: flex;
  overflow: hidden;
}
@media (max-width: 1264px) {
  .signup {
    max-width: 100%;
    width: 100%;
  }
}
@media (max-width: 960px) {
  .signup {
    max-width: 100%;
    width: 100%;
    margin: 0 20px;
  }
}
@media (max-width: 768px) {
  .signup {
    max-width: 100%;
    width: 100%;
    margin: 0 20px;
  }
  .image {
    display: none;
  }
  .form {
    width: 100%;
  }
}
.v-text-field {
  padding: 10px 0 0 0;
}
.submit {
  width: 150px;
  height: 45px !important;
  font-size: 18px;
  background-color: rgb(164 119 120) !important;
  color: white !important;
}
.image {
  width: 50%;
  img {
    width: 100%;
    max-width: 100%;
    object-fit: cover;
    height: 100%;
  }
}
.form {
  width: 50%;
  padding: 30px;
  h2 {
    font-size: 30px;
    font-weight: 500;
    padding: 10px 0;
    color: #21593b;
  }
  form {
    padding: 20px 0 0 0;
  }
  .desc {
    color: #888;
  }
  .loginlink {
    padding: 30px 0;
    font-size: 18px;
    color: #222;
  }
  .loglink {
    color: #d18a8e;
    text-decoration: none;
  }
}
.v-text-field--outlined::v-deep fieldset {
  border-color: #ccc !important;
}

// .v-text-field::v-deep .v-input__slot {
//   border-color: #ccc !important;
// }
@media (max-width: 768px) {
  .signup {
    max-width: 100%;
    width: 100%;
    margin: 0 20px;
  }
  .image {
    display: none;
  }
  .form {
    width: 100%;
  }
}
</style>
