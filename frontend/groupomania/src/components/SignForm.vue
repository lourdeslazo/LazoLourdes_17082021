<template>
  <div>
    <div class="d-flex justify-content-center">
      <img src="../assets/logo.png" class="logo" alt="Logo"/>
    </div>
    <div>
      <p class="text-center fw-bold text-danger">INSCRIS TOI !</p>
    </div>

    <!--Main-->
    <div class="container">
      <div class="row white-block mb-5">
        <div class="col col-lg-6 bg-light shadow-sm border rounded mx-5 mt-5 px-4 py-3">
          <form @submit.prevent="signup()" method="post">
            <div class="mb-3">
              <input
              id="username"  
                type="text"
                name="username"
                class="form-control"
                placeholder="Nom dutilisateur"
              />
            </div>
            <div class="mb-3">
              <input
              id="email"
                type="email"
                name="email"
                class="form-control"
                placeholder="Adresse e-mail"
              />
            </div>
            <div class="form-group">
              <textarea
              id="bio"
                name="bio"
                class="form-control"
                rows="3"
                placeholder="Decris toi en quelques mots">
              </textarea>
            </div>
            <div class="mb-3 mt-3">
              <input
              id="password"
                type="password"
                name="password"
                class="form-control"
                placeholder="Mot de passe"
              />
            </div>

            <div class="d-grid">
              <button @click.prevent="signup" name="signup" type="submit" class="btn btn-danger">
                Sinscrire
              </button>
            </div>

            <div class="row justify-content-center my-3">
              <div class="col-10 border-bottom"></div>
            </div>


            <div class="d-grid">
                <p>Deja inscrit(e)?</p>
              <button @click="switchToLogin()" type="button" class="btn btn-signup text-light px-4 mx-auto">
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
import axios from "axios";

export default {
    name: 'signup',
    data() {
        return {
            username: "",
            email: "",
            bio: "",
            password: "",
        }
    },
    methods: {
        switchToLogin: function () {
            this.$router.push('/');
        },
        login() {
            this.errorAlert = false;
            axios.post('http://localhost:3000/api/auth/login', {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            })
                .then((res) => {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("userId", res.data.userId)
                    localStorage.setItem("isAdmin", res.data.isAdmin)
                    this.$router.push('/home');
                })
                .catch(() => {
                    this.errorAlert = true
                })
        },
        signup() {
            const self = this;
            this.errorAlert = false;
            axios.post('http://localhost:3000/api/auth/signup', {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                bio: document.getElementById('bio').value,
                password: document.getElementById('password').value,
            })
                .then(() => {
                   
                    self.login();
                })
                .catch(() => {
                    this.errorAlert = true
                })
        }
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