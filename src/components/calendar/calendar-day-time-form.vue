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
  methods: {
    onAddTime () {
      this.$emit('add-time', {
        time: this.time,
        clients: this.clients
      })
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
