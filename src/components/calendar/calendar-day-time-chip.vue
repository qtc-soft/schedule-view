<template>
  <div class="calendar-day-time-chip cursor-pointer" @click="onChipClick" style="min-width: 74px;max-width: 74px">
    <div class="calendar-day-time-chip-time row inline items-center full-width">
      <div class="col" style="padding: 0 5px">{{title}}</div>
      <div class="col text-right" style="min-width: 24px; max-width: 24px"><q-icon class="calendar-day-time-chip-remove " size="24px" name="clear" @click.native="onChipRemoveClick"/></div>
    </div>
    <div class="calendar-day-time-chip-members full-width bg-primary"></div>
  </div>
</template>

<script>
import { date } from 'quasar'
export default {
  props: ['dayTimeInfo'],
  name: 'calendar-day-time-chip',
  computed: {
    time () {
      return (this.dayTimeInfo || {}).time
    },
    title () {
      return date.formatDate(this.time, 'HH:mm')
    }
  },
  methods: {
    onChipClick () {
      this.$emit('select', this.dayTimeInfo)
    },
    onChipRemoveClick () {
      this.$emit('remove', this.dayTimeInfo)
    }
  }
}
</script>

<style lang="stylus">
  @import '~variables'
  .calendar-day-time-chip {
    margin-right: 10px;
    border: 1px solid lightgrey;
  }
  .calendar-day-time-chip:hover {
    border: 1px solid $primary
  }
  .calendar-day-time-chip-time {
    margin: 5px 5px 0 5px;
    padding-bottom: 5px;
  }
  .calendar-day-time-chip-members {
    height: 3px;
  }
  .calendar-day-time-chip-remove:hover {
    color: red
  }
</style>
