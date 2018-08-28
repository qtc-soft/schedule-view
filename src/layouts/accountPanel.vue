<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="showLeftPanel = !showLeftPanel"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <!-- q-btn
          flat
          dense
          round
          @click="$router.back()"
          v-if="menuItem && menuItem.id.includes('.')"
        >
          <q-icon name="arrow_back" />
        </q-btn -->
        <q-toolbar-title>
          {{$t(this.$route.meta.label)}}
          <div slot="subtitle">{{$t(this.$route.meta.sublabel)}}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="showLeftPanel"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-scroll-area class="full-width full-height">
        <expand-menu :data="menuLeftPanel"></expand-menu>
      </q-scroll-area>
    </q-layout-drawer>

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
      menuItem: store => store.menu_item,
      schedules: store => store.schedules
    }),
    menuLeftPanel () {
      return [{
        id: '-1',
        key: 'home',
        label: this.$t('home'),
        pageName: 'IndexPage'
      }, {
        id: '0',
        key: 'options',
        label: this.$t('account_settings'),
        pageName: 'AccountOptions'
      }, {
        id: '1',
        key: 'instruments',
        label: this.$t('instruments'),
        expanded: false,
        items: [
          {
            id: '1.1',
            key: 'schedules',
            label: this.$t('all_schedules'),
            pageName: 'ScheduleList',
            items: this.getScheduleMenuList()
          }, {
            id: '1.2',
            key: 'social',
            label: this.$t('publish'),
            pageName: 'AccountSocial'
          }
        ]
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
      }]
    }
  },
  methods: {
    openURL,
    logout () {
      this.$dbAPI.logout(this.$store.state.sid)
      this.$store.dispatch('logout')
    },
    getScheduleMenuList () {
      let res = []
      for (let id in this.schedules) {
        let sch = this.schedules[id]
        res.push({id: `1.1.${sch.id}`, label: sch.name, pageName: 'Schedule', pageData: {id: sch.id}})
      }
      return res
    }
  },
  async mounted () {
    let sheduleItems = await this.$dbAPI.getSchedules()
    if (sheduleItems && sheduleItems.result) {
      this.$store.commit('INIT_ITEMS', {type: 'shedules', items: sheduleItems.result})
    } else {
      // this.logout()
    }
  }
}
</script>

<style>
</style>
