<template>
  <div class="calendar-month full-width text-tertiary">
    <div class="full-width row inline border-bottom q-pa-sm">
      <div class="col arrow-left cursor-pointer text-center" style="min-width: 30px;max-width: 30px"><q-btn icon="keyboard_arrow_left" @click.native="onBackMonth()"/></div>
      <div class="col month q-headline text-center">{{getCurrentYear()}}   {{$t(monthNames[getCurrentMonth()])}}</div>
      <div class="col arrow-right cursor-pointer text-center" style="min-width: 30px;max-width: 30px"><q-btn icon="keyboard_arrow_right" @click.native="onForwardMonth()"/></div>
    </div>
    <div class="full-width row inline border-bottom">
      <div class="col q-subheading text-center content-center calendar-month-week-day q-my-sm"  v-for="(d, i) in weekDays" :key="i">{{$t(d)}}</div>
    </div>
    <div class="full-width row inline border-bottom" v-for="(weekData, i) in monthData" :key="i">
      <div
        :class="`col q-subheading calendar-month-cell ${(dayData && dayData.time === todayStart ? 'calendar-today bg-secondary' : '')}`"
        v-for="(dayData, j) in weekData"
        :key="j"
        @click="onDayClick($event, dayData)"
      >
        <span class="calendar-month-date cursor-pointer" @click="onDateClick($event, dayData)">
          {{dayData.date}}
        </span>
        <div class="q-caption" style="height: calc(100% - 20px)">
          {{0}} / {{dayTimeItemsInfo[dayData.time] ? dayTimeItemsInfo[dayData.time].length : 0}}
        </div>
      </div>
      <calendar-day-time-info class="full-width border-top" v-show="currentDay && currentDay.weekId === i"/>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapState } from 'vuex'
import CalendarDayEvents from './calendar-day-events'
import CalendarDayTimeInfo from './calendar-day-time-info'

const TODAY = new Date()

export default {
  name: 'CalendarMonth',
  components: {CalendarDayEvents, CalendarDayTimeInfo},
  data () {
    return {
      weekDaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      // current time
      currentTime: TODAY,
      // today begining
      todayStart: date.startOfDate(TODAY, 'day').getTime()
    }
  },
  computed: {
    ...mapState({
      schedules: state => state.schedules || {},
      currentDay: state => state.calendar_current_day || {},
      scheduleDetails: state => { return state.scheduleDetails || {} }
    }),
    schedule_id () {
      return this.$route && this.$route.params ? this.$route.params.id : null
    },
    schedule () {
      return this.schedules[this.schedule_id]
    },
    details () {
      return this.scheduleDetails[this.schedule_id] || []
    },
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
          // debugger
          if (startTime.getMonth() === startMonth) {
            res = {fullTime: startTime, time: startTime.getTime(), date: startTime.getDate(), weekId: result.length}
          } else {
            res = {date: ''}
          }
          // add one day
          startTime = date.addToDate(startTime, {days: 1})
          return res
        })
        result.push(week)
      }
      return result
    },
    dayTimeItemsInfo () {
      let res = {}
      let schId = this.schedule_id
      this.monthData.forEach(week => {
        week.forEach(d => {
          if (d && d.time && d.fullTime) {
            res[d.time] = this.$store.getters.dayTimeItems(schId, d.fullTime) || []
          }
        })
      })
      return res
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
    onDayClick (evt, dayData) {
      if (this.currentDay === dayData) {
        this.$store.commit('CALENDAR_CURRENT_DAY', null)
      } else {
        this.$store.commit('CALENDAR_CURRENT_DAY', dayData)
      }
    },
    onDateClick (evt, data) {
      // change calendar mode on 'tab-single-day-component'
      // this.$store.commit('CALENDAR_MODE', 'tab-single-day-component')
      this.$emit('calendar-change-mode', {mode: 'tab-single-day-component', time: data.time})
    }
  }
}
</script>

<style lang="stylus">
  @import '~variables'
  .calendar-month-cell {
    position: relative;
    padding: 5px;
    height: 70px;
    border-right: 1px solid lightgrey;
    cursor: pointer;
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
  .calendar-month-date:hover {
    color: $secondary;
  }
  .calendar-month-week-day {
    padding: 0 5px;
    border-right: 1px solid lightgrey;
  }
</style>
