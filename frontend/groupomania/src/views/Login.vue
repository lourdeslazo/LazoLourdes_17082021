<template>
    <main>
        <div class="d-flex justify-content-center pt-5">
        <img src="images/logo.png" class="logo" alt="Logo"
        />
      </div>
      <div class="container">
        <div class="row white-block">
          <div
            class="
              col col-lg-6
              bg-light
              shadow-sm
              border
              rounded
              mx-5
              mt-5
              px-4
              py-3
            "
          >
            <form>
              <div class="mb-3">
                <input v-model="email"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Adresse email"
                />
              </div>
              <div class="mb-3">
                <input v-model="password"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Mot de passe"
                />
              </div>
              <div class="mb-3" v-if="mode == 'login' && status == 'error_login'">
                Adresse mail et/ou mot de passe invalide
              </div>

              <div class="d-grid">
                <button @click="login()" name="login" class="btn btn-danger" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
                  <span v-if="status == 'loading'">Connexion en cours</span>
                  <span v-else>Se connecter</span>
                </button>
              </div>
              <div class="row justify-content-center my-3">
                <div class="col-10 border-bottom"></div>
              </div>
              <div v-if="mode == 'login'" class="d-grid">
              <button @click="switchToCreateAccount()" class="btn btn-signup text-light px-4 mx-auto">
                  Sinscrire
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

</template>


<script>
import {mapState} from 'vuex'
export default {
  name: 'Login',
  data: function () {
    return {
      mode: 'login',
      email: '',
      username: '',
      password: '',
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == 'create') {
        if (this.email != "" && this.username != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(['status'])
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
    login: function () {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      }).then(function () {
        self.$router.push('/home');
      }, function (error) {
        console.log(error);
      })
    },
    createAccount: function () {
      const self = this;
      this.$store.dispatch('createAccount', {
        email: this.email,
        username: this.username,
        password: this.password,
      }).then(function () {
        self.login();
      }, function (error) {
        console.log(error);
      })
    },
  }
}
</script>


<style scoped>
template {
  background-color: #f2f2f2;
}

.logo {
  width: 100%;
}

.white-block {
  display: flex;
  justify-content: center;
}

.btn-signup {
  background-color: #39ac73;
}
</style>