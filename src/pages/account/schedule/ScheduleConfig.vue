<template>
  <div>
    <q-card>
      <q-card-main>
        <q-item>
          <q-field :count="200" dense class="full-width">
            <q-input
              clearable
              v-model="schedule.name"
              type="text"
              @blur="$v.schedule.name.$touch"
              @keyup.enter="registration"
              :error="$v.schedule.name.$error"
              :float-label="$t('schedule_name')"
              :maxlength="200"
            />
          </q-field>
        </q-item>
        <q-item>
          <q-field :count="200" dense class="full-width">
            <q-input
              clearable
              v-model="schedule.description"
              type="textarea"
              @input="$v.schedule.description.$touch"
              :error="$v.schedule.description.$error"
              :float-label="$t('description')"
              :maxlength="200"
              :max-height="50"
            />
          </q-field>
        </q-item>
      </q-card-main>
      <q-card-actions align="end">
        <q-btn :label="$t('back')" @click="$router.back()"/>
        <q-btn color="primary" :label="$t('ok')" @click="onScheduleConfigSave" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'schedule-config',
  data () {
    return {
      schedule: {}
    }
  },
  computed: {
    ...mapState({
      schedules: state => state.schedules
    })
  },
  validations: {
    schedule: {
      name: {required, minLength: minLength(4)},
      description: {required, maxLength: maxLength(200)}
    }
  },
  methods: {
    onScheduleConfigSave () {
      this.$v.$touch()
      // if validate
      if (this.$v.$error === false) {
        this.$store.commit('SAVE_SCHEDULE', this.schedule)
        this.$router.push({name: 'ScheduleList'})
      }
    }
  },
  mounted () {
    this.schedule = this.$route.params ? this.schedules[this.$route.params.id] || {} : {}
  }
}
</script>

<style scoped>

</style>
