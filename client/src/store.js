import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const $http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      name: '',
      email: '',
      token: ''
    },
    questionsList: [],
    questionGet: {},
    answersGet: []
  },
  getters: {
  },
  mutations: {
    getQuestions: function (state, payload) {
      state.questionsList = payload.map(val => val)
      console.log('ini questionList')
      console.log(state.questionsList)
    },
    getQuestionById: function (state, payload) {
      state.questionGet = payload
    },
    getAnswersByQuestion: function (state, payload) {
      state.answersGet = payload.map(val => val)
    }
  },
  actions: {
    emitLogin: function (context, payload) {
      $http({
        method: 'post',
        url: '/users/signin',
        data: {
          username: payload.email,
          email: payload.email,
          password: payload.password
        }
      })
        .then(response => {
          console.log(`Response Login : ${JSON.stringify(response)}`)
          localStorage.setItem('token', response.data.data.token)
          localStorage.setItem('id', response.data.data.id)
          localStorage.setItem('name', response.data.data.name)
          localStorage.setItem('email', response.data.data.email)
          // this.$outer.push('Home')
        })
    },
    getQuestions: function (context) {
      $http({
        method: 'get',
        url: '/posts'
      })
        .then(response => {
          console.log('success get data')
          console.log(response)
          context.commit('getQuestions', response.data.data)
        })
    },
    emitNewQuestion: function (context, payload) {
      $http({
        method: 'post',
        url: '/posts',
        data: {
          question: payload,
          user: localStorage.getItem('id')
        }
      })
        .then(response => {
          console.log('success add new question')
          context.dispatch('getQuestions')
        })
    },
    getQuestionById: function (context, payload) {
      return new Promise((resolve, reject) => {
        $http({
          method: 'get',
          url: `/posts/${payload}`
        })
          .then(response => {
            console.log('succeed get data by id')
            console.log(response)
            context.commit('getQuestionById', response.data.data)
            resolve()
          })
      })
    },
    emitNewAnswer: function (context, payload) {
      $http({
        method: 'post',
        url: `/answers/${payload.postId}`,
        data: {
          answer: payload.answer,
          user: payload.userId
        }
      })
        .then(response => {
          console.log('succeed to create answer')
          console.log(response)
          context.dispatch('getAnswersByQuestion', payload.postId)
        })
    },
    getAnswersByQuestion: function (context, payload) {
      return new Promise((resolve, reject) => {
        $http({
          method: 'get',
          url: `/answers/${payload}`
        })
          .then(response => {
            console.log('succeed to get answers by question')
            console.log(response.data.data)
            context.commit('getAnswersByQuestion', response.data.data)
            resolve()
          })
      })
    },
    emitUpvoteQuestion: function (context, payload) {
      $http({
        method: 'post',
        url: '/posts/upvote',
        data: {
          userId: payload.userId,
          postId: payload.postId
        }
      })
        .then(response => {
          context.dispatch('getQuestionById', payload.postId)
        })
    },
    emitDownvoteQuestion: function (context, payload) {
      $http({
        method: 'post',
        url: '/posts/downvote',
        data: {
          userId: payload.userId,
          postId: payload.postId
        }
      })
        .then(response => {
          context.dispatch('getQuestionById', payload.postId)
        })
    },
    emitDownvoteAnswer: function (context, payload) {
      $http({
        method: 'post',
        url: '/answers/downvote',
        data: {
          userId: payload.userId,
          answerId: payload.answerId
        }
      })
        .then(response => {
          context.dispatch('getAnswersByQuestion', payload.postId)
        })
    },
    emitUpvoteAnswer: function (context, payload) {
      $http({
        method: 'post',
        url: '/answers/upvote',
        data: {
          userId: payload.userId,
          answerId: payload.answerId
        }
      })
        .then(response => {
          context.dispatch('getAnswersByQuestion', payload.postId)
        })
    },
    emitDeleteAnswer: function (context, payload) {
      $http({
        method: 'delete',
        url: `/answers/${payload.answerId}`
      })
        .then(response => {
          context.dispatch('getAnswersByQuestion', payload.postId)
        })
    },
    emitDeletePost: function (context, payload) {
      $http({
        method: 'delete',
        url: `/posts/${payload}`
      })
        .then(response => {
          console.log('post deleted')
          context.dispatch('getQuestions')
        })
    }
  }
})
