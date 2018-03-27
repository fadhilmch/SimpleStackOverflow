<template>
  <div class="container">
    <navbar></navbar>
    <div class="row vertical-offset-100">
      <div class="col-md-4 offset-md-4 my-auto">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Ayo daftar untuk ikut berpartisipasi</h3><br>
          </div>
          <div class="panel-body">
            <div class="form-group">
              <input class="form-control" placeholder="E-mail" name="email" type="text" v-model="signUpData.email">
            </div>
               <div class="form-group">
              <input class="form-control" placeholder="Username" name="username" type="text" v-model="signUpData.username">
            </div>
               <div class="form-group">
              <input class="form-control" placeholder="Name" name="name" type="text" v-model="signUpData.name">
            </div>
            <div class="form-group">
              <input class="form-control" placeholder="Password" name="password" type="password" v-model="signUpData.password">
            </div>
            <input class="btn btn-lg btn-success btn-block" type="submit" value="Daftar" @click="emitSignup">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'

  export default {
    name: 'SignUp',
    components: {
      Navbar
    },
    data () {
      return {
        signUpData: {
          email: '',
          password: '',
          username: '',
          name: ''
        }
      }
    },
    methods: {
      emitSignup: function () {
        console.log(this.signUpData)
        this.$store.dispatch('emitSignup', this.signUpData)
        this.signUpData.email = ''
        this.signUpData.password = ''
        this.signUpData.name = ''
        this.signUpData.username = ''
        this.$router.push({path: '/'})
      }
    }
  }
</script>

<style scoped>
  .vertical-offset-100 {
    padding-top: 100px;
  }

</style>
