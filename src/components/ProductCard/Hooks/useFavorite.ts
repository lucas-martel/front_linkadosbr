import { useState } from "react";
import serviceFavorite from "../Services/service.favorite";

interface Prop {
  name: string;
}

const useFavorite = ({ name }: Prop) => {
  const { setFavoriteOnLocalStorage, isFavoriteOnLocalStorage } =
    serviceFavorite();

  const [isFavorite, setIsFavorite] = useState(isFavoriteOnLocalStorage(name));

  const onClickFavorite = () => {
    setFavoriteOnLocalStorage(name, !isFavorite);
    setIsFavorite((prev) => !prev);
  };

  return {
    isFavorite,
    onClickFavorite,
  };
};

export default useFavorite;
