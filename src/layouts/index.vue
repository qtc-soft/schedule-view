<template>
  <q-layout view="lHh Lpr lFf">
    <!-- page header -->
    <q-layout-header>
      <q-toolbar
        :inverted="true"
      >
        <q-toolbar-title>
          {{$t('app_name')}}
          <span slot="subtitle">{{$t('app_description')}}</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="menu" v-if="menuMini" @click="showMenuMini=!showMenuMini"/>
        <span v-else class="q-mx-lg">
          <span>
            <span class="cursor-pointer q-mr-md" @click="$router.push({name: 'IndexPage'})">{{$t('home')}}</span>/
            <span class="cursor-pointer q-ml-md" @click="$router.push({name: 'ContactsPage'})">{{$t('contacts')}}</span>
          </span>
        </span>
        <q-btn icon="enter" flat dance round  class="cursor-pointer" v-if="isAuthenticated" @click="$router.push({name: 'LoginPage'})">{{$t('enter')}}</q-btn>
        <q-btn icon="person" flat dance round class="cursor-pointer" v-else @click="$router.push({name: 'ScheduleList'})">{{$t('panel')}}</q-btn>
      </q-toolbar>
    </q-layout-header>
    <!-- page body -->
    <q-page-container>
      <q-list class="full-width" v-show="menuMini && showMenuMini">
        <q-item class="cursor-pointer" @click.native="$router.push({name: 'IndexPage'});showMenuMini=!showMenuMini">{{$t('home')}}</q-item>
        <q-item class="cursor-pointer" @click.native="$router.push({name: 'ContactsPage'});showMenuMini=!showMenuMini">{{$t('contacts')}}</q-item>
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
      return this.$store.getters.getAuthData
    }
  },
  methods: {
    onResize () {
      this.menuMini = !(this.$q.platform.is.desktop && document.body.clientWidth >= 700)
    }
  }
}
</script>

<style scoped>
</style>
