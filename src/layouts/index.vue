<template>
  <q-layout view="lHh Lpr lFf">
    <!-- page header -->
    <q-layout-header>
      <q-toolbar
        :inverted="true"
      >
        <q-toolbar-title>
          {{$t('app_name')}}
          <div slot="subtitle">{{$t('app_description')}}</div>
        </q-toolbar-title>
        <span class="cursor-pointer" @click="showLoginPanel=true;showRegisterPanel=false">{{$t('authorization')}}</span>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
        <span class="cursor-pointer" @click="showLoginPanel=false;showRegisterPanel=true">{{$t('registration')}}</span>
      </q-toolbar>
    </q-layout-header>
    <!-- page body -->
    <q-page-container>
      <router-view />
      <!-- auth dialogs -->
      <q-modal v-model="showLoginPanel">
        <login-form v-on:success="onLogin($event)" v-on:failed="onLogin($event)"></login-form>
      </q-modal>
      <q-modal v-model="showRegisterPanel">
        <registration-form v-on:success="onRegister($event)" v-on:failed="onRegister($event)"></registration-form>
      </q-modal>
    </q-page-container>
  </q-layout>
</template>

<script>
import LoginForm from '../components/auth/loginForm'
import RegistrationForm from '../components/auth/registrationForm'

export default {
  name: 'index',
  components: {
    LoginForm,
    RegistrationForm
  },
  data () {
    return {
      showLoginPanel: false,
      showRegisterPanel: false
    }
  },
  computed: {
    authData () {
      return this.$store.getters.getAuthData
    }
  },
  methods: {
    onLogin (data) {
      this.showLoginPanel = false
      this.showRegisterPanel = false
    },
    onRegister (data) {
      this.showLoginPanel = false
      this.showRegisterPanel = false
    }
  }
}
</script>

<style scoped>
</style>
