<template>
  <div>
    <div class="d-flex justify-content-center">
      <img src="../assets/logo.png" class="logo" alt="Logo"/>
    </div>
    <div>
      <p class="text-center fw-bold text-danger">CONNECTE-TOI !</p>
    </div>

    <!--Main-->
    <div class="container">
      <div class="row white-block mb-5">
        <div class="col col-lg-6 bg-light shadow-sm border rounded mx-5 mt-5 px-4 py-3">
          <form @submit.prevent="login()" method="post" novalidate="true">
            <div class="mb-3">
              <input
                type="email"
                id="email"
                name="email"
                class="form-control"
                placeholder="Adresse e-mail"
                required
              />
            </div>
            <div class="mb-3 mt-3">
              <input
                type="password"
                id="password"
                name="password"
                class="form-control"
                placeholder="Mot de passe"
              />
            </div>

            <div class="d-grid">
              <button @click.prevent="login()" name="login" type="submit" class="btn btn-danger">
                Se connecter
              </button>
            </div>

            <div class="row justify-content-center my-3">
              <div class="col-10 border-bottom"></div>
            </div>


            <div class="d-grid">
                <p>Pas encore inscrit(e)?</p>
              <button @click.prevent="signupBtn" type="button" class="btn btn-signup text-light px-4 mx-auto">
                Sinscrire
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
    name: 'login',
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
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
        signupBtn(){
        this.$router.push('Signup');
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