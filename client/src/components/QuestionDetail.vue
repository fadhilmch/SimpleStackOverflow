<template>
  <div>
    <div class="container">
          <div class='row' v-if="questionGet.user._id === user.id">
        <div class='button-custom col-md-8 mx-auto'>
          <div class='row'>
            <div class='offset-8 col-4'>
              <button :disabled='isEditing' @click="changeEdit(true)" class='btn btn-info btn-edit'>Edit</button>
              <button :disabled='isEditing' @click='emitDeletePost' class='btn btn-danger btn-edit'>Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
      <div id='content' class="col-md-8 mx-auto" v-if="questionGet.question != null">
      <div class='row'>
        <div class='col-9'>
          <div id='question-link' class="post-preview">
          <p class="question-info">
          <a>Pertanyaan dari {{questionGet.user.name}}</a>
          <br><span class='date'>{{stringDate(questionGet.createdAt)}}</span></p>
          </div>
        </div>
        <div class='col-1'>
          <button :disabled='isEditing' @click='emitUpvoteQuestion' class='btn btn-info btn-vote'><i class="fas fa-chevron-up"></i></button>
          <button :disabled='isEditing' @click='emitDownvoteQuestion' class='btn btn-danger btn-vote'><i class="fas fa-chevron-down"></i></button>
        </div>
        <div class='poin col-2'>
          <h6>Poin</h6>
          <h5>{{countPoint(questionGet.upvote, questionGet.downvote)}}</h5>
        </div>
      </div>
        <div class='row'>
          <div class='col-12'>
            <h3 class="question">
              <div v-if='isEditing === false'>
                {{questionGet.question}}
              </div>
            <div class='edit-bar' v-if='isEditing === true'>
            <input class='input-edit' type="text" v-model="questionGet.question">
            <button @click='changeEdit(false)' class='offset-10 col-2 btn btn-info btn-save'>Save</button>
            </div>
            </h3>
          </div>
        </div>
      </div>
      </div>
  
      <div id='answer' class="col-md-8 mx-auto">
        <h5 class='underline'>Jawaban</h5>
        <hr>
        <div class='row answer-box' v-for="(answer, i) in answersGet" :key="i">
          <div class='col-1'>
              <button :disabled='isEditing' @click='emitUpvoteAnswer(answer._id)' class='btn btn-info btn-vote'><i class="fas fa-chevron-up"></i></button>
              <button :disabled='isEditing' @click='emitDownvoteAnswer(answer._id)' class='btn btn-danger btn-vote'><i class="fas fa-chevron-down"></i></button>
            </div>
           <div class='poin col-2'>
              <h6>Poin</h6>
              <h5>{{countPoint(answer.upvote, answer.downvote)}}</h5>
            </div>
          <div class='col-8'>
            <span class='answer-info'>{{answer.user.name}}  |  {{dateCountdown(answer.createdAt)}}</span>
            <h5>{{answer.answer}}</h5>
          </div>
          <div class='col-1'>
            <button v-if="answer.user._id === user.id" @click='emitDeleteAnswer(answer._id)' class='btn btn-danger'><i class="far fa-trash-alt"></i></button>
          </div>
        </div>
      </div>
      </div>
      <div class='form-jawab row'>
        <div class='col-md-8 mx-auto'>
        <div class='row'>
        <div class="form-tanya col-10 mx-auto">
          <input type="text" placeholder="Jawab di sini.." id="tanya-form" v-model="newAnswer">
        </div>
        <div class="button-tanya col-2 mx-auto">
          <button :disabled='isEditing' class='btn-tanya btn btn-info' @click="emitNewAnswer">Jawab</button>
        </div>
        </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        newAnswer: '',
        user: {
          id: localStorage.getItem('id')
        },
        isEditing: false
      }
    },
    computed: mapState([
      'questionGet',
      'answersGet'
    ]),
    props: ['id'],
    created () {
      this.$store.dispatch('getQuestionById', this.id)
      this.$store.dispatch('getAnswersByQuestion', this.id)
    },
    methods: {
      countPoint: function (upvote, downvote) {
        return upvote.length - downvote.length
      },
      stringDate: function (date) {
        // return moment(date).startOf('hour').fromNow()
        return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
      },
      dateCountdown: function (date) {
        return moment(date).startOf('hour').fromNow()
      },
      emitNewAnswer: function () {
        this.$store.dispatch('emitNewAnswer', {
          answer: this.newAnswer,
          userId: localStorage.getItem('id'),
          postId: this.id
        })
        this.newAnswer = ''
      },
      emitUpvoteQuestion: function () {
        console.log('upvote')
        this.$store.dispatch('emitUpvoteQuestion', {
          userId: localStorage.getItem('id'),
          postId: this.id
        })
      },
      emitDownvoteQuestion: function () {
        console.log('downvote')
        this.$store.dispatch('emitDownvoteQuestion', {
          userId: localStorage.getItem('id'),
          postId: this.id
        })
      },
      emitUpvoteAnswer: function (answerId) {
        console.log('upvote answer')
        this.$store.dispatch('emitUpvoteAnswer', {
          userId: localStorage.getItem('id'),
          postId: this.id,
          answerId
        })
      },
      emitDownvoteAnswer: function (answerId) {
        console.log('downvote answer')
        this.$store.dispatch('emitDownvoteAnswer', {
          userId: localStorage.getItem('id'),
          postId: this.id,
          answerId
        })
      },
      emitDeleteAnswer: function (answerId) {
        console.log('delete answer')
        this.$store.dispatch('emitDeleteAnswer', {
          answerId,
          postId: this.id
        })
      },
      emitDeletePost: function () {
        this.$router.push({path: '/'})
        this.$store.dispatch('emitDeletePost', this.id)
      },
      changeEdit: function (value) {
        this.isEditing = value
      }
    }
  }
</script>

<style scoped>
.btn-save {
  margin-top: 10px;
}
.input-edit {
  width: 100%;
}
.button-custom {
  margin-bottom:10px;
}

.answer-info {
  font-size: 13px;
}
.btn-vote {
  padding: 2px 7px!important;
}
#content {
  background-color: white;
  border-radius: 10px;
  text-align: left;
  padding: 30px;
}
.btn-edit {
  padding: 5px 10px !important;
  /* width: 40px; */
}
#answer {
  background-color: white;
  border-radius: 10px;
  text-align: left;
  padding: 30px;
  margin-top: 10px; 
}

.poin {
  text-align: center;
}

.date {
  font-size: 12px;
}

.container {
  margin-top: 70px;
}

.btn-tanya {
  margin: 10px auto;
  padding: 18px 10px;
}

.form-tanya {
  padding-right: 0;
}

.form-jawab {
  margin-top: 30px;
}

.answer-box {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0,0.2 );
  text-align: left;
}

#tanya-form {
  padding: 20px 16px;
  margin: 10px;
  border-radius: 5px 0 0 5px;
  border: 0 none;
  outline: 0 none;
  font-size: 15px;
  width: 100%;
  background-color: rgba(255,255,255, 1);
  color: rgba(0,0,0,1);
  margin-right: 0 !important;
}

.button-tanya {
  padding-left: 0;
}

.poin {
  text-align: center;
}


</style>