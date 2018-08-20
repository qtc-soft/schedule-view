<template>
  <div class="row inline q-pa-sm">
    <div class="col" style="min-width: 270px">
      <div class="q-subheading ellipsis">
        {{title}}
      </div>
      <calendar-day-time-form v-on:add-time="onAddTime" :dayTimeInfo="chipTimeInfo"/>
    </div>
    <div class="col" style="min-width: 270px">
      <div class="row inline q-pa-sm">
        <calendar-day-time-chip class="col"
          v-if="dayInfoItems.length"
          v-for="(dayInfoItem, i) in dayInfoItems"
          :key="i"
          :dayTimeInfo="dayInfoItem"
          v-on:select="onChipSelect"
          v-on:remove="onChipRemove"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { date } from 'quasar'
import { mapState } from 'vuex'

import CalendarDayTimeForm from './calendar-day-time-form'
import CalendarDayTimeChip from './calendar-day-time-chip'

export default {
  name: 'calendar-day-time-info',
  components: {CalendarDayTimeForm, CalendarDayTimeChip},
  data () {
    return {
      weekDaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      chipTimeInfo: {}
    }
  },
  computed: {
    ...mapState({
      currentDay: state => state.calendar_current_day || {},
      schedules: state => { return state.schedules || {} },
      scheduleDetails: state => { return state.scheduleDetails || {} }
    }),
    schedule_id () {
      return this.$route && this.$route.params ? this.$route.params.id || 0 : 0
    },
    schedule () {
      return this.schedules[this.schedule_id]
    },
    details () {
      return this.scheduleDetails[this.schedule_id] || []
    },
    title () {
      if (this.currentDay && this.currentDay.fullTime) {
        return `${this.$t(this.monthNames[this.currentDay.fullTime.getMonth()])} ${this.currentDay.fullTime.getDate()}, ${this.$t(this.weekDaysFull[this.currentDay.fullTime.getDay()])}`
      } else {
        return ''
      }
    },
    dayInfoItems () {
      return this.$store.getters.dayTimeItems(this.schedule_id, this.currentDay.fullTime)
    }
  },
  methods: {
    onAddTime (evt) {
      if (evt && evt.time) {
        this.$store.commit('SCHEDULE_DETAILS_ADD', {
          schedule_id: this.schedule_id,
          detail: {
            time: this.currentDay.time + evt.time, // evt.time is houre in milliseconds
            clients: evt.clients,
            description: evt.description
          }
        })
      }
    },
    onChipSelect (dayInfo) {
      this.chipTimeInfo = dayInfo
    },
    onChipRemove (dayInfo) {
      this.$store.commit('SCHEDULE_DETAILS_REMOVE', {
        schedule_id: this.schedule_id,
        detail: dayInfo
      })
    }
  }
}
</script>

<style scoped>

</style>
