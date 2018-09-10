<template>
  <q-page>
    <q-scroll-area class="full-width full-height text-primary row inline">
      <q-card class="col q-ma-sm" v-for="sch in schedules" :key="sch.id" style="min-width: 250px">
        <q-item class="bg-primary text-white" style="min-height: 58px">
          <q-item-main class="ellipsis cursor-pointer" @click.native="onConfigScheduleDetails($event, sch.id)">
            <q-item-tile label class="q-title text-white ellipsis">{{sch.name}}</q-item-tile>
            <q-item-tile sublabel class="text-white ellipsis">{{sch.description}}</q-item-tile>
          </q-item-main>
          <q-item-side right class="text-white">
            <div class="row inline">
              <q-icon class="col cursor-pointer q-mr-sm" name="build" @click.native="onConfigSchedule($event, sch.id)"/>
              <q-icon class="col cursor-pointer" name="close" @click.native="onRemoveSchedule($event, sch.id)"/>
            </div>
          </q-item-side>
        </q-item>
        <q-card-main>
          Card Content
        </q-card-main>
      </q-card>
    </q-scroll-area>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round color="primary" icon="add" @click="onCreateSchedule"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'schedules',
  computed: {
    ...mapState({
      // schedules: state => state.schedules
    })
  },
  methods: {
    async onRemoveSchedule (evt, id) {
      let response = await this.$dbAPI.deleteSchedules({ids: [id]})
      if (response && response.result) {
        response.result.forEach(id => this.$store.commit('SCHEDULE_REMOVE', id))
      }
    },
    onConfigSchedule (evt, id) {
      this.$router.push({name: 'ScheduleConfig', params: {id: id}})
    },
    onConfigScheduleDetails (evt, id) {
      this.$router.push({name: 'ScheduleDetails', params: {id: id}})
    },
    async onCreateSchedule () {
      this.$router.push({name: 'ScheduleCreate'})
    }
  }
}
</script>

<style scoped>
</style>
