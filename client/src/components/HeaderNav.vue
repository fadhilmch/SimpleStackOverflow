<template>
<header class="masthead">
<div class="overlay"></div>
<div class="container">
<div class="row">
<div class="col-lg-8 col-md-10 mx-auto">
<div class="site-heading">
<h1>{{title}}</h1>
<span class="subheading">{{description}}</span>
<div class="row">
    <input class="flipkart-navbar-input col-11 col-md-8 mx-auto" type="" placeholder="Cari pertanyaan di sini.." name="" v-model="search">
    <button class="flipkart-navbar-button col-1 mx-auto">
            <svg width="15px" height="15px">
                <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
            </svg>
        </button>
  </div>
</div>
</div>
</div>
</div>
</header>
</template>

<script>
export default{
  name: 'HeaderNav',
  props: ['title', 'description'],
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: function (val) {
      this.$store.dispatch('emitSearch', val)
    }
  }
}
</script>

<style scoped>
.flipkart-navbar-input {
      padding: 11px 16px;
      border-radius: 2px 0 0 2px;
      border: 0 none;
      outline: 0 none;
      font-size: 15px;
      width: 100%;
      background-color: rgba(255,255,255,1) ;
      color: rgba(0,0,0,1);
      margin-right: 0 !important;
    }

    ::placeholder {
      color: grey;
      opacity: 0.9;
    }

    .flipkart-navbar-button {
      background-color: rgba(255,255,255,1) ;
      border-radius: 0 2px 2px 0;
      border: 0 none;
      outline: 0 none;
      color: #565656;
      padding: 10px 0;
      height: 43px;
      cursor: pointer;
      margin-left: 0 !important;
    }
</style>
