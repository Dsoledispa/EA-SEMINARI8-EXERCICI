import { atom } from 'nanostores';

// Libros favoritos, compartidos entre componentes con Nanostores (igual que viewMode.ts).
// Solo guardo los ids: los datos del libro se piden siempre a la API, así si alguien edita
// un libro, en favoritos sale ya con los datos nuevos.
const STORAGE_KEY = 'favourite-books';

function loadFavourites(): string[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    // Por si en localStorage hay algo raro, me quedo solo con los textos
    return Array.isArray(saved) ? saved.filter((id) => typeof id === 'string') : [];
  } catch {
    // localStorage no disponible o JSON roto: se empieza sin favoritos
    return [];
  }
}

export const favouriteBooks = atom<string[]>(loadFavourites());

// Cada vez que cambian los favoritos los guardo en el navegador, así al recargar siguen ahí
favouriteBooks.listen((ids) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // da igual si no se puede guardar
  }
});

// Si el libro ya era favorito lo quito, y si no lo añado.
// Siempre creo un array nuevo (no uso push ni splice): si el array fuera el mismo,
// Nanostores no se daría cuenta del cambio y los componentes no se volverían a pintar.
export function toggleFavourite(bookId: string) {
  const ids = favouriteBooks.get();
  if (ids.includes(bookId)) {
    favouriteBooks.set(ids.filter((id) => id !== bookId));
  } else {
    favouriteBooks.set([...ids, bookId]);
  }
}

// Para cuando se borra un libro: que no se quede como favorito un libro que ya no existe
export function removeFavourite(bookId: string) {
  favouriteBooks.set(favouriteBooks.get().filter((id) => id !== bookId));
}
