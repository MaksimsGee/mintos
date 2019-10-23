<template lang="pug">
  div.wrapper(:class="$style.root")
    navbar
    div.container
      div.row
        div.col-12
          router-view

    div.footer
      div.container
        div.col-12.text-center
          div Coded by #[a(href="https://github.com/MaksimsGee", target="_blank") Maksims Gerasimovs]
          div Powered by #[a(href="https://mintos.com/", target="_blank") mintos.com]
</template>

<script src="./App.js"></script>
<style src="@/assets/app.scss" lang="scss"></style>
<style src="./App.scss" lang="scss" module></style>
