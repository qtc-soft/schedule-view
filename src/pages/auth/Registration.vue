<template>
  <q-list class="no-border">
    <q-item class="full-width" @click.native="$router.push({name: 'LoginPage'})">
      <q-item-main class="text-right text-primary cursor-pointer">
        {{$t('account_already_exists')}}
      </q-item-main>
    </q-item>
    <q-item class="q-pt-none q-mt-none">
      <q-field :count="100" dense class="full-width">
        <q-input
          class="full-width"
          clearable
          v-model="form.name"
          type="text"
          @blur="$v.form.name.$touch"
          @keyup.enter="registration"
          :error="$v.form.name.$error"
          :float-label="$t('name')"
          :maxlength="100"
        />
      </q-field>
    </q-item>
    <q-item>
      <q-input
        class="full-width"
        clearable
        v-model="form.password"
        type="password"
        @keyup.enter="registration"
        :float-label="$t('password')"
      />
    </q-item>
    <q-item>
      <q-field :count="30" dense class="full-width">
        <q-input
          class="full-width"
          clearable
          v-model="form.email"
          type="text"
          @input="$v.form.email.$touch"
          @keyup.enter="registration"
          :error="$v.form.email.$error"
          :maxlength="30"
          :float-label="$t('email')"
        />
      </q-field>
    </q-item>
    <q-item>
      <q-field :count="30" dense class="full-width">
        <q-input
          class="full-width"
          clearable
          v-model="form.phone"
          type="text"
          @input="$v.form.phone.$touch"
          @keyup.enter="registration"
          :error="$v.form.phone.$error"
          :maxlength="30"
          :float-label="$t('phone')"
        />
      </q-field>
    </q-item>
    <q-item>
      <q-btn class="q-py-sm q-px-md q-mt-md full-width" color="primary" @click="registration" dense>{{$t('registration')}}</q-btn>
    </q-item>
    <q-item class="q-caption">
      <q-item-main class="text-center">
        © QTC-soft
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'registration-form',
  data () {
    return {
      form: {
        name: '',
        password: '',
        email: '',
        phone: ''
      }
    }
  },
  validations: {
    form: {
      name: { required, minLength: minLength(4) },
      password: { required },
      email: {required, email},
      phone: {required}
    }
  },
  methods: {
    collectData () {
      return {
        login: this.form.name,
        password: this.form.password,
        email: this.form.email,
        phone: this.form.phone
      }
    },
    async registration (m) {
      this.$v.form.$touch()
      if (this.$v.form.$error === false) {
        let resp = await this.$dbAPI.registration(this.collectData(), false)
        // if response ok
        if (resp && resp.result) {
        } else {
          // if error
          if (resp.data.errors) {
            this.defaultNotifyByErrors(m, resp.data.errors)
          } else {
            this.notifyNegative(this.$t('failed_login'), `Error ${resp.status}: ${resp.statusText}`)
          }
        }
      } else {
        this.notifyNegative(this.$t('failed_fields'))
      }
    }
  }
}
</script>

<style scoped>
</style>
