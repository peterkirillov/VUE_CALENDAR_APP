<template lang='pug'>
    .content-wrapper
        section
            .container
                h1.ui-title-1 События
                .task.list
                    .task.item(
                        v-for='task in tasks'
                        :key="task.id"
                    )
                        .ui-card.ui-card--shadow
                            .task-item__info
                                span.button-close(
                                    @click='deleteTask(task.id)'
                                )
                            .task.item__content
                                span.ui-title-1 {{ task.title }}
                                .task.item__body
                                    p.ui-text-regular {{ task.description }}
                                    p.ui-text-regular Путь от станции {{ task.departureStation }} до станции {{ task.arrivalStation }}
                .button-list
                    button.button.button--round.button-primary(
                    @click='resetTasks'
                    ) УДАЛИТЬ ВСЕ СОБЫТИЯ
</template>

<script>
/* eslint-disable */
export default {
    computed: {
        tasks () {
            return this.$store.getters.tasks
        }
    },
    methods: {
        resetTasks() {
            this.$store.dispatch('resetTasks')
        },
        deleteTask (id) {
            this.$store.dispatch('deleteTask', id)
             .then(() => {
                 console.log('event deleted')
                 this.$store.dispatch('loadTasks')
             }) 
        }
    }
}
</script>

<style>
.ui-text-regular {
  font-size: large;
}
.button-close {
  margin-left: 95%;
}
.button-list {
  padding-top: 20px;
}
</style>