<template>
    <!--fields and actions-->
    <schedule-form :schedule="schedule" :saveCallback="create"></schedule-form>
</template>

<script>
import ScheduleForm from './ScheduleForm'

export default {
  name: 'schedule-create',
  components: {
    ScheduleForm
  },
  data () {
    return {
      // model Tag
      schedule: {
        name: '',
        description: '',
        email: '',
        phone: '',
        address: ''
      }
    }
  },
  methods: {
    // create schedule
    async create (data, afterSaveCallback) {
      // create schedule with unique name
      let scheduleItem = this.$store.getters.getItemByName('schedules', data.name)
      // if such item already exists
      if (scheduleItem && scheduleItem.id) {
        this.notifyWarning(this.$t('element_name_exists'), data.name)
      } else {
        // send request to API
        let response = await this.$dbAPI.createSchedules([data])
        if (response && response.result && response.result.length) {
          // update cache)
          this.$store.commit('SCHEDULE', response.result[0])
        }
        // call form method
        afterSaveCallback()
      }
    }
  }
}
</script>

<style>
</style>
