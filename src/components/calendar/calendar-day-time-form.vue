<template>
  <div class="row inline full-width">
    <div class="col q-pr-sm q-mb-sm" style="min-width: 90px">
      <q-datetime v-model="time" type="time" format24h :float-label="$t('time')" />
    </div>
    <div class="col q-pr-sm q-mb-sm" style="min-width: 90px">
      <q-input type="number" :float-label="$t('clients')" v-model="clients"/>
    </div>
    <div class="col q-mb-sm" style="min-width: 30px; max-width: 30px">
      <q-btn icon="add" @click="onAddTime"/>
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
      clients: 1,
      time: 21600000
    }
  },
  watch: {
    dayTimeInfo (value) {
      this.clients = value && value.clients ? value.clients : 1
      this.time = value && value.time ? value.time - date.startOfDate(value.time, 'day') : 21600000
    }
  },
  computed: {
    ...mapState({
      currentDay: state => state.calendar_current_day || {}
    }),
    schedule_id () {
      return this.$route && this.$route.params ? this.$route.params.id : null
    }
  },
  methods: {
    onAddTime () {
      // collect data
      let dayInfo = {
        time: this.currentDay.time + this.time,
        clients: this.clients,
        description: ''
      }
      this.$emit('add-time', dayInfo)
      // add data to storage
      if (this.schedule_id) {
        this.$store.commit('SCHEDULE_DETAILS_ADD', {
          schedule_id: this.schedule_id,
          detail: dayInfo
        })
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
