
const routes = [
  {
    path: '/',
    component: () => import('layouts/layout.vue'),
    children: [
      { path: '/', component: () => import('pages/clientes.vue') },
      { path: '/help', component: () => import('pages/ayuda.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/_404.vue')
  }
]

export default routes
