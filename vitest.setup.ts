import { beforeAll } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

beforeAll(() => {
  setActivePinia(createPinia());
});