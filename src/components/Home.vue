<template lang='pug'>
        section
            .calendar
                v-date-picker(v-model='date' :landscape="landscape" full-width :events="functionEvents"
                event-color="red lighten-1" color='#444ce0')
            .container
                h1.ui-title-1 Enter date and event
                v-text-field(
                    :value='computedDateFormattedMomentjs'
                    prepend-icon="event"
                    readonly
                )
                textarea(
                    type='text'
                    placeholder='Event description'
                    v-model="taskDescription"
                )
                // SUBMIT
                .button-list-1
                    button.button.button--round.button-primary(
                    @click='newTask'
                    ) ADD EVENT
                .button-list-2
                    button.button.button--round.button-primary(
                    @click='resetDrop'
                    ) RESET EVENTS
</template>
<script>
import moment from 'moment'
import 'date-fns/format'
/* eslint-disable */
export default {
    data() {
        return {
            taskDescription: '',
            taskId: 1,
            date: new Date().toISOString().substr(0, 10),
            landscape: true,
            eventDate: new Date().getUTCDate()
        }
    },
    methods: {
            newTask () {
                //если описание пустое
                if(this.taskDescription === ''){
                    return
                }
                const task = {
                    id: this.taskId,
                    title: this.computedDateFormattedMomentjs,
                    description: this.taskDescription
                }
                
                //Отправка события
                this.$store.dispatch('newTask', task)

                //reset
                this.taskId += 1
                this.taskDescription = ''
                this.eventDate +=1
            },
            //функция отмтеки дня с ивентом
            functionEvents (event) {
                const [,, day] = event.split('-')
                let currentDate = moment(event).format('dddd, MMMM Do YYYY')
                for (let i of this.$store.getters.tasks) {
                    let selectedDate = i.title
                    if (selectedDate === currentDate) return ['red']
                }
                return 
            },
            //функция ресета ивентов
            resetDrop() {
                this.$store.dispatch('resetTasks', {})
            }
            
    },
    //перевод даты в удобный формат
    computed: {
      computedDateFormattedMomentjs () {
        return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
      }
    }
    
}
</script>

<style lang='stylus' scoped>
.calendar
    margin-left  75px 
    margin-right 75px
    display flex
.button, input, select, textarea
    font-size large  
.button-list-1
    margin-bottom: 15px 
</style>