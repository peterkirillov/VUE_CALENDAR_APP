<template lang='pug'>
    .content-wrapper
        section
            .container
              .auth
                .auth__banner
                  h1.ui-title-2 Здравствуйте!
                .auth__form
                  span.ui-title-1 Авторизация
                  form(@submit.prevent="onSubmit")
                    .form-item(:class="{ 'errorInput': $v.email.$error }")
                      input(
                        type='email'
                        placeholder='Email'
                        v-model='email'
                        :class="{ 'error': $v.email.$error }"
                        @change="$v.email.$touch()"
                      )
                      .error(v-if="!$v.email.required") Требуется заполнить email
                      .error(v-if="!$v.email.email") Email заполнен неверно
                    .form-item(:class="{ 'errorInput': $v.password.$error }")
                      input(
                        type='password'
                        placeholder='Пароль'
                        v-model='password'
                        :class="{ 'error': $v.password.$error }"
                        @change="$v.password.$touch()"
                      )
                      .error(v-if="!$v.password.required") Требуется заполнить пароль
                      .error(v-if="!$v.password.minLength")
                        | Пароль должен содержать минмум {{ $v.password.$params.minLength.min }} символов
                    .buttons-list
                      button.button.button-primary(
                        type='submit'
                      )
                        span(v-if="loading") Загрузка...
                        span(v-else) Войти
                    .buttons-list.buttons-list--info
                      p.typo__p(v-if="submitStatus === 'OK'") Вход выполнен!
                      p.typo__p(v-if="submitStatus === 'ERROR'") Пожалуйста, заполните поля верно
                      p(v-else) {{ submitStatus }}
                    .buttons-list.buttons-list--info
                      span Хотите зарегестрировасться?
                        router-link(to='/registration')  Нажмите здесь
</template>
<script>
/* eslint-disable */
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
        email: '',
        password: '',
        submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    }, password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const user = {
          email: this.email,
          password: this.password
        }
        // вход пользователя
        this.$store.dispatch('loginUser', user)
          .then(() => {
            console.log('login')
            this.submitStatus = 'OK'
            this.$router.push('/')
          })
          .catch(err => {
            this.submitStatus = err.message
          })
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style>
.auth {
    display: flex;
}
.auth__banner,
.auth__form {
    width: 50%;
}
.form-item .error{
  display: none;
  margin-bottom: 5px;
  font-size: 13px;
  color: #fc5c65;
}
.form-item.errorInput .error {
  display: block;
}
.error {
    border-color: #fc5c65 !important;
    animation: shake .3s;
}
.buttons-list{
  text-align: right;
  margin-bottom: 20px;
}
.buttons-list.buttons-list--info{
  text-align: center;
}
.buttons-list.buttons-list--info:last-child{
  margin-bottom: 0px;
}
a {
  color: #444ce0;
}
::-webkit-input-placeholder{
    font-size: 12px;
}
</style>
