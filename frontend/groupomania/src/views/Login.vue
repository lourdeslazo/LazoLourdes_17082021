<template>
    <main>
        <div class="d-flex justify-content-center pt-5">
        <a href="index.html"
          ><img src="images/logo.png" class="logo" alt="Logo"
        /></a>
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
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Adresse email"
                />
              </div>
              <div class="mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Mot de passe"
                />
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-danger" id="login">
                  Se connecter
                </button>
              </div>
              <div class="row justify-content-center my-3">
                <div class="col-10 border-bottom"></div>
              </div>
              <div class="d-grid">
                <button
                  type="submit"
                  class="btn btn-signup text-light px-4 mx-auto"
                  id="signup"
                >
                  Sinscrire
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

</template>