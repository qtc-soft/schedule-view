<template>
  <div>
    <calendar />
  </div>
</template>

<script>
import Calendar from '../../../components/calendar/main'

export default {
  name: 'Schedule',
  components: { Calendar },
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
  methods: {
    onClick (evt) {
      console.log(evt)
    }
  }
}
</script>

<style scoped>
</style>
