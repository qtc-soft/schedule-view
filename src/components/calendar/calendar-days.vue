<template>
  <div class="full-width text-tertiary">
    <div class="full-width row inline border-bottom q-py-sm">
      <div class="col-1 arrow-left cursor-pointer text-center"><q-btn icon="keyboard_arrow_left" @click.native="onBackMonth()"/></div>
      <div class="col-10 month q-headline text-center">{{getCurrentYear()}}   {{$t(monthNames[getCurrentMonth()])}}</div>
      <div class="col-1 arrow-right cursor-pointer text-center"><q-btn icon="keyboard_arrow_right" @click.native="onForwardMonth()"/></div>
    </div>
    <div class="full-width row inline border-bottom">
      <div class="col q-subheading text-center content-center calendar-week-day q-my-sm"  v-for="(d, i) in weekDays" :key="i">{{$t(d)}}</div>
    </div>
    <div class="full-width row inline border-bottom" v-for="(weekData, i) in monthData" :key="i">
      <div :class="`col q-subheading calendar-month-cell ${(dayData && dayData.t && dayData.t.getTime() === todayStart ? 'calendar-today bg-secondary' : '')}`"  v-for="(dayData, j) in weekData" :key="j">
        <span class="cursor-pointer q-pr-sm" @click="onDateClick($event, dayData)">
          {{dayData.date}}
        </span>
      </div>
    </div>
    <q-modal v-model="showDayEventDialog">
      <calendar-day-events></calendar-day-events>
    </q-modal>
  </div>
</template>

<script>
import { date } from 'quasar'
import CalendarDayEvents from './calendar-day-events'

const TODAY = new Date()

export default {
  name: 'CalendarDays',
  components: {CalendarDayEvents},
  data () {
    return {
      // weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      weekDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      // current time
      currentTime: TODAY,
      // today begining
      todayStart: date.startOfDate(TODAY, 'day').getTime(),
      showDayEventDialog: false
    }
  },
  computed: {
    monthData () {
      let result = []
      // calculate begining of the current week
      let startMonthTime = date.startOfDate(this.currentTime, 'month')
      //  calculate begining of the current month
      let startMonth = startMonthTime.getMonth()
      // week day value of the current month
      let startDay = startMonthTime.getDay()
      // find time value of the first cell in month-table
      // return back on some day
      let startTime = date.subtractFromDate(startMonthTime, { days: startDay - 1 }) // mondey
      let endTime = date.addToDate(startMonthTime, { month: 1 }) // end of month
      // fill time table
      while (startTime < endTime) {
        // create week array with empty value
        let week = new Array(7).fill(0).map((val, i) => {
          let res
          debugger
          if (startTime.getMonth() === startMonth) {
            res = { t: startTime, date: startTime.getDate() }
          } else {
            res = {date: ''}
          }
          // add one day
          startTime = date.addToDate(startTime, { days: 1 })
          return res
        })
        result.push(week)
      }
      return result
    }
  },
  methods: {
    getCurrentYear () {
      return this.currentTime.getFullYear()
    },
    getCurrentMonth () {
      return this.currentTime.getMonth()
    },
    onForwardYear () { this.currentTime = date.addToDate(this.currentTime, {year: 1}) },
    onBackYear () { this.currentTime = date.subtractFromDate(this.currentTime, {year: 1}) },
    onForwardMonth () { this.currentTime = date.addToDate(this.currentTime, {month: 1}) },
    onBackMonth () { this.currentTime = date.subtractFromDate(this.currentTime, {month: 1}) },
    onDayClick () {
      this.showEventDialog = true
    },
    onDateClick (evt, data) {
      // change calendar mode on 'tab-single-day-component'
      // this.$store.commit('CALENDAR_MODE', 'tab-single-day-component')
      this.$emit('calendar-change-mode', {mode: 'tab-single-day-component', time: data.t})
    }
  }
}
</script>

<style scoped>
  .calendar-month-cell {
    position: relative;
    padding: 5px;
    height: 70px;
    border-right: 1px solid lightgrey;
  }
  .calendar-month-cell:hover:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background-color: #a2ad37;
  }
  .calendar-today {
    color: white;
  }
  .calendar-week-day {
    padding: 0 5px;
    border-right: 1px solid lightgrey;
  }
</style>
