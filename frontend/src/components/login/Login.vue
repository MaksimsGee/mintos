<template lang="pug">
  div(:class='$style.root')
    div.col-10.offset-1
      b-jumbotron(header="Login", lead="Do what ever you can")
        form(@submit.prevent='tryLogin', class="login")
          b-form-fieldset
            b-form-input(
              type='text',
              placeholder="E-mail",
              v-model="email",
              name="email",
              ref="email"
            )
          b-form-fieldset
            b-form-input(
              type='password',
              placeholder="Password",
              v-model="password",
              name='password'
            )
          div.col-12
            div.row
              b-button(variant="primary", type="submit") {{ 'LOGIN' }}
              b-button(variant="link", :to="{ name: 'register' }") {{ 'REGISTER' }}
</template>

<script src="./Login.js"></script>
<style src="./Login.scss" lang="scss" module></style>
