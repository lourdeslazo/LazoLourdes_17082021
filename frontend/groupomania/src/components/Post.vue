<template>
  <div>
    <div class="container mb-4">
      <div class="row">
        <div class="col">
          <div class="text-secondary text-left mt-4">
            <h1>Bonjour {{ user }} </h1>
          </div>
        </div>

        <div class="row justify-content-center my-3">
          <div class="col-11 border-bottom ms-4"></div>
        </div>
        
        <div class="col">
          
          <form id="form" @submit.prevent="postImage()" enctype="multipart/form-data">
              
              <div class="row bg-white shadow-sm w-auto border rounded mt-3 mx-3 py-3 ps-2">
                <p class="text-center text-danger fs-5 fw-bold pt-1">Quoi de neuf ?</p>
                <div class="form-group mb-2">
                  <label for="title" class="visually-hidden"></label
                  >
                  <input
                    type="text"
                    class="form-control rounded-pill clr-grey ps-4"
                    id="title"
                    placeholder="Title"
                  >
                </div>

                <div class="form-group">
                  <label for="content" class=" visually-hidden">Quoi de neuf?</label
                  >
                  <textarea
                    
                    class="form-control rounded-pill clr-grey ps-4"
                    id="content"
                    placeholder="Content"
                  ></textarea>
                </div>

                <p class="text-center text-danger ft-font fw-bold pt-4">Ajouter une image</p>
              <div class="text-center pe-3 text-secondary">
                <label for="attachment" class="form-label visually-hidden">Input fichier</label
                >
                <input
                  class="form-control btn fw-bold px-4 mx-auto mt-1"
                  id="attachment"
                  type="file"
                  name="attachment"
                  ref="image"
                  v-on:change="handleFileUpload()"
                />
              </div>
              <div class="d-flex justify-content-center mb-2">
                <button
                  type="submit"
                  class="btn btn-signup text-light fw-bold px-4 mx-auto mt-3"
                  @click.prevent="postImage"
                >
                Publier
                </button>
              </div>
              </div>
              
            </form>
          </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Post",
    data() {
        return {
            userId: localStorage.getItem('userId'),
            user: {
              username: ""
            },
            title: "",
            content: "",
            imageUrl: "",
            image: "",
            token: localStorage.getItem('token'),
            
        
        }
    },
    created() {
      
      axios.get('http://localhost:3000/api/users/userId',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
             .then(response => (this.user = response.data.username))
            .catch(err => {
                console.log(err + "Utilisateur non trouvé");
            });
    },
    methods: {
        handleFileUpload() {
            this.image = this.$refs.image.files[0];
            this.imageUrl = URL.createObjectURL(this.image)
        },
        postImage() {
            const formData = new FormData();
            formData.append("userId", parseInt(localStorage.getItem('userId')))
            formData.append("title", document.getElementById('title').value)
            formData.append("content", document.getElementById('content').value)
            formData.append("image", this.image)
                       
            axios.post('http://localhost:3000/api/messages/new',
                    formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
                .then(() => this.$router.go())
        },
    }
}
</script>


<style>
body {
  background-color: #f2f2f2;
}

.clr-grey {
  background-color: #f2f2f2;
}

.btn-signup {
  background-color: #39ac73;
}
</style>