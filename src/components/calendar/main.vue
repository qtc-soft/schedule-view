<template>
  <div class="calendar">
    <q-tabs class="calendar-tabs" ref="fullCalendarTabs" inverted v-model="calendarMode">
      <q-tab
        name="tab-month"
        icon="view_module"
        :label="$t('month')"
        default
        slot="title"
      />
      <q-tab
        name="tab-week-component"
        icon="view_week"
        :label="$t('week')"
        slot="title"
      />
      <q-tab
        name="tab-days-component"
        icon="view_column"
        :label="$t('threedays')"
        slot="title"
      />
      <q-tab
        name="tab-single-day-component"
        icon="view_day"
        :label="$t('day')"
        slot="title"
      />
      <q-tab
        name="tab-agenda"
        icon="view_agenda"
        :label="$t('agenda')"
        slot="title"
      />

      <q-tab-pane name="tab-month" class="calendar-tab-pane-month q-pa-none">
        <calendar-month v-on:calendar-change-mode="onChangeMode($event)" :time="currentTime"/>
      </q-tab-pane>
      <q-tab-pane name="tab-week-component" class="calendar-tab-pane-week q-pa-none">
        <calendar-week v-on:calendar-change-mode="onChangeMode($event)" :time="currentTime"/>
      </q-tab-pane>
      <q-tab-pane name="tab-days-component" class="calendar-tab-pane-week q-pa-none">
        <calendar-days v-on:calendar-change-mode="onChangeMode($event)" :time="currentTime"/>
      </q-tab-pane>
      <q-tab-pane name="tab-single-day-component" class="calendar-tab-pane-week q-pa-none">
        <calendar-single-day v-on:calendar-change-mode="onChangeMode($event)" :time="currentTime"/>
      </q-tab-pane>
      <q-tab-pane name="tab-agenda" class="calendar-tab-pane-agenda q-pa-none">
        <calendar-agenda v-on:calendar-change-mode="onChangeMode($event)" :time="currentTime"/>
      </q-tab-pane>

    </q-tabs>
  </div>
</template>

<script>
// import { date } from 'quasar'

import CalendarMonth from './calendar-month'
import CalendarWeek from './calendar-week'
import CalendarDays from './calendar-days'
import CalendarSingleDay from './calendar-single-day'
import CalendarAgenda from './calendar-agenda'

export default {
  components: { CalendarMonth, CalendarWeek, CalendarDays, CalendarSingleDay, CalendarAgenda },
  name: 'calendar',
  data () {
    return {
      currentTime: 0
    }
  },
  computed: {
    calendarMode: {
      get () {
        return this.$store.state.calendar_mode
      },
      set (value) {
        this.$store.commit('CALENDAR_MODE', value)
      }
    }
  },
  methods: {
    onChangeMode (data) {
      this.currentTime = data.time
      this.$store.commit('CALENDAR_MODE', data.mode)
    }
  }
}
</script>

<style scoped>

</style>
