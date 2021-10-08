<template>
  <div >
    
    <div class="col-12">
      <div class="container mt-1 px-3">
        <div class="row mt-3">
          <div class="col-12 mb-2">
            <form id="formComment" @submit.prevent="postComm(messageId)">
              <div class="row justify-content-center">
                <label for="comment" class="form-label visually-hidden">Commentaire</label>
                <textarea
                    class="form-control"
                    name="comment"
                    id="comment"     
                    placeholder="Écrire un commentaire... "
                    v-model="comment"
                ></textarea>
              </div>
              <div class="d-grid gap-2 col-5 mx-auto">
                <button
                  type="submit"
                  class="btn btn-signup text-white mt-3 mb-4 fw-bold"
                  @click.prevent="postComm(messageId)"
                
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
       
          comment: '',
      
          post: {},
          title :""          
        }
    },
    props:['messageId']
    ,

    created() {
      
    },

    methods: {
      postComm(messageId) {
        console.log(messageId)

        let data = {
          comment : this.comment
        }

        // Récupére le donnée comm
        axios.post(`http://localhost:3000/api/comments/${messageId}` , data ,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + this.token
          }
        })
        .then(() => {
          this.$router.go();
        });
        }

    }
}
</script>
<style>

.btn-signup {
  background-color: #39ac73;
}

</style>