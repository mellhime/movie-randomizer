import { FC } from "react";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { getWatchList } from "@api";
import { IMovie } from "@entities";

const WatchList: FC = () => {
  const [watchList] = getWatchList();

  const handleClick = (id: number) => {
    console.log(id);
    // todo call api remove from watch list
  };

  const editButton = (movie: IMovie) => {
    return (
      <button onClick={() => handleClick(movie.id)}>
        Remove from watch list
      </button>
    );
  };

  return (
    <>
      <DataTable value={watchList} tableStyle={{ minWidth: "50rem" }}>
        <Column field="title" header="Title" />
        <Column body={editButton} header="Edit button" className="w-10rem" />
      </DataTable>
    </>
  );
};

export { WatchList };
