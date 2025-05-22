import { FC, useState } from "react";
import { useFetch } from "./useFetch";

const Favorites: FC = () => {
  const [favoritesList, setFavoritesList] = useState([]);
  const [moviesList] = useFetch("movies");

  const handleClick = (id: number) => {
    if (favoritesList.indexOf(id) == -1) {
      setFavoritesList([...favoritesList, id]);
    } else {
      setFavoritesList(favoritesList.filter((item) => item !== id));
    }
  };

  const tableBody = moviesList.map((movie) => (
    <tr key={movie.id}>
      <td>{movie.title}</td>
      <td>
        <button onClick={() => handleClick(movie.id)}>Add to favorites</button>
      </td>
    </tr>
  ));

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Название фильма</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
      <br />
      <p data-testid="count">Count: {favoritesList.length}</p>
    </>
  );
};

export { Favorites };
