import React, { useState, useEffect } from "react";
import { Tag, Progress } from "antd";

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
							<div className="characteristic">
								<h3>ID</h3>
								<p>{pokemon.id}</p>
							</div>
							<div className="characteristic">
								<h3>Height</h3>
								<p>{pokemon.height}</p>
							</div>
							<div className="characteristic">
								<h3>Weight</h3>
								<p>{pokemon.weight}</p>
							</div>
							<div className="characteristic">
								<h3>Abilities</h3>
								<p>
									{pokemon.abilities.map((ability) => (
										<Tag bordered={false} color="#b5d3ab">
											{ability.ability.name.toUpperCase()}
										</Tag>
									))}
								</p>
							</div>
							<div className="characteristic">
								<h3>Type</h3>
								<p>
									{pokemon.types.map((type) => (
										<Tag color="#FFD700">{type.type.name}</Tag>
									))}
								</p>
							</div>
						</div>
						<div className="pokemon-stats">
							{pokemon.stats.map((stat) => (
								<div className="characteristic">
									<h3>{stat.stat.name}</h3>
									{stat.base_stat}{" "}
									<Progress
										percent={(stat.base_stat * 100) / 65}
										size={[300, 20]}
										showInfo={false}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
