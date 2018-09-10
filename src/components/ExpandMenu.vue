<template>
  <div>
    <div v-for="menuItem in data" :key="menuItem.id">
      <q-item :class="`cursor-pointer ${menuItem.key === activeMenuItem.key ? 'text-primary' : ''}`" @click.native="onMenuClick(menuItem)">
        <q-item-side right style="min-width: 15px">
          <q-icon v-if="menuItem.items" :name="(menuItem.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down')"/>
        </q-item-side>
        <q-item-main
          class="cursor-pointer"
          :label="menuItem.label"
          :sublabel="menuItem.sublabel"
        />
      </q-item>
      <expand-menu v-if="menuItem.items && menuItem.items.length && menuItem.expanded" class="q-pl-md"  :data="menuItem.items"/>
    </div>
  </div>
</template>

<script>
import ExpandMenu from './ExpandMenu'

export default {
  name: 'expand-menu',
  components: {
    ExpandMenu
  },
  props: {
    data: {
      type: Array,
      required: true,
      validator: v => v.every(o => 'label' in o)
    }
  },
  computed: {
    activeMenuItem () {
      return this.$store.state.menu_item || {}
    }
  },
  methods: {
    onMenuClick (menuItem) {
      menuItem.expanded = !menuItem.expanded
      this.$router.push({name: menuItem.pageName, params: menuItem.pageData})
      this.$store.commit('MENU_ITEM', menuItem)
      if (menuItem.method) {
        menuItem.method.call()
      }
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>

</style>
