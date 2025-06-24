import { createRouter, createWebHistory } from 'vue-router'
import WelcomeView from '@/views/WelcomeView.vue'
import PokemonListView from '@/views/PokemonListView.vue'
import PokemonDetailsView from '@/views/PokemonDetailsView.vue'
import FavoritePokemonView from '@/views/FavoritePokemonView.vue'
import EmptyListView from '@/views/EmptyListView.vue' // For P3-EmptyList

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
      path: '/pokemon/:name',
      name: 'pokemon-details',
      component: PokemonDetailsView,
      props: true // Allows passing route params as props to the component
    },
    {
      path: '/empty', // A route for the empty state
      name: 'empty-list',
      component: EmptyListView
    },
    // Optional: A catch-all route for 404
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ]
})

export default router