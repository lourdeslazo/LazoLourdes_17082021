<template>
  <div>
    <div class="d-flex justify-content-center">
      <img src="../assets/logo.png" class="logo" alt="Logo"/>
    </div>
    <div>
      <p class="text-center fw-bold text-danger" v-if="mode == 'login'">CONNECTE-TOI !</p>
      <p class="text-center fw-bold text-danger" v-else>INSCRIS-TOI !</p>
    </div>

    <!--Main-->
    <div class="container">
      <div class="row white-block mb-5">
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
                type="email"
                name="email"
                class="form-control"
                placeholder="Adresse e-mail"
                required
              />
            </div>
            <div class="mb-3" v-if="mode == 'create'">
              <input v-model="username"  
                type="text"
                name="username"
                class="form-control"
                placeholder="Nom dutilisateur"
                required
              />
            </div>
            <div class="form-group" v-if="mode == 'create'">
              <textarea
                v-model="bio"
                name="bio"
                class="form-control"
                rows="3"
                placeholder="Decris toi en quelques mots">
              </textarea>
            </div>
            <div class="mb-3">
              <input v-model="password"
                type="password"
                name="password"
                class="form-control"
                placeholder="Mot de passe"
                required
              />
            </div>
            <div class="mb-3" v-if="mode == 'login' && status == 'error_login'">
              Adresse mail et/ou mot de passe invalide
            </div>
            <div class="mb-3" v-if="mode == 'create' && status == 'error_create'">
              Adresse mail deja utilisee
            </div>

            <div class="d-grid">
              <button @click="login()" name="login" type="button" class="btn btn-danger" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
                Se connecter
              </button>
            </div>

            <div class="d-grid">
              <button @click="createAccount()" name="signup" type="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'create'"
                class="btn btn-signup text-light fw-bold px-4 mt-3 mx-auto"
                id="signup">
                Sinscrire
              </button>
            </div>

            <div class="row justify-content-center my-3">
              <div class="col-10 border-bottom"></div>
            </div>


            <div v-if="mode == 'login'" class="d-grid">
              <button @click="switchToCreateAccount()" type="button" class="btn btn-signup text-light px-4 mx-auto">
                Sinscrire
              </button>
            </div>
            <div class="d-grid" v-else>
              <p class="text-center mb-0">Deja inscrit(e) ?</p>
              <button @click="switchToLogin()" type="button" class="btn btn-danger text-light px-4 mx-auto">
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

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
      bio: '',
      password: '',
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == 'create') {
        if (this.email != "" && this.username != "" && this.password != "") {
          return true;
        }else {
          return false;
        }
      }else {
        if (this.email != "" && this.password != "") {
          return true;
        }else {
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
        bio: this.bio,
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