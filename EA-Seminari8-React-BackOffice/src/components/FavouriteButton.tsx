import { useStore } from '@nanostores/react';

import { favouriteBooks, toggleFavourite } from '../stores/favourites';

interface FavouriteButtonProps {
  bookId: string;
}

// Estrella para marcar y desmarcar un libro como favorito.
// No recibe el estado por props: lo lee directamente del store, así cualquier pantalla
// puede ponerlo y todas se enteran cuando cambia.
export function FavouriteButton({ bookId }: FavouriteButtonProps) {
  const favourites = useStore(favouriteBooks);
  const isFavourite = favourites.includes(bookId);
  const label = isFavourite ? 'Quitar de favoritos' : 'Añadir a favoritos';

  return (
    <button
      type="button"
      className={isFavourite ? 'favourite active' : 'favourite'}
      aria-pressed={isFavourite}
      aria-label={label}
      title={label}
      onClick={() => toggleFavourite(bookId)}
    >
      {isFavourite ? '★' : '☆'}
    </button>
  );
}
