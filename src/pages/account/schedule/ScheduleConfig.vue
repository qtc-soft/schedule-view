<template>
  <!--fields and actions-->
  <schedule-form :schedule="schedule" :saveCallback="update"></schedule-form>
</template>

<script>
import ScheduleForm from './ScheduleForm'

export default {
  name: 'schedule-update',
  components: {
    ScheduleForm
  },
  // computed: {
  //   schedule () {
  //     return this.$route.params ? {...this.schedules[this.$route.params.id]} : {}
  //   }
  // },
  asyncComputed: {
    // model User
    schedule: {
      async get () {
        // result getting data
        let res = {}
        let respData = await this.$dbAPI.getSchedules({ids: [this.$route.params.id]})
        // if result
        if (respData && respData.result && respData.result[0]) {
          res = respData.result[0]
          // if not result
        } else {
          this.notifyNegative(this.$t('error_element_geted'))
        }
        return res
      },
      default: {}
    }
  },
  methods: {
    // create schedule
    async update (data, afterSaveCallback) {
      // create schedule with unique name
      let scheduleItem = this.$store.getters.getItemByName('schedules', data.name)
      // if such item already exists
      if (scheduleItem && scheduleItem.id) {
        this.notifyWarning('element_name_exists', data.name)
      } else {
        // send request to API
        let response = await this.$dbAPI.updateSchedules([data])
        if (response.result && response.result.length) {
          // update cache
          this.$store.commit('SCHEDULE', response.result[0])
          // call form method
          afterSaveCallback()
        }
      }
    }
  }
}
</script>

<style>
</style>
