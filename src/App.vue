<template lang='pug'>
.wrapper
    header
      .navbar
        .container
          .navbar-content
            router-link.header-logo(
              to="/"
            ) Calendar
            .navbar-list__wrapper
              ul.navbar-list
                li.navbar-item(
                  v-for="link in linkMenu"
                  :key="link.title"
                )
                  router-link.navbar-link(
                    :to="`${link.url}`"
                  ) {{ link.title }}
    router-view
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      linkMenu: [
          {title: 'Home', url: '/'},
          {title: 'Events', url: '/event'}
        ]
    }
  },
}
</script>

<style lang='stylus'>
@import './assets/stylus/main'
@import '~vuetify/src/stylus/main'
a
  font-size large
</style>
