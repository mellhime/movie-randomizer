import { useEffect, useState } from "react";
interface IMovie {
  title: string;
  id: number;
}

const movies = [
  { title: "Leon", id: 1 },
  { title: "Neon Genesis Evangelion", id: 2 },
  { title: "2012", id: 3 },
];

export function useFetch(path = ""): [IMovie[], () => void] {
  const [data, setData] = useState([]);

  const fetchData = () => {
    console.log(path);
    // TODO fetching from api using path
    setData(movies);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [data, fetchData];
}
