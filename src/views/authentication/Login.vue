<template>
  <v-container fluid fill-height justify-center>
    <v-row justify="space-around">
      <v-col xs="12" sm="6" md="4">
        <v-card class="elevation-0">
          <v-card-text>
            <v-row justify="center">
              <v-col xs="8" md="8" flat>
                <v-card class="mx-auto" flat>
                  <!-- <v-img></v-img> -->
                </v-card>
              </v-col>
            </v-row>
            <v-card-title class="justify-center">
              <h2 class="py-5 justify-center">Sign in</h2>
            </v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                class="py-3"
                v-model="email"
                label="Username or email"
                type="text"
                :rules="[(v) => !!v || 'Email is required']"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="[(v) => !!v || 'Password is required']"
              ></v-text-field>
            </v-form>
            <v-row
              :class="errorMessage ? 'justify-center' : 'justify-center d-none'"
              style="color: #ff5252"
            >
              {{ errorMessage }}
            </v-row>
            <v-card-actions xs3 md4 class="justify-center">
              <div class="text-center pb-4">
                <v-btn
                  rounded
                  class="px-15 py-3 mt-5 primary elevation-0 buttonText--text"
                  @click="login()"
                  >Login</v-btn
                >
              </div>
            </v-card-actions>
            <v-row align="end" justify="center">
              <span class="pt-5">New to Migaku?</span>
              <a class="transparent pl-2" href="/registration"
                >Create account</a
              >
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      valid: true,
      email: "",
      password: "",
      errorMessage: null,
    };
  },
  // props: {
  //   source: String
  // },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async login() {
      try {
        let validation = await this.validate();

        if (this.valid) {
          let credentials = {
            email: this.email,
            password: this.password,
          };
          let response = await AuthService.login(credentials);
          const token = response.token;
          const user = response.data.user;

          this.$store.dispatch("login", { token, user });
          this.$router.push({ name: Home });
        }
      } catch (error) {
        this.errorMessage = error.response.data.message;
      }
    },
  },
};
</script>
