<template>
<nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
<div class="container">
<router-link class="navbar-brand" :to="{ path: '/'}">
Tanya?
</router-link>
<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
Menu
<i class="fa fa-bars"></i>
</button>
<div class="collapse navbar-collapse" id="navbarResponsive">
<ul class="navbar-nav ml-auto">
  <router-link :to="{path: '/'}">
  <li class="nav-item">
  <a class="nav-link btn">Beranda</a>
  </li>
  </router-link>

  <router-link :to="{path: '/'}" v-if='user.id !== ""'>
  <li class="nav-item">
  <a class="nav-link btn">{{user.username}}</a>
  </li>
  </router-link>

  <router-link :to="{path: '/'}" v-if='user.id !== ""'>
  <li @click='emitLogout' class="nav-item">
  <a class="nav-link btn">Keluar</a>
  </li>
  </router-link>

  <router-link :to="{path: '/masuk'}" v-if='user.id === ""'>
  <li class="nav-item">
  <a class="nav-link btn">Masuk</a>
  </li>
  </router-link>

   <router-link :to="{path: '/daftar'}" v-if='user.id === ""'>
  <li class="nav-item">
  <a class="nav-link btn">Daftar</a>
  </li>
  </router-link>
</ul>
</div>
</div>
</nav>
</template>

<script>
import {mapState} from 'vuex'

export default{
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    emitLogout: function () {
      localStorage.setItem('token', '')
      localStorage.setItem('id', '')
      localStorage.setItem('username', '')
      localStorage.setItem('email', '')
      localStorage.setItem('name', '')
      // this.$router.push({path: '/'})
      this.$store.dispatch('clearUser')
    }
  }
}
</script>

<style scoped>
#mainNav {
  position: fixed;
  border-bottom: 1px solid #e9ecef;
  background-color: rgba(255,255,255,1);
}

#mainNav .navbar-brand {
  font-weight: 800;
  color: #343a40;
}

#mainNav .navbar-toggler {
  font-size: 12px;
  font-weight: 800;
  padding: 13px;
  text-transform: uppercase;
  color: #343a40;
}

li.nav-item > a {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>
