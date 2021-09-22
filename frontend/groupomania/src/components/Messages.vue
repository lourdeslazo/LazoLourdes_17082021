<template>
    <main>
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="text-secondary mt-4">
              <p>bjr</p>
              <h1>Bonjour {{ user.username }} </h1>
            </div>
            <div><p class="fw-bold text-danger">Supprimer mon compte</p></div>
          </div>
          <div class="row justify-content-center my-3">
            <div class="col-11 border-bottom ms-4"></div>
          </div>
          <div class="col">
            <form @submit.prevent="submit">
              <div
                class="
                  row
                  bg-light
                  shadow-sm
                  w-auto
                  border
                  rounded
                  mt-3
                  mx-3
                  py-3
                  ps-2
                "
              >
                <div class="col-3 user-img">
                  <img src="images/lourdes.jpg" alt="user" />
                </div>
                <div class="col-9 form-group">
                  <textarea v-model="content" id="content"
                    class="form-control rounded-pill clr-grey ps-4"
                    rows="3"
                    placeholder="Quoi de neuf?"
                  ></textarea>
                </div>
                <div class="text-center pe-3 text-secondary">
                  <label for="attachment"></label>
                  <button name="send-image" @click="$refs.image.click()"
                    class="btn btn-danger text-light fw-bold px-4 mx-auto mt-3">
                    Attachement
                  </button>
                  <input style="display: none" type="file" ref="image" @change="onFileSelected()">
                </div>
                <div v-if="submitStatus == 'error_create'">
                    Il manque l'un des paramètres, veuillez tout remplir !
                </div>
                <div class="d-flex justify-content-center">
                  <button :class="{'button--disabled' : !validatedFields}" name="send-message"
                    class="btn btn-primary text-light fw-bold px-4 mx-auto mt-3"
                  >
                  <span v-if="submitStatus == 'loading'">Envoie</span>
                  <span v-else>Publier</span>
                  </button>
                </div>
              </div>
            </form>

            <div v-for="(message, id) in message.slice().reverse()" :key="id">
              <div
                class="
                  row
                  bg-light
                  shadow-sm
                  w-auto
                  border
                  rounded
                  my-3
                  mx-3
                  py-3
                "
              >
                    
                    <p>{{ message.username }}</p>
                    <p>{{dateTime(message.createdAt)}}</p>
                    <div class="d-flex justify-content-center">
                    <button v-if="user.id == message.UserId || user.isAdmin == 1" @click="deleteMessage(message)" name="delete"
                      class="
                        btn btn-danger
                        text-light
                        fw-bold
                        px-4
                        mx-auto
                        mt-3
                      "
                    >
                      Supprimer
                    </button>
                  </div>
              </div>

              <div
                class="
                  row
                  bg-light
                  shadow-sm
                  w-auto
                  border
                  rounded
                  my-3
                  mx-3
                  py-3
                "
              >
                <div class="text-secondary fw-bold"><p>Lourdes Lazo</p></div>
                <p>{{ message.content }}</p>
                <div>
                  <figure><img id="message_img" v-if="message.attachment !== '' && message.attachment !== null && (message.attachment.split('.')[2] === 'png' || 'jpg')" :src="message.attachment" alt="image" /></figure>
                </div>
                <div class="row">
                    <router-link :to="`/message/${message.id}`"><div class="col d-flex justify-content-center">
                    Commentaires
                  </div></router-link>
                  <div>{{ comments.filter((comment) => {
                      return comment.MessageId == message.id;}).length}}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>

</template>


<script>
import { mapState } from 'vuex';
import axios from "axios";
import moment from 'moment'

    export default {
        name: 'Messages',
        data: function(){
            return{
                content: "",
                attachment: null,
                submitStatus: null,
            }
        },
        computed: {
            ...mapState({
                user: 'userInfos',
                users() {
                    return this.$store.state.users
                },
                messages() {
                    return this.$store.state.messages
                },
                comments() {
                    return this.$store.state.comments
                }
            }),
            validatedFields: function () {
                
                if (this.content != "" ) {
                    return true;
                } else {
                    return false;
                }
            },
        },
        methods: {
            dateTime (value) {
                return moment(value).format('DD-MM-YYYY');
            },
            onFileSelected: function() {
                this.attachment = this.$refs.image.files[0]
            },
            submit(){
                const fd = new FormData();
                if (this.attachment != null || "") {
                    fd.append('image', this.attachment, this.attachment.filename);
                    fd.append('content', this.content)
                    fd.append("user", this.user);
                } else {
                    fd.append('content', this.content)
                    fd.append("user", this.user)
                }
                this.submitStatus = "loading"
                axios.post("http://localhost:3000/api/messages/new", fd)
                .then(response => {
                    this.content = response.data
                    this.attachment = response.data 
                    this.$router.go('/');
                })
                .catch((error) => (
                    (this.submitStatus = "error_create"), console.log(error)
                ));
                
            },
            deleteMessage: function (message) {
                let response = confirm('Êtes-vous sûr de vouloir supprimer ce post ? ')
                if (response) {
                   this.$store.dispatch('deleteMessage', message)
                   this.$router.go('/');
                   return;
                }
            },
        }
    }
</script>


<style>
.btn-signup {
  background-color: #39ac73;
}

.user-img {
  width: 72px;
  height: 48px;
}

.user-img img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #fff;
}

.clr-grey {
  background-color: #f2f2f2;
}

figure {
  height: 200px;
}

figure img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.img-post {
  width: auto;
  height: 100px;
}
</style>