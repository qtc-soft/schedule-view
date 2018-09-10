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

export default {
  name: 'calendar-day-time-form',
  props: ['dayTimeInfo'],
  data () {
    return {
      members: 1,
      time: 21600000
    }
  },
  watch: {
    dayTimeInfo (value) {
      this.members = value && value.members ? value.members : 1
      this.time = value && value.time ? value.time - date.startOfDate(value.time, 'day') : 21600000
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
        time: this.convertTimeToSec(this.currentDay.time + this.time),
        members: this.members,
        description: ''
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
      }
      // change current time, add 1 houre
      if (this.time < 23 * 60 * 60 * 1000) {
        this.time += 60 * 60 * 1000
      } else {
        this.time = 60 * 60 * 1000
      }
    }
  }
}
</script>

<style scoped>

</style>
