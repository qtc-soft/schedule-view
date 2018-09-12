<template>
  <div class="column inline q-pa-sm">
    <div class="row" style="min-width: 270px" v-if="showDetails && dayTimeItemsInfo.length">
      <div class="row inline q-my-lg">
        <calendar-day-time-chip
          class="col"
          v-if="dayTimeItemsInfo.length"
          v-for="(timeItem, i) in dayTimeItemsInfo"
          :key="i"
          :dayTimeInfo="timeItem"
          v-on:select="onChipSelect"
          v-on:remove="onChipRemove"
        />
      </div>
    </div>
    <div class="row" style="min-width: 270px">
      <div class="q-subheading ellipsis">
        {{title}}
      </div>
      <calendar-day-time-form :dayTimeInfo="chipTimeInfo"/>
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
  props: {
    showDetails: {type: Boolean, default: true}
  },
  components: {CalendarDayTimeForm, CalendarDayTimeChip},
  data () {
    return {
      chipTimeInfo: {}
    }
  },
  computed: {
    ...mapState({
      TODAY: state => state.TODAY,
      weekDaysFullNames: state => state.weekDaysFullNames,
      monthNames: state => state.monthNames || [],
      currentDay: state => state.calendar_current_day || {}
    }),
    schedule_id () {
      return this.$route && this.$route.params ? +this.$route.params.id : null
    },
    schedule () {
      return this.schedules[this.schedule_id]
    },
    title () {
      if (this.currentDay && this.currentDay.fullTime) {
        return `${this.$t(this.monthNames[this.currentDay.fullTime.getMonth()])} ${this.currentDay.fullTime.getDate()}, ${this.$t(this.weekDaysFullNames[this.currentDay.fullTime.getDay()])}`
      } else {
        return ''
      }
    },
    dayTimeItemsInfo () {
      return this.dayTimeItems(this.schedule_id, this.currentDay.fullTime)
    }
  },
  methods: {
    onChipSelect (dayInfo) {
      this.chipTimeInfo = dayInfo
    },
    onChipRemove (dayInfo) {
      this.$store.commit('SCHEDULE_DETAILS_REMOVE', {schedule_id: this.schedule_id, ...dayInfo})
    }
  }
}
</script>

<style scoped>

</style>
