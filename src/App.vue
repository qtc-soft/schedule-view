<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.loadFromCookieToStore()
  }
}
</script>

<style>
</style>
