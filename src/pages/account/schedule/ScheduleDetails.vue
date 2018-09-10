<template>
  <div class="full-width" style="position: relative">
    <calendar class="full-width"/>
    <div class="full-width absolute-bottom bg-white q-px-md" v-show="currentDay && currentDay.time" style="min-width: 270px;" ref="timeForm">
      <calendar-day-time-info class="full-width" :showDetails="calendarMode === 'tab-month'"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Calendar from '../../../components/calendar/main'
import CalendarDayTimeInfo from '../../../components/calendar/calendar-day-time-info'

export default {
  name: 'Schedule',
  components: { Calendar, CalendarDayTimeInfo },
  data () {
    return {
      calendarData: []
    }
  },
  computed: {
    ...mapState({
      weekDaysFullNames: state => state.weekDaysFullNames,
      weekDaysShortNames: state => state.weekDaysShortNames || [],
      monthNames: state => state.monthNames || [],
      calendarMode: state => state.calendar_mode,
      currentDay: state => state.calendar_current_day || {}
    })
  }
}
</script>

<style scoped>
</style>
