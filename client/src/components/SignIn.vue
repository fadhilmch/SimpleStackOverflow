<template>
<div class="container">
<navbar></navbar>
<div class="row vertical-offset-100">
<div class="col-md-4 offset-md-4 my-auto">
<div class="panel panel-default">
<div class="panel-heading">
<h3 class="panel-title">Please sign in</h3>
</div>
<div class="panel-body">
<div class="form-group">
<input class="form-control" placeholder="E-mail" name="email" type="text" v-model="loginData.email">
</div>
<div class="form-group">
<input class="form-control" placeholder="Password" name="password" type="password" v-model="loginData.password">
</div>
<input class="btn btn-lg btn-success btn-block" type="submit" value="Login" @click="emitLogin">
</div>
</div>
</div>
</div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default{
  name: 'SignIn',
  components: {
    Navbar
  },
  data () {
    return {
      loginData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    emitLogin: function () {
      console.log(this.loginData)
      this.$store.dispatch('emitLogin', this.loginData)
      this.loginData.email = ''
      this.loginData.password = ''
    }
  }
}
</script>

<style scoped>
.vertical-offset-100{
padding-top:100px;
}

</style>
