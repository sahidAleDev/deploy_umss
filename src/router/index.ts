import { createRouter, createWebHistory } from 'vue-router'
import PinLogin from '../views/PinLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:idUltra',
      name: 'pin-loign',
      component: PinLogin
    }, 
    {
      path: '/ultrasonido',
      name: 'ultrasonido',
      component: () => import('../views/UltrasonidoView.vue')
    }
  ]
})

export default router
