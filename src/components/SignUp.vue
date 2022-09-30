<template>
  <div class="signup">
    <div class="image">
      <img
        src="./../assets/signup.jpg"
        alt="Productive day: today plan and notes, pen"
      />
    </div>
    <div class="form">
      <h2>Create An Account</h2>
      <p class="desc">Sign up to save your data.</p>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
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
          @input="checkemail()"
          required
          placeholder="Type your Email"
          outlined
        ></v-text-field>
        <v-text-field
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
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
          Sign Up
        </v-btn>
      </v-form>
      <div class="loginlink">
        <p>
          If you already have an accout
          <router-link to="/login" class="loglink">Log in</router-link> here.
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
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
        (v) => (v && v.length >= 4) || "Name must be more than 4 characters",
      ],
      email: "",
      emails: [],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        (v) =>
          (v && this.emails.indexOf(this.email) < 0) ||
          "this email is already existing",
      ],
      select: null,
      joindate: new Date(),
      theId: "",
    };
  },
  created() {
    this.checkemail();
    console.log(this.joindate);
    this.$store.state.userdata.id =
      JSON.parse(localStorage.getItem("userid")) ||
      this.$store.state.userdata.id;
  },
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.name && this.password && this.email) {
        const formData = {
          username: this.name,
          email: this.email,
          password: this.password,
          joindate: new Date().toISOString().slice(0, 10),
          birthday: new Date().toISOString().slice(0, 10),
          city: "",
          country: "",
        };
        axios
          .post("http://127.0.0.1:8000/api/users/", formData)

          .then((response) => {
            this.theId = response.data.id;
            this.$store.state.userdata.id = response.data.id;
            localStorage.setItem(
              "userid",
              JSON.stringify(this.$store.state.userdata.id)
            );
            this.$store.state.userdata.id =
              JSON.parse(localStorage.getItem("userid")) ||
              this.$store.state.userdata.id;
            this.$store.state.isAuthenticated = true;
            window.location.replace("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    checkemail() {
      axios
        .get("http://127.0.0.1:8000/api/users/")

        .then((response) => {
          this.emails = response.data.map((a) => a.email);
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
