
const routes = [
  {
    path: '/',
    component: () => import('layouts/layout.vue'),
    children: [
      { path: '/', component: () => import('pages/clientes.vue') },
      { path: '/clientes/:id', component: () => import('pages/viewcliente.vue') },
      { path: '/clientes/:cid/pacientes/:pid', component: () => import('pages/viewpaciente.vue') },
      { path: '/clientes/:cid/pacientes/:pid/entradas/:eid', component: () => import('pages/viewentrada.vue') },
      { path: '/buscador', component: () => import('pages/buscador.vue') },
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
