<template>
<div class="main-page">
<header-nav :title="title" :description="description"></header-nav>
<div class="container">
<div class='row'>
  <div id='content2' class="col-md-8 mx-auto">
    <div class='row'>
    <div class="form-tanya col-10 mx-auto">
      <input type="text" placeholder="Ayo tanya di sini" id="tanya-form" v-model="newQuestion">
    </div>
    <div class="button-tanya col-2 mx-auto">
      <button class='btn-tanya btn btn-info' @click="emitNewQuestion">Tanya</button>
    </div>
    </div>
  </div>
  <div class='col-8 mx-auto'>
  </div>
</div>
<div class="row">
<div id='content' class="col-md-8 mx-auto">
<div class="question-box" v-for="(question,i) in this.$store.state.questionsList" :key='i'>
<div class='row'>
  <div class='poin col-2'>
    <h6>Poin</h6>
    <h5>{{countPoint(question.upvote, question.downvote)}}</h5>
  </div>
  <div class='col-10'>
    <div id='question-link' class="post-preview">
    <p class="question-info">
    <a>Pertanyaan dari {{question.user.name}}</a>
    | {{stringDate(question.createdAt)}}</p>
    <router-link :to="{ name: 'QuestionDetail', params: { id: question._id }}">
    <h3 class="question">
    {{question.question}}
    </h3>
    </router-link>
    </div>
  </div>
</div>
</div>
</div>
</div>
</div>
</div>
</template>

<script>
import moment from 'moment'
import HeaderNav from '@/components/HeaderNav'

export default {
  name: 'QuestionList',
  components: {
    HeaderNav
  },
  data () {
    return {
      questions: this.$store.state.questionsList,
      title: 'Tanya?',
      description: 'Ayo tanya di sini!',
      newQuestion: ''
    }
  },
  created: function () {
  },
  methods: {
    stringDate: function (date) {
      return moment(date).startOf('hour').fromNow()
      // return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
    },
    countPoint: function (upvote, downvote) {
      return upvote.length - downvote.length
    },
    emitNewQuestion: function () {
      this.$store.dispatch('emitNewQuestion', this.newQuestion)
      this.newQuestion = ''
    }
  }
}
</script>

<style scoped>

#tanya-form {
  padding: 11px 16px;
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
.question-box {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0,0.2 );
  text-align: left;
}

.btn-tanya {
  margin-top: 10px;
  padding: 10px 10px;
}

.poin {
  text-align: center;
}

.question-info {
  margin: 0;
}

#content {
  background-color: white;
  border-radius: 10px;
}

.question {
  color: black !important;
}

.form-tanya {
  padding: 0;
}

.button-tanya {
  padding-left: 0;
}



</style>
