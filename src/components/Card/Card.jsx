import React from "react";
import { pokeCard, pokeInfo, pokeType, pokeImage } from "./Card.module.css";

function Card({ name, image, types, id }) {
  return (
    <div className={pokeCard}>
      <div className={pokeInfo}>
        <h3>{name}</h3>
        <div className={pokeType}>
          <span>Type:</span>
          {types.map((t, i) => (
            <span key={i}> {t.name} </span>
          ))}
        </div>
      </div>

      <img
        src={
          image
            ? image
            : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/back/25.png"
        }
        alt="img not found"
        width="300px"
        height="350px"
        className={pokeImage}
      />
    </div>
  );
}

export default Card;
