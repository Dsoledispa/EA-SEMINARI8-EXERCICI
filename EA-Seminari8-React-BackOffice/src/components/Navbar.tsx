import { useStore } from '@nanostores/react';
import { Link, NavLink } from 'react-router-dom';

import { favouriteBooks } from '../stores/favourites';

export function Navbar() {
  // La navbar no tiene nada que ver con las listas de libros, pero lee el mismo store:
  // al marcar una estrella en cualquier pantalla, el contador se actualiza solo
  const favourites = useStore(favouriteBooks);

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        Backoffice
      </Link>

      {/* NavLink le pone la clase "active" al enlace de la página en la que estoy */}
      <nav>
        <NavLink to="/authors">Autores</NavLink>
        <NavLink to="/books">Libros</NavLink>
        <NavLink to="/favourites">Favoritos ({favourites.length})</NavLink>
      </nav>
    </header>
  );
}
