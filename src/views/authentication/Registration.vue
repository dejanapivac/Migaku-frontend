<template>
  <v-container fluid fill-height justify-center>
    <v-row justify="space-around">
      <v-col xs="12" sm="6" md="4">
        <v-card class="elevation-0">
          <v-card-text class="py-2">
            <v-row justify="center">
              <v-card-title class="justify-center">
                <h2 class="justify-center">Sign up</h2>
              </v-card-title>
            </v-row>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                label="Username"
                v-model="userName"
                type="text"
                :rules="usernameRules"
                required
              ></v-text-field>
              <v-text-field
                label="E-mail"
                type="text"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                label="Full name*"
                type="text"
                :rules="nameRules"
              ></v-text-field>

              <v-text-field
                id="password"
                v-model="password"
                label="Password"
                :type="show1 ? 'text' : 'password'"
                :rules="passwordRules"
                :counter="6"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                required
              ></v-text-field>
              <v-text-field
                id="repeatPassword"
                v-model="repeatPassword"
                label="Repeat password"
                :type="show2 ? 'text' : 'password'"
                :rules="repeatPasswordRules"
                :counter="6"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show2 = !show2"
                required
              ></v-text-field>
              <v-autocomplete
                class="mt-10 mr-10"
                height
                id="search_term"
                ref="origin"
              >
              </v-autocomplete>
            </v-form>
            <v-card-actions xs3 md4 class="justify-center">
              <div class="text-center pb-4">
                <v-btn
                  rounded
                  class="px-15 primary elevation-0 buttonText--text"
                  @click="signup()"
                  >Signup</v-btn
                >
              </div>
            </v-card-actions>
            <v-row align="end" justify="center">
              <span class="pt-5">Already have an account?</span>
              <a href="/login" class="pl-2"> SIGN IN </a>
            </v-row>
            <!-- <v-row>
              <v-col xs="12" md="12" justify-center class="text-center">
                <p class="pt-5 text-center">
                  By continuing, you agree to MealMaestro
                  <strong>Terms of Use</strong> and confirm that you have read
                  its <strong>Privacy Policy</strong>.
                </p>
              </v-col>
            </v-row> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      valid: true,
      userName: "",
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) =>
          (v && v.length <= 15) || "Username must be less than 15 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      name: "",
      nameRules: [
        (v) => {
          if (v) return v.length <= 50 || "maximum 50 characters";
          else return true;
        },
      ],

      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be at least 8 characters",
      ],
      repeatPassword: "",
      repeatPasswordRules: [
        (v) => !!v || "Repeat password is required",
        (v) => v.length >= 6,
        (v) => this.password === this.repeatPassword || "Passwords must match",
      ],
      show1: false,
      show2: false,
      zip: "",
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async signup() {
      try {
        let validation = await this.validate();
        if (this.valid) {
          let user = {
            username: this.userName,
            email: this.email,
            password: this.password,
            password_confirm: this.repeatPassword,
          };

          let result = await AuthService.signup(user);
          this.$router.push({ name: "Home" });
        } else console.log("NE VALJAAA");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
