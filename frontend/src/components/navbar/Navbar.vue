<template lang="pug">
  div(:class="$style.root")
    b-navbar(v-if="token", toggleable='lg' type='dark' variant='info')
      b-navbar-brand(:to="goHome") MINTOS.COM
      b-navbar-toggle(target='nav-collapse')
      b-collapse#nav-collapse(is-nav='')
        // Right aligned nav items
        b-navbar-nav.ml-auto
          b-button(variant="primary", @click="logout") LOGOUT

</template>

<script src="./Navbar.js"></script>
<style src="./Navbar.scss" lang="scss" module></style>
