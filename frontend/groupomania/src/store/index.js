import { createStore } from 'vuex'
const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});
  
let user = localStorage.getItem('user');
if (!user) {
  user = {
    userId: -1,
    token: '',
  }; 
}else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  }catch (ex) {
      user = {
        userId: -1,
        token: '',
      };
  }
}

    
const store = createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      email: '',
      username: '',
      bio: '',
      profilPhoto: '',
    },
    messages: [],
    comments: [],
    users: [],
    
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    getUsers: function (state, users) {
      state.users = users;
    },
    deleteUser: function (state, user) {
      let users = state.users.filter(u => u.id != user.id)
      state.users = users;
    },
    deleteAccount: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
      
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.clear();
    },
    getMessages: function (state, messages) {
      state.messages = messages;
    },
    getComs: function(state, comments) {
      state.comments = comments
    },
    deleteMessage: function (state, message){
      let messages = state.messages.filter(p => p.id != message.id)
      state.messages = messages;
    },
    deleteComment: function (state, comment){
      let comments = state.comments.filter(c => c.id != comment.id)
      state.comments = comments;
    },  

  },
  actions: {
    login: ({commit}, userInfos) => {
      commit('setStatus');
      return new Promise((resolve, reject) => {
        instance.message('/auth/login', userInfos)
        .then(function (response) {
          commit('setStatus', '');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_login');
          reject(error);
        });
      });
    },
    createAccount: ({commit}, userInfos) => {
      commit('setStatus');
      return new Promise((resolve, reject) => {
        commit;
        instance.message('/auth/signup', userInfos)
        .then(function (response) {
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(function (error) {
          commit('setStatus', 'error_create');
          reject(error);
        });
      });
    },
    getUserInfos: ({commit})=> {
      instance.get('/users/userId')
      .then(function (response) {
        commit('userInfos', response.data);
      })
      .catch(function () {
      });
    },
    getUsers: ({commit}) => {
      instance.get('/users')
      .then(function(response) {
        commit('getUsers', response.data)
      }).catch(function(){

      })
    },
    deleteUser: ({commit}, user) => {
      instance.delete(`/users/${user.id}`)
      .then(function(response){
        if (response.status == 200 || response.status == 204)
        commit('deleteUser', user.id)
      })
      .catch(function(err) {
        console.log(err)
      })
    },
    deleteAccount: ({commit}, user) => {
      instance.delete(`/users/${user.id}`)
      .then(function(response){
        if (response.status == 200 || response.status == 204)
        commit('deleteAccount', user.id)
      })
      .catch(function(err) {
        console.log(err)
      })
    },
    getMessagesInfos: ({commit}) => {
      instance.get('/messages')
      .then(function(response) {
        commit('getMessages', response.data.messages)
      }).catch(function(){
      })
    },
    deleteMessage: ({commit}, message) => {
      instance.delete(`/messages/${message.id}`)
      .then(function(response){
        if (response.status == 200 || response.status == 204)
        commit('deleteMessage', message.id)
      })
      .catch(function() {

      })
    },
    getComments: ({commit}) => {
      instance.get('/comments')
      .then(function(response) {
        commit('getComs', response.data.comments)
      }).catch(function(){

      })
    },
    deleteComment: ({commit}, comment) => {
      instance.delete(`/comments/${comment.id}`)
      .then(function(response){
        if (response.status == 200 || response.status == 204)
        commit('deleteComment', comment.id)
      })
      .catch(function() {

      })
    },
  }
})
    
export default store;