<template lang='pug'>
.wrapper
    header
      .navbar
        .container
          .navbar-content
            router-link.header-logo(
              to="/"
            ) Календарь
            .navbar-list__wrapper
              ul.navbar-list
                li.navbar-item(
                  v-for="link in linkMenu"
                  :key="link.title"
                )
                  router-link.navbar-link(
                    :to="`${link.url}`"
                  ) {{ link.title }}
                li.navbar-item(
                  v-if="checkUser"
                  @click="logout"
                )
                  span.navbar-link Выход
    router-view
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    }
  },
  computed: {
    checkUser () {
      return this.$store.getters.checkUser
    },
    linkMenu () {
      if(this.checkUser) {
        return [
          {title: 'Домой', url: '/'},
          {title: 'События', url: '/event'}
        ]
      }
      return [
        {title: 'Регистрация', url:'/registration'},
        {title: 'Авторизация', url:'/login'}
      ]
    }
  }
}
</script>

<style lang='stylus'>
@import '~vuetify/src/stylus/main'
a
  font-size large
.navbar-link
  font-size 16px
</style>