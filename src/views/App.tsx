import { FC, useEffect, useRef, useState } from "react";

import { UserInfo } from "@firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";

import {
  AppDescription,
  Header,
  LowerPanel,
  MiddlePanel,
  RightHeaderPart,
} from "@layouts";
import { Logo, MovieInfo, SearchBlock, SignForm, useGetGenres } from "@modules";
import { auth, setToastRef, texts } from "@lib";
import { IGenre, IMovie } from "@entities";

const App: FC = () => {
  const [movieInfo, setMovieInfo] = useState<IMovie | null>(null);
  const [genresList, setGenresList] = useState<IGenre[]>([]);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [isSignInFormOpen, setIsSignInFormOpen] = useState<boolean>(false);

  const { handleGetGenresList } = useGetGenres();

  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    setToastRef(toastRef.current);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    handleGetGenresList().then((data) => {
      setGenresList(data.genres);
    });
  }, []);

  return (
    <main>
      <Header
        leftPart={<Logo />}
        rightPart={
          <RightHeaderPart
            currentUser={currentUser}
            onClick={() => setIsSignInFormOpen(true)}
          />
        }
      />
      <AppDescription
        title={texts.app.title}
        description={texts.app.description}
      />
      <Divider />
      <MiddlePanel
        content={
          <SearchBlock onMovieChange={setMovieInfo} genresList={genresList} />
        }
      />
      <Divider />
      <LowerPanel
        content={<MovieInfo movieInfo={movieInfo} genresList={genresList} />}
      />
      <Dialog
        header={texts.app.signIn}
        visible={isSignInFormOpen}
        className="w-3"
        onHide={() => {
          setIsSignInFormOpen(false);
        }}
      >
        <SignForm onClose={() => setIsSignInFormOpen(false)} />
      </Dialog>
      <Toast ref={toastRef} />
    </main>
  );
};

export { App };
