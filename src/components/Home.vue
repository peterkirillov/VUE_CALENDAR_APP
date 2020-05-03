<template lang='pug'>
        section
            .calendar
                v-date-picker(v-model='date' :landscape="landscape" full-width :events="functionEvents"
                event-color="red lighten-1" color='#444ce0' locale="ru")
            .container
                h1.ui-title-1 Введите дату и описание события
                v-text-field.computed-date(
                    :value='computedDateFormattedMomentjs'
                    prepend-icon="event"
                    readonly
                )
                textarea(
                    type='text'
                    placeholder='Описание события'
                    v-model="taskDescription"
                )
                .dropdown
                    v-select.departure-station(
                        v-model="sDeparture"
                        :items="items"
                        attach
                        chips
                        label="Выберите станцию метро отправления"
                    )
                    v-select.arrival-station(
                        v-model="sArrival"
                        :items="items"
                        attach
                        chips
                        label="Выберите станцию метро прибытия"
                    )
                // SUBMIT
                .button-list-1
                    button.button.button--round.button-primary(
                    @click='newTask'
                    ) ДОБАВИТЬ СОБЫТИЕ
</template>
<script>
import moment from 'moment'
import 'date-fns/format'
import { stations } from '../stations/metro-file.json'
/* eslint-disable */
export default {
    data() {
        return {
            taskDescription: '',
            // taskId: 1,
            date: new Date().toISOString().substr(0, 10),
            landscape: true,
            items: '',
            sDeparture: '',
            sArrival: '' 
        }
    },
    created(){
        this.fetchData();
    },
    methods: {
            fetchData(){
                return this.items = this.sDeparture = this.sArrival = stations.map(station => station.name)
            },
            newTask () {
                let stationsArr = stations.map(station => station.name)
                //если описание пустое
                if(this.taskDescription === ''){
                    return alert('Заполните описание события')
                }
                if(this.sDeparture.length === stationsArr.length){
                    return alert('Заполните станцию метро отправления')
                }
                if(this.sArrival.length === stationsArr.length){
                    return alert('Заполните станцию метро прибытия')
                }
                const task = {
                    // id: this.taskId,
                    title: this.computedDateFormattedMomentjs,
                    description: this.taskDescription,
                    departureStation: this.sDeparture,
                    arrivalStation: this.sArrival
                }
                
                //Отправка события
                this.$store.dispatch('newTask', task)

                //reset
                // this.taskId += 1
                this.taskDescription = '',
                this.sDeparture = '',
                this.sArrival = ''
            },
            

            //функция отмтеки дня с ивентом
            functionEvents (event) {
                const [,, day] = event.split('-')
                let currentDate = moment(event).format('YYYY-MM-DD')
                for (let i of this.$store.getters.tasks) {
                    let selectedDate = i.title
                    if (selectedDate === currentDate) return ['red']
                }
                return 
            }
    },
    //перевод даты в удобный формат
    computed: {
        computedDateFormattedMomentjs () {
            return this.date ? moment(this.date).format('YYYY-MM-DD') : ''
        }
    }
    
}
</script>

<style>
::-webkit-input-placeholder{
    font-size: large;
}
.calendar {
  margin-left: 75px;
  margin-right: 75px;
  display: flex;
}
.theme--light.v-icon {
  color: rgb(68, 76, 224);
}
.button,
input,
select,
textarea {
  font-size: large;
}
.dropdown {
  display: flex;
  flex-direction: row;
  justify-content: space-around
}
.arrival-station, .departure-station {
  height: 100%;
  max-width: 400px;
}
.v-select.v-select--chips input {
  border: none;
}
.button-list-1 {
    margin-top: 10px;
}
.ui-title-1 {
  border-bottom: 1px solid #ccc;
}
</style>