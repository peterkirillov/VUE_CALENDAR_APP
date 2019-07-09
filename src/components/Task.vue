<template lang='pug'>
    .content-wrapper
        section
            .container
                h1.ui-title-1 Events
                .task.list
                    .task.item(
                        v-for='task in tasks'
                        :key='task.id'
                        :class='{ completed: task.completed }'
                    )
                        .ui-card.ui-card--shadow
                            .task.item__content
                                span.ui-title-1 {{ task.title }}
                                .task.item__body
                                    p.ui-text-regular {{ task.description }}
</template>

<script>
/* eslint-disable */
export default {
    computed: {
        tasks () {
            return this.$store.getters.tasks
        }
    }
}
</script>

<style lang='stylus' scoped>
.ui-text-regular
    font-size large
</style>