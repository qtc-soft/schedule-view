<template>
  <div class="inline full-width" style="position: relative">
    <calendar class="column full-width"/>
    <div class="column full-width absolute-bottom bg-white" v-show="currentDay && currentDay.time" style="min-width: 270px;" ref="timeForm">
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
      calendarData: [
        {
          id: 1,
          summary: 'Test all-day event',
          description: 'Some extra info goes here',
          start: {
            date: '2018-08-08' // A date variable indicates an all-day event
          },
          end: {
            date: '2018-08-08'
          }
        }, {
          id: 2,
          summary: 'Test event',
          description: 'Some extra info goes here',
          location: 'Office of the Divine Randomness, 1232 Main St., Denver, CO',
          start: {
            dateTime: '2018-08-07T14:00:00'
          },
          end: {
            dateTime: '2018-08-07T16:30:00'
          },
          color: 'purple',
          attendees: [
            {
              id: 5,
              email: 'somebody@somewhere.com',
              displayName: 'John Q. Public',
              organizer: false,
              self: false,
              resource: false
            }
          ]
        }
      ]
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
