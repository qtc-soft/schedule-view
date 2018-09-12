<template>
  <q-card>
    <q-card-main>
      <q-item>
        <q-field :count="200" dense class="full-width">
          <q-input
            clearable
            v-model="scheduleModel.name"
            type="text"
            :float-label="$t('name')"
            :maxlength="200"
          />
        </q-field>
      </q-item>
      <q-item>
        <q-field :count="200" dense class="full-width">
          <q-input
            clearable
            v-model="scheduleModel.description"
            type="textarea"
            :float-label="$t('description')"
            :maxlength="200"
            :max-height="50"
          />
        </q-field>
      </q-item>
      <q-item>
        <q-field dense class="full-width">
          <q-input
            clearable
            v-model="scheduleModel.phone"
            type="tel"
            :float-label="$t('phone')"
            :max-height="50"
          />
        </q-field>
      </q-item>
      <q-item>
        <q-field dense class="full-width">
          <q-input
            clearable
            v-model="scheduleModel.email"
            type="email"
            :float-label="$t('email')"
            :max-height="50"
          />
        </q-field>
      </q-item>
      <q-item>
        <q-field :count="200" dense class="full-width">
          <q-input
            clearable
            v-model="scheduleModel.address"
            type="text"
            :float-label="$t('address')"
            :maxlength="200"
            :max-height="50"
          />
        </q-field>
      </q-item>
    </q-card-main>
    <q-card-actions align="end">
      <q-btn :label="$t('back')" @click="$router.back()"/>
      <q-btn color="primary" :label="$t('ok')" @click="onSave" />
    </q-card-actions>
  </q-card>
</template>

<script>
// import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'schedule-form',
  props: ['schedule', 'saveCallback'],
  data () {
    return {
      scheduleModel: {}
    }
  },
  // validations: {
  //   scheduleModel: {
  //     name: {required, minLength: minLength(4)},
  //     description: {required, maxLength: maxLength(200)},
  //     email: {email}
  //   }
  // },
  watch: {
    schedule (newVal) {
      this.scheduleModel = newVal
    }
  },
  methods: {
    // save (create or update) Model
    onSave () {
      this.$v.scheduleModel.$touch()
      // if validate
      if (this.$v.scheduleModel.$error === false) {
        // save tag
        this.saveCallback(this.scheduleModel, this.toRouteView)
      } else {
        // incorrect form fields
        this.notifyNegative(this.$t('failed_fields'))
      }
    },
    // redirect to view scheduleModel list
    toRouteView () {
      this.$router.push({name: 'ScheduleList'})
    }
  }
}
</script>

<style scoped>

</style>
