<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-white">
        <div class="container">
            <router-link :to="`/`">
                <div class="navbar-brand brand-light">
                   <img src="images/logo.png" alt="Logo" width="200px"/>
                </div>
            </router-link>

          <button
            class="navbar-toggler bg-danger"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">
              <li class="nav-item" @click="switchToProfil()">
                <p class="nav-link">Profile</p>
              </li>
              <li @click="logout()" class="nav-item">
                <p class="nav-link text-danger">Se deconecter</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
</template>


<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      user: 'userInfos',
    }),
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    switchToProfil: function () {
      this.$router.push('/profil')
    }
  }
    
}
</script>