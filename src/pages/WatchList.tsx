import { FC } from "react";
import { useFetch } from "../hooks/useFetch";

const WatchList: FC = () => {
  const [watchList] = useFetch("watchList");

  const handleClick = (id: number) => {
    console.log(id);
    // todo call api remove from watch list
  };

  const tableBody = watchList.map((movie) => (
    <tr key={movie.id}>
      <td>{movie.title}</td>
      <td>
        <button onClick={() => handleClick(movie.id)}>
          Remove from watch list
        </button>
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
    </>
  );
};

export { WatchList };
