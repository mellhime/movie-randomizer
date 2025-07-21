import { FC } from "react";
import { useFetch } from "@hooks/useFetch";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const WatchList: FC = () => {
  const [watchList] = useFetch("watchList");

  const handleClick = (id: number) => {
    console.log(id);
    // todo call api remove from watch list
  };

  const editButton = (movie) => {
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
