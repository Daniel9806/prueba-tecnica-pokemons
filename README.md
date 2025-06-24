# Pokémon Favorites

A Vue.js application for managing favorite Pokémon. This application allows users to browse Pokémon, add them to favorites, and share their stats.

## Features

- Browse all Pokémon from the PokéAPI
- Add/Remove Pokémon from favorites
- View detailed Pokémon information including stats and types
- Share Pokémon stats via clipboard
- Responsive design with loading animations
- Type-safe implementation using TypeScript

## Tech Stack

- Vue.js 3 with TypeScript
- Pinia for state management
- Axios for API calls
- Vite as build tool
- Unit testing with Vitest

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
