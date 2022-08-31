import React, { useEffect, useState } from "react";
import { Pokeball } from "../components/Pokeball";

export const PokemonList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}`)
        .then((response) => response.json())
        .then((data) => {
          let pokemonList = data.results.map((e) => {
            return {
              name: e.name,
              image: null,
              url: e.url,
            };
          });

          setPokemons(pokemonList);
          setIsLoading(false);
        });
    }, 2000);
  }, [page]);

  useEffect(() => {
    pokemons.forEach((e) => {
      if (e.image === null) {
        fetch(e.url)
          .then((response) => response.json())
          .then((data) => {
            let auxPokemons = [...pokemons];
            let pokemonIndex = auxPokemons.indexOf(e);
            auxPokemons[pokemonIndex].image = data.sprites.front_default;

            setPokemons(auxPokemons);
          });
      }
    });
  }, [pokemons]);

  return isLoading ? (
    <Pokeball />
  ) : (
    <>
      <div className="pokemon-list">
        {pokemons.map((e, idx) => {
          return (
            <div key={idx} className="pokemon-card">
              <div className="pokemon-image">
                <img
                  src={
                    e.image ??
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png"
                  }
                  alt={e.name}
                />
              </div>
              <div className="pokemon-name">{`${e.name[0].toUpperCase()}${e.name.substring(
                1
              )}`}</div>
            </div>
          );
        })}
      </div>
      <div className="load-more-container">
        <button
          onClick={() => {
            if (page > 0) {
              setPage(page - 1);
            }
          }}
        >
          Prev
        </button>
        {page + 1}
        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};
