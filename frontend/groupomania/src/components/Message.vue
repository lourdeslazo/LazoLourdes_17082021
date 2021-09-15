<template>
    <main>
        <div class="container">
            <Nav />
            <div class="row">
                <div class="col">
            
                    <div class="
                     row
                     bg-light
                     shadow-sm
                     w-auto
                     border
                     rounded
                     mt-3
                     mx-3
                     py-3
                     ps-2"
                    >
                        <div class="col-3 user-img">
                            <img src="images/lourdes.jpg" alt="user" />
                        </div>
                        <div class="col-9">
                            <p> {{ message.username }} </p>
                            <p>{{formattedDate}} </p>
                        </div>
                        <div class="d-flex justify-content-center">
                        <button v-if="user.id == message.userId || user.isAdmin == 1" @click="deleteMessage(message)" name="delete"
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
                       py-3">
                
                        <p>{{ message.content }}</p>
                        <div>
                            <figure><img id="message_img" v-if="post.attachment !== null && post.attachment !== '' " :src="post.attachment" alt="image-post" /></figure>
                        </div>
                
                  
                    </div>
            

                <div>

                <div v-for="(comment, id) in comments" :key="id" class="col">
                    <p>Lourdes Lazo</p>
                    <p>{{ comment.username }}</p>
                    <p>{{ comment.comment }}</p>

                    <button v-if="user.id == comment.userId || user.Admin == 1" @click="deleteComment(comment)" name="delete">
                        delete
                    </button>
   
                </div> 
                <form @submit.prevent="submitCom()">
                    <input type="text" v-model="comment" placeholder="Commentaire">
                    <button :class="{'button--disabled' : !validatedFields}" name="send-comment">
                        <span v-if="submitStatus == 'loading'">Envoie</span>
                        <span v-else>Publier</span>

                    </button>
                    <div v-if="submitStatus == 'error_create'">
                        il doit faire au minimum 3 lettres
                    </div>
                    
                </form>   

              
            </div>
        </div>
    </main>

</template>

<script>
import Nav from '@/components/Nav.vue';
import { mapState } from 'vuex';
import axios from 'axios'
import moment from 'moment'

export default ({
    name: 'Message',
    components: {
    Nav,
  },
    data() {
        return{
            id: this.$route.params.id,
            message: [],
            comments: [], 
            comment: "",
            submitStatus: null,
        }
    },
    created() {
        axios.get(`http://localhost:3000/api/posts/${this.id}`)
        .then(response => {
            this.post = response.data.post
           if (this.post){
               this.comments = response.data.comments
           }            
        })
        this.$store.dispatch('getUsers');
        this.$store.dispatch('getUserInfos');
    },
    computed: {
        ...mapState({
            user: 'userInfos',
            users() {
                return this.$store.state.users
            },
        }),
        validatedFields: function () {  
            if (this.comment != "" ) {
                return true;
            } else {
                return false;
            }
                
        },
        formattedDate (){
            return moment(this.post.createdAt).format('DD-MM-YYYY');
        }
    },
    methods: {
        deletePost: function (post) {
            let response = confirm('Êtes-vous sûr de vouloir supprimer ce post ? ')
            if (response) {
                this.$store.dispatch('deleteMessage', post)
                this.$router.push('/home');
                return;
            }
        },
        submitCom: function (){
            this.submitStatus = "loading"
            axios.post(`http://localhost:3000/api/comments/${this.id}`, {
                comment: this.comment
            }).then(response => {
                this.comment = response.data.comment
                this.$router.go('/');
            }).catch((error) => (
                (this.submitStatus = "error_create"), console.log(error)
            ));
        },
        deleteComment: function (comment) {
            let response = confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ? ')
            if (response) {
                this.$store.dispatch('deleteComment', comment)
                this.$router.go('/');
                return;
            }
        },
    }
    
})
</script>