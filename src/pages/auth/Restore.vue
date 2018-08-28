<template>
  <div>
  <q-list>
    <q-item v-if="step===1">{{$t('restore_text')}}</q-item>
    <q-item v-if="step===1">
      <q-field :count="30" dense class="full-width">
        <q-input
          class="full-width"
          clearable
          v-model="email"
          type="text"
          @input="$v.email.$touch"
          @keyup.enter="restore"
          :error="$v.email.$error"
          :maxlength="30"
          :float-label="$t('email')"
        />
      </q-field>
    </q-item>
    <q-item v-if="step===2">{{$t('restore_text2')}}</q-item>
    <q-item v-if="step===2">
      <q-field :count="30" dense class="full-width">
        <q-input
          class="full-width"
          clearable
          v-model="code"
          type="text"
          @input="$v.code.$touch"
          @keyup.enter="restore"
          :error="$v.code.$error"
          :maxlength="30"
          :float-label="$t('enter_code')"
        />
      </q-field>
    </q-item>
    <q-item>
      <q-btn class="q-py-sm q-px-md q-mt-md full-width" color="primary" @click="onRestore();step=2" dense>{{step === 2 ? $t('confirm') : $t('send')}}</q-btn>
    </q-item>
    <q-item class="link" v-if="step===2" @click.native="showAlert=true">
      {{$t('restore_code')}}
    </q-item>
  </q-list>
  <q-modal v-model="showAlert">
    <q-card>
    <q-card-title>
      {{$t('send_code_more')}}
    </q-card-title>
    <q-card-actions align="end">
      <q-btn :label="$t('cancel')" @click="showAlert=false"/>
      <q-btn :label="$t('ok')" @click="showAlert=false;onRestore()" color="primary"/>
    </q-card-actions>
    </q-card>
  </q-modal>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'restore',
  data () {
    return {
      email: '',
      code: '',
      step: 1,
      showAlert: false
    }
  },
  validations: {
    email: {required, email},
    code: {required}
  },
  methods: {
    onRestore () {
    }
  }
}
</script>

<style scoped>
</style>
