import React, { useState, useEffect } from "react";
import { Tag, Progress } from "antd";

interface Ability {
    ability: {
      name: string;
    };
  }
  
  interface Type {
    type: {
      name: string;
    };
  }
  
  interface Stat {
    stat: {
      name: string;
    };
    base_stat: number;
  }
  
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
    abilities: Ability[];
    stats: Stat[];
    types: Type[];
  }

export const PokemonDisplay: React.FC = () => {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);

	const getPokemon = async () => {
		try {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon/jigglypuff`
			);
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
    
    function capitalizeFirstLetter(str : string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

	return (
		<div>
			{pokemon && (
				<div className="pokemon-card">
					<div className="pokemon-header">
						<h1>{pokemon.species.name.toUpperCase()}</h1>
						<img
							src={pokemon.sprites.other.dream_world.front_default}
							alt="pokemon"
						/>
					</div>

					<div className="pokemon-body">
						<div className="pokemon-info">
							<table className="pokemon-table">
								<tr>
									<td>
										<h3>ID</h3>
									</td>
                                    <td>
                                        <p>{pokemon.id}</p>
                                    </td>
								</tr>
								<tr>
									<td>
										<h3>Height</h3>
									</td>
                                    <td>
                                        <p>{pokemon.height}</p>
                                    </td>
								</tr>
								<tr>
									<td>
										<h3>Weight</h3>
									</td>
                                    <td>
                                        <p>{pokemon.weight}</p>
                                    </td>
								</tr>
								<tr>
									<td>
										<h3>Abilities</h3>
									</td>

									<td className="abilities">
										{pokemon.abilities.map((ability) => (
											<Tag bordered={false} color="#b5d3ab">
												{ability.ability.name}
											</Tag>
										))}
									</td>
								</tr>
								<tr>
									<td>
										<h3>Type</h3>
									</td>
									<td className="types">
										{pokemon.types.map((type) => (
                                            <Tag className="types-tag" color="#ac83c9">
                                                {type.type.name}</Tag>
										))}
									</td>
								</tr>
							</table>
						</div>

						<div className="pokemon-stats">
							<table className="stats-table">
								
									{pokemon.stats.map((stat) => (
										<tr >
											<td>
												<h3>{capitalizeFirstLetter(stat.stat.name)}</h3>
											</td>
											<td>
                                                <p>{stat.base_stat}</p>
                                            </td>
                                            <td>
												<Progress
													percent={(stat.base_stat * 100) / 65}
													size={[210, 17]}
													showInfo={false}
												/>
											</td>
										</tr>
									))}
							</table>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
