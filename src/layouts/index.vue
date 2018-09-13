<template>
  <q-layout view="lHh Lpr lFf">
    <!-- page header -->
    <q-layout-header>
      <q-toolbar
        :inverted="true"
      >
        <q-toolbar-title>
          <span class="cursor-pointer" @click="$router.push({name: 'MenuPage'})">
          {{$t('app_name')}}
          </span>
          <span slot="subtitle" class="cursor-pointer" @click="$router.push({name: 'MenuPage'})">{{$t('app_description')}}</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="menu" v-if="menuMini" @click="showMenuMini=!showMenuMini"/>
        <span v-else class="q-mx-lg">
          <span>
            <!-- span class="cursor-pointer q-ml-md" @click="$router.push({name: 'ContactsPage'})">{{$t('contacts')}}</span -->
          </span>
        </span>
        <!-- q-btn flat dance class="cursor-pointer" v-if="!isAuthenticated" @click="$router.push({name: 'LoginPage'})">{{$t('enter')}}</q-btn -->
        <!-- q-btn-dropdown :label="authData.name || authData.login" flat dance class="cursor-pointer" v-else>
          <q-list class="q-pa-none" separator>
            <q-item class="cursor-pointer" @click.native="$router.push({name: 'ScheduleList'})">
              <q-item-main :label="$t('my_schedules')" :sublabel="scheduleInfo"></q-item-main>
              <q-item-side></q-item-side>
            </q-item>
            <q-item>
              <q-item-main :label="authData.email">
                <div class="link" @click="$router.push({name: 'ConfigPage'})">{{$t('account_settings')}}</div>
                <div class="link">{{$t('send_message_to_admin')}}</div>
              </q-item-main>
              <q-item-side align="right" class="cursor-pointer" @click.native="logout()">
                <q-icon name="exit_to_app"/>
              </q-item-side>
            </q-item>
          </q-list>
        </q-btn-dropdown -->
      </q-toolbar>
    </q-layout-header>
    <!-- page body -->
    <q-page-container>
      <q-list class="full-width" v-show="menuMini && showMenuMini">
        <q-item class="cursor-pointer" @click.native="$router.push({name: 'MenuPage'});showMenuMini=!showMenuMini">{{$t('home')}}</q-item>
        <!-- q-item class="cursor-pointer" @click.native="$router.push({name: 'ContactsPage'});showMenuMini=!showMenuMini">{{$t('contacts')}}</q-item -->
      </q-list>
      <router-view />
      <q-resize-observable @resize="onResize" />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'index',
  data () {
    return {
      showMenuMini: false,
      menuMini: this.$q.platform.is.desktop && document.body.clientWidth >= 700
    }
  },
  computed: {
    authData () {
      return this.$store.getters.getAuthData()
    },
    scheduleInfo () {
      return `${this.$t('control_panel')}: ${this.schedules ? Object.keys(this.schedules).length : 0}`
    }
  },
  methods: {
    onResize () {
      this.menuMini = !(this.$q.platform.is.desktop && document.body.clientWidth >= 700)
    },
    logout () {
      this.$dbAPI.logout(this.$store.state.sid)
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
</style>
