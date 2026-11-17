import { beforeEach, describe, expect, it } from 'vitest';

import { favouriteBooks, removeFavourite, toggleFavourite } from './favourites';

describe('favourites', () => {
  // Cada test empieza sin favoritos
  beforeEach(() => {
    favouriteBooks.set([]);
  });

  it('toggleFavourite() añade el libro y, si se vuelve a llamar, lo quita', () => {
    toggleFavourite('a');
    toggleFavourite('b');
    expect(favouriteBooks.get()).toEqual(['a', 'b']);

    toggleFavourite('a');
    expect(favouriteBooks.get()).toEqual(['b']);
  });

  it('removeFavourite() quita el libro y no falla si no estaba', () => {
    favouriteBooks.set(['a', 'b']);
    removeFavourite('a');
    removeFavourite('z');
    expect(favouriteBooks.get()).toEqual(['b']);
  });

  it('guarda los favoritos en localStorage para que sigan al recargar', () => {
    toggleFavourite('a');
    expect(JSON.parse(localStorage.getItem('favourite-books') ?? '[]')).toEqual(['a']);
  });
});
