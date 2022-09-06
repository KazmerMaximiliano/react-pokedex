import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pokeball } from "../components/Pokeball";

export const PokemonDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPokemon(data);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div>
      {!isLoading && pokemon !== null ? (
        <div className="pokemon-card">
          <div className="pokemon-image">
            <img
              src={
                pokemon.sprites.front_default ??
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png"
              }
              alt={pokemon.name}
            />
          </div>
          <div className="pokemon-name">{`${pokemon.name[0].toUpperCase()}${pokemon.name.substring(
            1
          )}`}</div>
        </div>
      ) : (
        <Pokeball />
      )}
    </div>
  );
};
