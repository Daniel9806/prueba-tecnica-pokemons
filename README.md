## Favorites Pokémons
Una aplicación Vue.js para gestionar tus Pokémons favoritos. Esta aplicación permite a los usuarios explorar Pokémons, añadirlos a favoritos y compartir sus estadísticas.

## Features
- Navegar por todos los Pokémons desde la PokéAPI
- Añadir/Quitar Pokémons de favoritos
- Ver información detallada de los Pokémons, incluyendo estadísticas y tipos
- Compartir estadísticas de los Pokémons por el portapapeles
- Diseño responsive con animaciones de carga
- Implementación segura de tipos usando TypeScript

## Tech Stack
Forma moderna de una aplicación web con Vue.js 3 y TypeScript.
- Vue.js 3 con TypeScript
- Composition API con script setup
- Vite como empaquetador de aplicaciones
- Pinia para el manejo de estado global
- TailwindCSS para estilos
- Axios para las llamadas a la API
- Unit testing con Vitest
- Vue Router para manejo de rutas
- Vue Toastification para notificaciones

## Architecture Decisions
1. **State Management**: Used Pinia for centralized state management to handle favorites list and loading states
2. **Type Safety**: Implemented TypeScript interfaces for Pokémon data to ensure type safety
3. **Component Structure**: Created reusable components (PokemonCard) to maintain clean code and follow DRY principles
4. **Error Handling**: Added proper error handling for API calls and user interactions
5. **Loading States**: Implemented loading animations using CSS for better UX
6. **Responsive Design**: Used CSS Grid and Flexbox for responsive layouts that work on all screen sizes

## Design Decisions
1. Used the official Pokémon API for data
2. Implemented a two-column layout with favorites on the left and all Pokémon on the right
3. Added type-specific colors for Pokémon types
4. Used a pokeball animation for loading states
5. Implemented a clean and modern UI with cards for each Pokémon

## Best Practices Followed
- SOLID principles
- KISS (Keep It Simple, Stupid)
- DRY (Don't Repeat Yourself)
- TypeScript for type safety
- Proper error handling
- Responsive design
- Clean and organized code structure
- Unit tests for critical functionality
- Proper separation of concerns
- Efficient API calls with caching where appropriate
- Loading states for better UX
- Accessible UI components
- Performance optimization with virtual scrolling for large lists

## Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development
Run the development server:
```bash
npm run dev
```

## Build
Build the application for production:
```bash
npm run build
```

## Preview
Preview the built application:
```bash
npm run preview
```

## Testing
Run unit tests:
```bash
npm run test
```