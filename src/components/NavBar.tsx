import React from "react";
import { SearchPokemon } from "./SearchPokemon";


interface PokemonDisplayProps {
  onSearch: (value: string) => void;
}


export const NavBar: React.FC<PokemonDisplayProps> = ({ onSearch }) => {


  return (
      <div className="navbar">
          <SearchPokemon onSearch={onSearch} />
          
      </div>
  );
}
