<template>
  <div class="calendar-day full-width text-tertiary">
    <div class="full-width row border-bottom q-pa-sm">
      <div class="col arrow-left cursor-pointer text-center" style="min-width: 30px;max-width: 30px"><q-btn icon="keyboard_arrow_left" @click.native="onBackDay()"/></div>
      <div class="col month q-headline text-center">{{dayTitle}}</div>
      <div class="col arrow-right cursor-pointer text-center" style="min-width: 30px;max-width: 30px"><q-btn icon="keyboard_arrow_right" @click.native="onForwardDay()"/></div>
    </div>
    <q-scroll-area class="full-width" :style="calcHeight">
      <div class="row q-subheading calendar-day-cell border-bottom"  v-for="(h, i) in dayData" :key="i">
        <div class="col-1 q-pa-sm">{{h.label}}</div>
        <div class="col-11"></div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapState } from 'vuex'
import CalendarDayEvents from './calendar-day-events'

export default {
  name: 'CalendarMonth',
  components: {CalendarDayEvents},
  props: ['time'],
  computed: {
    ...mapState({
      TODAY: state => state.TODAY,
      weekDaysFullNames: state => state.weekDaysFullNames || [],
      monthNames: state => state.monthNames || []
    }),
    // current time
    currentTime () {
      return date.startOfDate(this.time || this.TODAY, 'month')
    },
    dayTitle () {
      return `${this.currentTime.getFullYear()} ${this.$t(this.monthNames[this.currentTime.getMonth()])} ${this.currentTime.getDate()}, ${this.$t(this.weekDaysFullNames[this.currentTime.getDay() - 1])}`
    },
    dayData () {
      let result = []
      for (let h = 0, l = 24; h < l; h++) {
        result.push({
          h: h, // hour
          label: h + this.$t('h')
        })
      }
      return result
    },
    calcHeight () {
      return `height: ${Math.min(100 * 24, document.body.offsetHeight - 300)}px`
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
