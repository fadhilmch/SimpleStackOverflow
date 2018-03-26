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
<li class="nav-item">
<a class="nav-link" href="index.html">Home</a>
</li>
<li class="nav-item">
<a class="nav-link" href="about.html">Add Post</a>
</li>
<li class="nav-item">
<a class="nav-link" href="contact.html">Contact</a>
</li>
</ul>
</div>
</div>
</nav>
</template>

<script>
export default{
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

#mainNav .navbar-nav > li.nav-item > a {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>
