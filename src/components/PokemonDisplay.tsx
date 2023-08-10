import React, { useState, useEffect } from "react";

interface Pokemon {
    species: {
        name: string;
    };
    sprites: {
        other: {
            dream_world: {
                front_default: string;
            };
        };
    };
    id: number;
    height: number;
    weight: number;
    abilities: {
        ability: {
            name: string;
        };
    }[];
    stats: {
        stat: {
            name: string;
        };
        base_stat: number;
    }[];
    types: {
        type: {
            name: string;
        };
    }[];
}



export const PokemonDisplay = () => {
    const [pokemon, setPokemon] = useState <Pokemon | null> (null);

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
                <div className="pokemon-card">
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
                         <h2>
                            Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
                        </h2>
                        <h2>
                            Type: {pokemon.types.map((type) => type.type.name).join(", ")}
                        </h2>
                       
                        {pokemon.stats.map((stat) => 
                            
                            <h2> {stat.stat.name}: {stat.base_stat} </h2>
                           
                        )}
                        

                  
                     </div>
                </div>)
               
            }
                </div>
            );
                                
                                
            
};
