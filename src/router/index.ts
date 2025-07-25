import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import PokemonListView from '@/views/PokemonListView.vue'
import FavoritePokemonView from '@/views/FavoritePokemonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView
    },
    {
      path: '/pokemon',
      name: 'pokemon-list',
      component: PokemonListView
    },
    {
      path: '/pokemon/favorites',
      name: 'favorite-pokemon',
      component: FavoritePokemonView
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

export default router