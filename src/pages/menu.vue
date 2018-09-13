<template>
  <div class="row menu-panel">
    <div class="col-6 q-pa-sm" v-for="md in menuData" :key="md.key">
      <q-card class="full-width relative-position full-height bg-white cursor-pointer" @click.native="onMenuClick(md)">
        <q-card-main style="position: relative; top: 50%;">
          <div class="column items-center" style="height: 100px; margin-top: -50px">
            <div class="q-title text-primary">{{md.label}}</div>
            <q-icon class="menu-icon" :name="md.key" size="60px"/>
          </div>
        </q-card-main>
        <q-card-actions class="absolute-bottom" align="end">
          <q-icon class="menu-icon" name="keyboard_arrow_right" size="30px"/>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {
      menuData: [{
        id: '0',
        key: 'settings',
        label: this.$t('settings'),
        pageName: 'ConfigPage'
      }, {
        id: '1',
        key: 'schedule',
        label: this.$t('schedules'),
        // sublabel: `${this.$t('total')}: ${this.schedules ? Object.keys(this.schedules).length : 0}`,
        pageName: 'ScheduleList',
        expanded: false
        // items: this.getScheduleMenuList()
      }, {
        id: '2',
        key: 'payment',
        label: this.$t('payment'),
        pageName: 'AccountPayment'
      }, {
        id: '3',
        key: 'description',
        label: this.$t('reports'),
        pageName: 'AccountReports'
      }]
    }
  },
  methods: {
    onMenuClick (menuItem) {
      this.$router.push({name: menuItem.pageName, params: menuItem.pageData})
      if (menuItem.method) {
        menuItem.method.call()
      }
      this.$store.commit('MENU_ITEM', menuItem)
    }
  }
}
</script>

<style lang="stylus">
  @import '~variables'
  .menu-panel {
    background-color: $primary-light;
  }
  .menu-icon {
    color: $primary-dark;
  }
</style>
