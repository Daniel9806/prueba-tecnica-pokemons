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
- Composition API con <script setup>
- Vite como empaquetador de aplicaciones
- Pinia para el manejo de estado global
- TailwindCSS para estilos
- Axios para las llamadas a la API
- Unit testing con Vitest
- Vue Router para manejo de rutas
- Vue Toastification para notificaciones

## Architecture Decisions
1. **State Management**: Se utilizó Pinia para la gestión centralizada de estados para manejar la lista de favoritos, la lista de Pokémons y los estados de carga. 
2. **Type Safety**: TypeScript para garantizar un codigo mas seguro y evitar errores.
3. **Component Structure**: Se crearon componentes reutilizables para mantener un código limpio y seguir el principio DRY.
4. **Error Handling**: Se agregó manejo adecuado de errores para las llamadas a la API y las interacciones del usuario.
5. **Loading States**: Se implementaron animaciones de carga usando CSS para una mejor experiencia del usuario.
6. **Responsive Design**: Flexbox con tailwindCSS para layouts responsivos que funcionan en todos los tamaños de pantalla.
7. **Pagination**: Se implementó paginación para el listado de Pokémons. Se limita la cantidad de Pokémons por página para mejorar el rendimiento.

## Design Decisions
1. Se utilizó la API oficial de Pokémon v2 para los datos
2. Se utilizaron los colores especificados en el diseño 
3. Se utilizó una animación de pokeball para los estados de carga
4. Se implementó una interfaz moderna y limpia

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