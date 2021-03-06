
const routes = [
  {
    path: '/',
    component: () => import('layouts/index.vue'),
    redirect: {name: 'LoginPage'},
    children: [
      // { path: '', name: 'IndexPage', component: () => import('pages/Index.vue') },
      { path: '/login', name: 'LoginPage', component: () => import('pages/auth/Login.vue') },
      { path: '/registration', name: 'RegistrationPage', component: () => import('pages/auth/Registration.vue') },
      { path: '/restore_pass', name: 'RestorePassPage', component: () => import('pages/auth/Restore.vue') }
    ]
  },
  // social pages
  { path: '/panel',
    component: () => import('layouts/accountPanel'),
    children: [
      { path: '', name: 'MenuPage', component: () => import('pages/menu'), meta: {label: 'panel'} },
      // settings
      { path: '/config', name: 'ConfigPage', component: () => import('pages/account/settings/config'), meta: {label: 'account_settings', icon: 'settings', back: true} },
      // instruments
      { path: '/schedule-list', name: 'ScheduleList', component: () => import('pages/account/schedule/ScheduleList'), meta: {label: 'all_schedules', icon: 'schedule', back: true} },
      { path: '/schedule-config/:id', name: 'ScheduleConfig', component: () => import('pages/account/schedule/ScheduleConfig'), meta: {label: 'schedule_config', icon: 'schedule', back: true} },
      { path: '/schedule-create', name: 'ScheduleCreate', component: () => import('pages/account/schedule/ScheduleCreate'), meta: {label: 'schedule_create', icon: 'schedule', back: true} },
      { path: '/schedule-details/:id', name: 'ScheduleDetails', component: () => import('pages/account/schedule/ScheduleDetails'), meta: {label: 'schedule_details', icon: 'schedule', back: true} },
      { path: '/social', name: 'AccountSocial', component: () => import('pages/account/social'), meta: {label: 'account_social', icon: 'social'} },
      // payment
      { path: '/payment', name: 'AccountPayment', component: () => import('pages/account/payment'), meta: {label: 'payment', icon: 'payment'} },
      // reports
      { path: '/reports', name: 'AccountReports', component: () => import('pages/account/reports'), meta: {label: 'reports', icon: 'report'} }
    ],
    meta: {label: 'account_settings'}
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
