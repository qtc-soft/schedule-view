<template>
  <div class="full-width text-tertiary">
    <div class="full-width row inline border-bottom q-pa-sm">
      <div class="col arrow-left cursor-pointer text-center" style="min-width: 30px;max-width: 30px"><q-btn icon="keyboard_arrow_left" @click.native="onBackDay()"/></div>
      <div class="col month q-headline text-center">{{dayTitle}}</div>
      <div class="col arrow-right cursor-pointer text-center" style="min-width: 30px;max-width: 30px"><q-btn icon="keyboard_arrow_right" @click.native="onForwardDay()"/></div>
    </div>
    <div class="full-width column inline">
      <div class="row q-subheading calendar-day-cell border-bottom"  v-for="(h, i) in dayData" :key="i" @click="showDayEventDialog=true">
        <div class="col-1 q-pa-sm">{{h.label}}</div>
        <div class="col-11"></div>
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
  name: 'CalendarMonth',
  components: {CalendarDayEvents},
  props: ['time'],
  data () {
    return {
      weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      // current time
      currentTime: date.startOfDate(this.time || TODAY, 'day'),
      //
      showDayEventDialog: false
    }
  },
  computed: {
    dayTitle () {
      return `${this.currentTime.getFullYear()} ${this.$t(this.monthNames[this.currentTime.getMonth()])} ${this.currentTime.getDate()}, ${this.$t(this.weekDays[this.currentTime.getDay() - 1])}`
    },
    dayData () {
      let result = []
      for (let h = 0, l = 24; h <= l; h++) {
        result.push({
          h: h, // hour
          label: h + this.$t('h')
        })
      }
      return result
    }
  },
  watch: {
    time (value) {
      this.currentTime = date.startOfDate(value)
    }
  },
  methods: {
    onForwardDay () { this.currentTime = date.addToDate(this.currentTime, {date: 1}) },
    onBackDay () { this.currentTime = date.subtractFromDate(this.currentTime, {data: 1}) },
    onDayClick () {
      this.showEventDialog = true
    }
  }
}
</script>

<style scoped>
  .calendar-day-cell {
    height: 100px
  }
</style>
