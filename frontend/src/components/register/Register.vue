<template lang="pug">
  div(:class='$style.root')
    div.col-10.offset-1
      form(@submit.prevent="createUser")
        b-jumbotron(
          header="Register",
          lead="Give me your personal data"
        )
          b-form-fieldset(
            :invalid-feedback="invalidFeedbackEmail",
            :valid-feedback="validFeedbackEmail",
            :state="stateEmail",
          )
            b-form-input(
              v-model="formData.email",
              placeholder="Enter e-mail",
              :state="stateEmail"
            )
          b-form-fieldset(:invalid-feedback="invalidFeedbackPassword", :state="statePassword")
            b-form-input(
              type="password",
              v-model="formData.password",
              placeholder="Enter password",
              :state="statePassword"
            )
          b-form-fieldset(:invalid-feedback="invalidFeedbackRePassword", :state="stateRePassword")
            b-form-input(
              type="password",
              v-model="formData.password_confirmation",
              placeholder="Enter re-password",
              :state="stateRePassword",
            )
          b-form-fieldset
            b-button(
              variant="primary",
              type="submit",
              @click.native="createUser"
            ) {{ 'REGISTER' }}
            b-button(
              :to="{ name: 'login' }",
              variant="link"
            ) {{ 'GO BACK' }}
</template>

<script src="./Register.js"></script>
<style src="./Register.scss" lang="scss" module></style>

