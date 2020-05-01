<template lang='pug'>
    .content-wrapper
        section
            .container
                h1.ui-title-1 События
                span(v-if="tasks.length === 0") У вас пока нету событий
                .task-list
                    .task-item(
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
.task-item{
    margin-bottom: 20px;
}
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