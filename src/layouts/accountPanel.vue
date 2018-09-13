<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar class="q-px-lg">
        <!-- q-btn
          flat
          dense
          round
          @click="showLeftPanel = !showLeftPanel"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn -->
        <q-btn
          flat
          dense
          round
          @click="$router.back()"
          v-if="this.$route.meta.back"
        >
          <q-icon name="arrow_back" />
        </q-btn>
        <q-toolbar-title>
          {{$t(this.$route.meta.label)}}
          <div slot="subtitle">{{$t(this.$route.meta.sublabel)}}</div>
        </q-toolbar-title>
        <q-icon name="exit_to_app" @click.native="logout()"/>
      </q-toolbar>
    </q-layout-header>

    <!-- q-layout-drawer
      v-model="showLeftPanel"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-scroll-area class="full-width full-height">
        <expand-menu :data="menuLeftPanel"></expand-menu>
      </q-scroll-area>
    </q-layout-drawer -->

    <q-page-container class="fixed full-width full-height">
      <router-view class="full-width full-height q-pa-md"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState } from 'vuex'
import { openURL } from 'quasar'
import ExpandMenu from 'components/ExpandMenu'

export default {
  name: 'MyLayout',
  components: { ExpandMenu },
  data () {
    return {
      showLeftPanel: this.$q.platform.is.desktop
    }
  },
  computed: {
    ...mapState({
      menuItem: store => store.menu_item
    }),
    activeMenuItem () {
      return this.$store.state.menu_item || {}
    },
    menuLeftPanel () {
      return [{
        id: '-1',
        key: 'home',
        label: this.$t('home'),
        pageName: 'MenuPage'
      }, {
        id: '0',
        key: 'acc_config',
        label: this.$t('account_settings'),
        pageName: 'ConfigPage'
      }, {
        id: '1',
        key: 'schedules',
        label: this.$t('all_schedules'),
        sublabel: `${this.$t('total')}: ${this.schedules ? Object.keys(this.schedules).length : 0}`,
        pageName: 'ScheduleList',
        expanded: false,
        items: this.getScheduleMenuList()
      }, {
        id: '2',
        key: 'payment',
        label: this.$t('payment'),
        pageName: 'AccountPayment'
      }, {
        id: '3',
        key: 'reports',
        label: this.$t('reports'),
        pageName: 'AccountReports'
      }, {
        id: '4',
        key: 'logout',
        label: this.$t('exit'),
        pageName: 'MenuPage',
        method: this.logout
      }]
    }
  },
  methods: {
    openURL,
    logout () {
      this.$dbAPI.logout(this.$store.state.sid)
      this.$store.dispatch('logout')
      this.$router.push({name: 'LoginPage'})
    },
    getScheduleMenuList () {
      let res = []
      for (let id in this.schedules) {
        let sch = this.schedules[id]
        res.push({id: `1.1.${sch.id}`, key: `sch-${sch.id}`, label: sch.name, pageName: 'ScheduleDetails', pageData: {id: sch.id}})
      }
      return res
    }
  },
  async created () {
    // check auth
    let resp = await this.$dbAPI.isAuth()
    console.log(resp)
    if (!resp.result) {
      this.logout()
    }
  }
}
</script>

<style>
</style>
