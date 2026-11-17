import { useStore } from '@nanostores/react';
import { Link } from 'react-router-dom';

import { useApiList } from '../hooks/useApiList';
import { bookService } from '../services/book.service';
import { favouriteBooks } from '../stores/favourites';
import { formatPrice, languageName } from '../utils/format';
import { FavouriteButton } from './FavouriteButton';

// Pantalla con solo los libros marcados como favoritos.
// Pido todos los libros a la API (como en BooksList) y me quedo con los que están en el store.
export function FavouritesList() {
  const favourites = useStore(favouriteBooks);
  const { items: books, loading, error } = useApiList(bookService.getBooks);

  // Como `favourites` viene de useStore, al quitar una estrella esta lista se recalcula sola
  // y el libro desaparece de la pantalla
  const favouriteList = books.filter((book) => favourites.includes(book._id));

  return (
    <>
      <div className="page-header">
        <h1>Libros favoritos</h1>
        <Link className="button secondary" to="/books">
          Ver todos los libros
        </Link>
      </div>

      {error && <p className="alert">{error}</p>}

      {loading && <p className="muted">Cargando...</p>}

      {!loading && !error && (
        <div className="cards">
          {favouriteList.map((book) => (
            <article key={book._id} className="card">
              <img
                className="card-cover"
                src={`https://picsum.photos/seed/${book._id}/400/240`}
                alt={`Portada de ${book.title}`}
              />
              <div className="card-body">
                <h3>{book.title}</h3>
                <span className="muted">
                  {book.authors.length > 0 ? book.authors.map((author) => author.name).join(', ') : 'Sin autores'}
                </span>
                <span>
                  {languageName(book.language)}
                  {book.publishedYear && ` · ${book.publishedYear}`}
                </span>
                <strong>{formatPrice(book.price)}</strong>
              </div>
              <div className="card-actions">
                <FavouriteButton bookId={book._id} />
                <Link className="button secondary" to={`/books/${book._id}/edit`}>
                  Editar
                </Link>
              </div>
            </article>
          ))}
          {favouriteList.length === 0 && (
            <p className="muted cards-empty">
              Todavía no tienes libros favoritos. Márcalos con la estrella desde la{' '}
              <Link to="/books">lista de libros</Link>.
            </p>
          )}
        </div>
      )}
    </>
  );
}
