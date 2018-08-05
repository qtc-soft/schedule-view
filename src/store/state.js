import { LocalStorage } from 'quasar'
let appSettings = LocalStorage.get.item('Business instruments User Settings') || {}

export default {
  //
  authenticatedData: null,
  appSettings: appSettings
}
