
const routes = [
  {
    path: '/',
    component: () => import('layouts/index.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  // social pages
  { path: '/account',
    component: () => import('layouts/accountPanel'),
    children: [
      // settings
      { path: '/options', name: 'AccountOptions', component: () => import('pages/account/options'), meta: {label: 'account_settings', icon: 'settings'} },
      // instruments
      { path: '/schedule-list', name: 'ScheduleList', component: () => import('pages/account/schedule/ScheduleList'), meta: {label: 'all_schedules', icon: 'schedule'} },
      { path: '/schedule-config/:id', name: 'ScheduleConfig', component: () => import('pages/account/schedule/ScheduleConfig'), meta: {label: 'schedule_config', icon: 'schedule'} },
      { path: '/schedule/:id', name: 'Schedule', component: () => import('pages/account/schedule/Schedule'), meta: {label: 'schedule', icon: 'schedule'} },
      { path: '/social', name: 'AccountSocial', component: () => import('pages/account/social'), meta: {label: 'account_social', icon: 'social'} },
      // payment
      { path: '/payment', name: 'AccountPayment', component: () => import('pages/account/payment'), meta: {label: 'payment', icon: 'payment'} },
      // reports
      { path: '/reports', name: 'AccountReports', component: () => import('pages/account/reports'), meta: {label: 'reports', icon: 'report'} }
    ],
    meta: {label: 'account_panel'}
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
