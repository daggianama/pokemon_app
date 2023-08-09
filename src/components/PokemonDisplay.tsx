import React, { useState, useEffect } from "react";

export const PokemonDisplay = () => {
    const [pokemon, setPokemon] = useState<any>(null);

    const getPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/jigglypuff`);
            const data = await response.json();
            data && setPokemon(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPokemon();
    }, []);

    return (
        <div>
            {pokemon && (
                <div>
                    <div className="pokemon-header">
                    <h1>{pokemon.species.name.toUpperCase()}</h1>
                    <img src={pokemon.sprites.other.dream_world.front_default } alt="pokemon" />
                    </div>
                    <div className="pokemon-body">
                        <h2>
                            ID: {pokemon.id}
                        </h2>
                        <h2>
                            Height: {pokemon.height}
                        </h2>
                        <h2>
                            Weight: {pokemon.weight}
                        </h2>
                        {/* <h2>
                            Abilities: {pokemon.abilities}
                        </h2>
                        <h2>
                            Type: {pokemon.type}
                        </h2>
                  */}
                     </div>
                </div>)
               
            }
                </div>
            );
                                
                                
            
};
