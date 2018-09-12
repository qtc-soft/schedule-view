<template>
  <div class="row inline full-width">
    <div class="col q-pr-sm q-mb-sm" style="min-width: 90px">
      <q-datetime v-model="time" type="time" format24h :float-label="$t('time')" />
    </div>
    <div class="col q-pr-sm q-mb-sm" style="min-width: 90px">
      <q-input type="number" :float-label="$t('clients')" v-model="members"/>
    </div>
    <div class="col q-mb-sm" style="min-width: 30px; max-width: 30px">
      <q-btn icon="check" round @click="onAddTime" inverted color="primary"/>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapState } from 'vuex'

// only hour, minutes & sec
// default value equal 9:00am
const START_WORK_DAY = 21600000

export default {
  name: 'calendar-day-time-form',
  // set default value
  props: ['dayTimeInfo'],
  data () {
    return {
      // time description
      description: '',
      // time price
      price: 0,
      // time memebers count
      members: 1,
      // curent time value in sec, without day info
      time: START_WORK_DAY
    }
  },
  watch: {
    dayTimeInfo (value) {
      this.members = value && value.members ? value.members : 1
      this.time = value && value.time ? this.convertTimeToMili(value.time) - date.startOfDate(value.time, 'day') : START_WORK_DAY
    }
  },
  computed: {
    ...mapState({
      currentDay: state => state.calendar_current_day || {}
    }),
    schedule_id () {
      return this.$route && this.$route.params ? +this.$route.params.id : null
    }
  },
  methods: {
    async onAddTime () {
      // collect data
      let dayInfo = {
        schedule_id: this.schedule_id,
        // begining of day + selected time
        time: this.currentDay.time + this.time,
        // selected mebers count
        members: this.members,
        // selected description
        description: ''
      }
      // time price, default 0
      // set price only if it is has value
      if (this.price) {
        dayInfo.price = this.price
      }
      // find old data
      let dayInfoOldData = this.$store.getters.getScheduleDetail(dayInfo.schedule_id, dayInfo.time)
      // request result
      let response
      // if time already exists
      if (dayInfoOldData) {
        // add members to old data
        dayInfo.members += dayInfoOldData.members
        response = await this.$dbAPI.updateScheduleDetails([dayInfo], {}, `${this.$t('error_element_updated')}, `)
      } else {
        // if time is new
        response = await this.$dbAPI.createScheduleDetails([dayInfo], {}, `${this.$t('error_element_created')}, `)
      }
      // add data to storage
      if (response && response.result && response.result.length) {
        let newDayData = response.result[0]
        this.$store.commit('SCHEDULE_DETAIL', newDayData)

        // change current time, add 1 hour
        if (this.time < 23 * 60 * 60 * 1000) {
          // in mili-sec
          this.time += 60 * 60 * 1000
        } else {
          // in mili-sec
          this.time = 60 * 60 * 1000
        }
        console.log(this.time)
      }
    }
  }
}
</script>

<style scoped>

</style>
