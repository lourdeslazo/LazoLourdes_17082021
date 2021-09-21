<template>
	<div id="body-card">
    <div>
      <h1>Votre compte à bien été supprimé !</h1>
      <p>Souhaitez-vous retourner à l'accueil ? <router-link :to="`/`"><span>Accueil</span></router-link></p>
    </div>
	</div>
</template>

<script>
export default {
  name: "UserDelete",
}
</script>