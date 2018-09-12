<template>
  <!--fields and actions-->
  <q-card>
    <q-card-main>
      <q-item>
        <q-field :count="200" dense class="full-width">
          <q-input
            clearable
            v-model="authDataConfig.name"
            type="text"
            @blur="$v.authDataConfig.name.$touch"
            :error="$v.authDataConfig.name.$error"
            :float-label="$t('name')"
            :maxlength="200"
          />
        </q-field>
      </q-item>
      <q-item>
        <q-field :count="200" dense class="full-width">
          <q-input
            clearable
            v-model="authDataConfig.organization"
            type="textarea"
            @input="$v.authDataConfig.organization.$touch"
            :error="$v.authDataConfig.organization.$error"
            :float-label="$t('organization')"
            :maxlength="200"
            :max-height="50"
          />
        </q-field>
      </q-item>
      <q-item>
        <q-field :count="200" dense class="full-width">
          <q-input
            clearable
            v-model="authDataConfig.description"
            type="textarea"
            @input="$v.authDataConfig.description.$touch"
            :error="$v.authDataConfig.description.$error"
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
            v-model="authDataConfig.phone"
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
            v-model="authDataConfig.email"
            type="email"
            @input="$v.authDataConfig.email.$touch"
            :error="$v.authDataConfig.email.$error"
            :float-label="$t('email')"
            :max-height="50"
          />
        </q-field>
      </q-item>
      <q-item>
        <q-field :count="200" dense class="full-width">
          <q-input
            clearable
            v-model="authDataConfig.address"
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
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'schedule-update',
  data () {
    return {
      authDataConfig: {}
    }
  },
  computed: {
    user_id () {
      // data copy
      return this.$store.state.authenticatedData ? this.$store.state.authenticatedData.id : -1
    }
  },
  validations: {
    authDataConfig: {
      name: {required, minLength: minLength(4)},
      organization: {required, maxLength: maxLength(200)},
      description: {required, maxLength: maxLength(200)},
      email: {email}
    }
  },
  watch: {
    authData (newVal) {
      this.authDataConfig = newVal
    }
  },
  asyncComputed: {
    // model User
    authData: {
      lazy: true,
      async get () {
        // result getting data
        let res = {}
        let respData = await this.$dbAPI.getUsers({ids: [this.user_id]})
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
    async onSave () {
      // send request to API
      let response = await this.$dbAPI.updateUsers([this.authData], {}, `${this.$t('error_element_updated')}, `)
      if (response.result && response.result.length) {
        // update cache
        this.$store.commit('LOGIN', response.result[0])
      }
    }
  }
}
</script>

<style>
</style>
