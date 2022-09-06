import React from "react";
import { Route, Routes } from "react-router-dom";

// Views
import { PokemonDetails } from "../views/PokemonDetails";
import { PokemonList } from "../views/PokemonList";

export const AppRouter = () => {
  // const location = useLocation();

  // useLayoutEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />} />
    </Routes>
  );
};
