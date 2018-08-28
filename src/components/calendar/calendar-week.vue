<template>
  <div class="calendar-week full-width text-tertiary">
    <div class="full-width row inline border-bottom q-pa-sm">
      <div class="col arrow-left cursor-pointer text-center" style="min-width: 30px;max-width: 30px"><q-btn icon="keyboard_arrow_left" @click.native="onBackWeek()"/></div>
      <div class="col month q-headline text-center">{{getCurrentYear()}}   {{$t(monthNames[getCurrentMonth()])}}</div>
      <div class="col arrow-right cursor-pointer text-center" style="min-width: 30px;max-width: 30px"><q-btn icon="keyboard_arrow_right" @click.native="onForwardWeek()"/></div>
    </div>
    <q-scroll-area class="full-width column border-bottom" style="height: calc(100% - 200px);">
      <div class="row border-bottom" v-for="(dayData, i) in weekData" :key="i">
        <div
          :class="`calendar-cell calendar-week-day col q-subheading content-center ${(dayData && dayData.time === (currentDay ? currentDay.time : 0) ? 'calendar-selected-cell' : '')} ${(dayData && dayData.time === todayStart ? 'calendar-today' : '')}`"
          style="max-width: 100px"
          @click="onDayClick($event, dayData)"
        >
          <div class="q-ma-sm">
            <span class="calendar-week-date">{{dayData.label}}</span>
          </div>
        </div>
        <div class="col">
          <div class="row inline q-pa-sm full-width">
            <calendar-day-time-chip
              class="col"
              v-if="dayData && dayData.items.length"
              v-for="(dayItem, i) in dayData.items"
              :key="i"
              :dayTimeInfo="dayItem"
              v-on:select="onChipSelect"
              v-on:remove="onChipRemove"
            />
          </div>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapState } from 'vuex'

import CalendarDayTimeForm from './calendar-day-time-form'
import CalendarDayTimeChip from './calendar-day-time-chip'

export default {
  name: 'CalendarWeek',
  props: ['time'],
  components: {CalendarDayTimeForm, CalendarDayTimeChip},
  data () {
    return {
      // current time
      chipTimeInfo: {},
      // current time
      currentTime: new Date()
    }
  },
  computed: {
    ...mapState({
      TODAY: state => state.TODAY,
      weekDaysFullNames: state => state.weekDaysFullNames,
      weekDaysShortNames: state => state.weekDaysShortNames || [],
      monthNames: state => state.monthNames || [],
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
    // today begining
    todayStart () { return date.startOfDate(this.TODAY, 'day').getTime() },
    weekData () {
      let startTime = this.currentTime
      let res = new Array(7).fill(0).map((d, i) => {
        let dayData = {
          fullTime: startTime,
          time: startTime.getTime(),
          items: this.$store.getters.dayTimeItems(this.schedule_id, startTime),
          label: `${startTime.getDate()}, ${this.$t(this.weekDaysShortNames[i])}`
        }
        startTime = date.addToDate(startTime, {days: 1})
        return dayData
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
    onBackWeek () {
      this.currentTime = date.subtractFromDate(this.currentTime, {days: 7})
    },
    onForwardWeek () {
      this.currentTime = date.addToDate(this.currentTime, {days: 7})
    },
    onDayClick (evt, dayData) {
      if (this.currentDay === dayData) {
        this.$store.commit('CALENDAR_CURRENT_DAY', null)
      } else {
        this.$store.commit('CALENDAR_CURRENT_DAY', dayData)
      }
    },
    onChipSelect (dayInfo) {
      if (this.chipTimeInfo === dayInfo) {
        this.chipTimeInfo = {}
      } else {
        this.chipTimeInfo = dayInfo
      }
    },
    onChipRemove (dayInfo) {
      this.$store.commit('SCHEDULE_DETAILS_REMOVE', {
        schedule_id: this.schedule_id,
        detail: dayInfo
      })
    }
  },
  mounted () {
    let dayStart = date.startOfDate('time' in this.currentDay ? this.currentDay.time : this.TODAY, 'day')
    this.currentTime = date.subtractFromDate(dayStart, {days: dayStart.getDay() - 1})
  }
}
</script>

<style lang="stylus">
  @import '~variables'
  .calendar-week-day {
    position: relative;
    padding: 0 5px;
    border-right: 1px solid lightgrey;
  }
  .calendar-week-day:hover:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background-color: $primary;
  }
  .calendar-week-date {
    padding: 2px;
    margin: 2px;
    border: 1px solid transparent;
    border-radius: 10px;
  }
  // .calendar-week-date:hover {
  //  border-color: $primary-dark;
  // }
</style>
