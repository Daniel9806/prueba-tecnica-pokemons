// src/services/__mocks__/pokemons.ts
import { vi } from 'vitest';

// Define default successful responses
const defaultFetchAllResponse = {
  data: {
    results: [
      { name: 'bulbasaur' },
      { name: 'charmander' },
      { name: 'squirtle' },
      { name: 'pikachu' },
    ],
    count: 100, // Total count for pagination tests
  },
};

const defaultFetchPokemonByNameResponse = (name: string) => {
  if (name.toLowerCase() === 'pikachu') {
    return {
      data: {
        name: 'pikachu',
        id: 25,
        type: 'electric',
      },
    };
  }
  if (name.toLowerCase() === 'bulbasaur') {
    return {
      data: {
        name: 'bulbasaur',
        id: 1,
        type: 'grass',
      },
    };
  }
  // Default to throwing an error if not specifically mocked for success
  // This is often better handled by a .mockImplementationOnce in the test
  throw new Error(`Pokemon ${name} not found`);
};


// Export these as vi.fn() for flexibility
export const fetchAll = vi.fn(() => defaultFetchAllResponse);
export const fetchPokemonByName = vi.fn((params: { name: string }) => defaultFetchPokemonByNameResponse(params.name));