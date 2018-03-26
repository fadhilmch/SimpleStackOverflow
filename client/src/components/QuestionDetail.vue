<template>
  <div>
    <div class="container">
      <div class="row">
      <div id='content' class="col-md-8 mx-auto">
      <div class='row' v-if="question.question != undefined">
        <div class='col-10'>
          <div id='question-link' class="post-preview">
          <p class="question-info">
          <a>Pertanyaan dari {{question.user.name}}</a>
          <br><span class='date'>{{stringDate(question.createdAt)}}</span></p>
          <!-- <router-link :to="{ name: 'QuestionDetail', params: { id: question._id }}"> -->
          <h3 class="question">
          {{question.question}}
          </h3>
          <!-- </router-link> -->
          </div>
        </div>
            <div class='poin col-2'>
          <h6>Poin</h6>
          <h5>{{countPoint(question.upvote, question.downvote)}}</h5>
        </div>
      </div>
      </div>
      <div id='answer' class="col-md-8 mx-auto">
        <h5>Jawaban</h5><br>
        <div class='row' v-for="(answer, i) in question.answers" :key="i">
          {{answer}}<br>
          {{answer.user.name}}
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
          <button class='btn-tanya btn btn-info' @click="emitNewAnswer">Jawab</button>
        </div>
        </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data () {
      return {
        question: this.$store.state.questionGet,
        newAnswer: ''
      }
    },
    props: ['id'],
    created () {
      this.$store.dispatch('getQuestionById', this.id)
        .then(() => {
          console.log('ini jawaban')
          console.log(this.$store.state.questionGet)
          this.question = this.$store.state.questionGet
        })
      console.log(this.id)
    },
    methods: {
      countPoint: function (upvote, downvote) {
        return upvote.length - downvote.length
      },
      stringDate: function (date) {
        // return moment(date).startOf('hour').fromNow()
        return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
      },
      emitNewAnswer: function () {
        this.$store.dispatch('emitNewAnswer', {
          answer: this.newAnswer,
          userId: localStorage.getItem('id'),
          postId: this.id
        })
        this.newAnswer = ''
      }
    }
  }
</script>

<style scoped>

#content {
  background-color: white;
  border-radius: 10px;
  text-align: left;
  padding: 30px;
}

#answer {
  background-color: white;
  border-radius: 10px;
  text-align: left;
  padding: 30px;
  margin-top: 30px; 
}

.poin {
  text-align: center;
}

.date {
  font-size: 12px;
}

.container {
  margin-top: 100px;
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


</style>