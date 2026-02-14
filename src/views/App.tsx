import { FC, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import { UserInfo } from "@firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

import { AppDescription, Header, LowerPanel, MiddlePanel } from "@layouts";
import {
  Logo,
  MovieInfo,
  SearchBlock,
  SignFormDialog,
  useGetGenres,
  WatchListButton,
} from "@modules";
import { auth, signout, texts } from "@lib";
import { IGenre, IMovie } from "@entities";

const App: FC = () => {
  const [movieInfo, setMovieInfo] = useState<IMovie | null>(null);
  const [genresList, setGenresList] = useState<IGenre[]>([]);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [isSignInFormOpen, setIsSignInFormOpen] = useState<boolean>(false);

  const { handleGetGenresList } = useGetGenres();

  const rightHeaderPart = () => {
    return (
      <div className="flex gap-2">
        {currentUser && <WatchListButton />}
        <Button
          className="p-button-secondary mb-2 md:mb-0"
          label={currentUser ? texts.app.signOut : texts.app.signIn}
          onClick={currentUser ? signout : () => setIsSignInFormOpen(true)}
        />
      </div>
    );
  };

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
  });

  useEffect(() => {
    handleGetGenresList().then((data) => {
      setGenresList(data.genres);
    });
  }, []);

  return (
    <main>
      <Header leftPart={<Logo />} rightPart={rightHeaderPart()} />
      <AppDescription
        title={texts.app.title}
        description={texts.app.description}
      />
      <Divider></Divider>
      <MiddlePanel
        content={
          <SearchBlock onMovieChange={setMovieInfo} genresList={genresList} />
        }
      />
      <Divider></Divider>
      <LowerPanel
        content={<MovieInfo movieInfo={movieInfo} genresList={genresList} />}
      />
      {isSignInFormOpen && (
        <SignFormDialog onClose={() => setIsSignInFormOpen(false)} />
      )}
      <ToastContainer />
    </main>
  );
};

export { App };
