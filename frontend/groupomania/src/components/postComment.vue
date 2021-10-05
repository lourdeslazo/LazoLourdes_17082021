<template>
  <div>
    <div class="col-12">
      <div class="container mt-1 px-3">
        <div class="row mt-3">
          <div class="col-12 mb-2">
            <form id="formComment" @submit.prevent="postComm()">
              <div class="row justify-content-center">
                <label for="comment" class="form-label visually-hidden">Commentaire</label>
                <textarea
                    class="form-control"
                    name="comment"
                    id="comment"
                    placeholder="Écrire un commentaire..."
                ></textarea>
              </div>
              <div class="d-grid gap-2 col-5 mx-auto">
                <button
                  type="submit"
                  class="btn btn-signup text-white mt-3 mb-4 fw-bold"
                  @click.prevent="postComm()"
                
                  >Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
    name: "postComment",
    data() {
        return {
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
            messageId: localStorage.getItem('messageId'),
            username: "",
            comment: "",
            message: {},
            comments: []
        }
    },

    created() {
      
      axios.get('http://localhost:3000/api/messages/:id',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    },
                    userId: localStorage.getItem('userId'),
                })
             .then(response => {
               this.message = response.data.message
               if (this.message) {
                 this.comments = response.data.comments
               }

             })
            .catch(err => {
                console.log(err + "Utilisateur non trouvé");
            });
    },

    methods: {
        postComm(messageId) {
          
            axios.post(`http://localhost:3000/api/comments/${messageId}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + this.token
              }
              
            
            })
            .then(() => this.$router.go())
        },
    }
}
</script>

<style>

.btn-signup {
  background-color: #39ac73;
}

</style>