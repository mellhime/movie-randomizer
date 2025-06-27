import { SearchBlock } from "./pages/SearchBlock";
import { MovieInfo } from "./pages/SearchBlock/MovieInfo";
import { Header } from "./pages/Header";

export function MovieRandomizer() {
  return (
    <main>
      <Header />
      <SearchBlock />
      <MovieInfo />
    </main>
  );
}
