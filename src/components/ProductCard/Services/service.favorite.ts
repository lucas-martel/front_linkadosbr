const serviceFavorite = () => {
  const setFavoriteOnLocalStorage = (savedName: string, isSave: boolean) => {
    const nameOnLS = `fav-${savedName}`;
    if (isSave) {
      localStorage.setItem(nameOnLS, "");
    } else if (localStorage.getItem(nameOnLS) !== null) {
      localStorage.removeItem(nameOnLS);
    }
  };

  const isFavoriteOnLocalStorage = (savedName: string): boolean => {
    const nameOnLS = `fav-${savedName}`;
    return localStorage.getItem(nameOnLS) !== null;
  };

  return {
    setFavoriteOnLocalStorage,
    isFavoriteOnLocalStorage,
  };
};

export default serviceFavorite;
