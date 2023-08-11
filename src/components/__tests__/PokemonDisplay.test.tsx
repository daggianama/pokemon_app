import React from "react";
import { render, waitFor } from "@testing-library/react";
import { PokemonDisplay } from "../PokemonDisplay";
import { setupServer } from "msw/node";
import { rest } from "msw";

// Using jest and react-testing-library, to write tests for the PokemonDisplay component
// Using rest from msw, to mock the API call to the PokeAPI

const mockPokemon = {
	species: { name: "Pikachu" },
	sprites: {
		other: {
			dream_world: {
				front_default: "mockImageUrl",
			},
		},
	},
	id: 25,
	height: 40,
	weight: 60,
	abilities: [{ ability: { name: "static" } }],
	stats: [{ stat: { name: "hp" }, base_stat: 35 }],
	types: [{ type: { name: "electric" } }],
};

// To intercept and handle HTTP request
const server = setupServer(
	rest.get(
		"https://pokeapi.co/api/v2/pokemon/:name",
		(req, res, ctx) => {
			const { name } = req.params;
			return res(ctx.json(mockPokemon));
		}
	)
);

beforeAll(() => server.listen()); // Starts the mock server before all the test cases run. It ensures that the mock server is ready to intercept requests.
afterEach(() => server.resetHandlers()); // Resets any runtime request handlers that are declared in the tests. It ensures that the tests are isolated and run independently.
afterAll(() => server.close()); // Closes the server to ensure that no server is running after the tests are completed.

describe("PokemonDisplay Component", () => {
	it("renders without crashing", () => {
		render(<PokemonDisplay />);
	});

	it("displays the Pokemon name correctly", async () => {
		const { getByText } = render(<PokemonDisplay />);

		// Since the API call is asynchronous, we wait for it to finish before making assertions
		await waitFor(() => {
			const pokemonName = getByText(/Pikachu/i);
			expect(pokemonName).toBeInTheDocument();
			expect(pokemonName).toHaveTextContent("Pikachu");
			expect(pokemonName).toHaveTextContent(/Pikachu/i);
		});
	});

	it("displays the Pokemon image correctly", async () => {
		const { getByAltText } = render(<PokemonDisplay />);

		await waitFor(() => {
			const pokemonImage = getByAltText("pokemon");
            expect(pokemonImage).toBeInTheDocument();
            expect(pokemonImage).toHaveAttribute("src", "mockImageUrl");
		});
	});

	it("displays the Pokemon ID correctly", async () => {
		const { getByText } = render(<PokemonDisplay />);

        await waitFor(() => {
            const pokemonId = getByText(/25/i);
            expect(pokemonId).toBeInTheDocument();
          });
	});

	it("displays the Pokemon abilities correctly", async () => {
		const { getByText } = render(<PokemonDisplay />);

		await waitFor(() => {
			mockPokemon.abilities.forEach((ability) => {
				const abilityName = getByText(ability.ability.name);
				expect(abilityName).toBeInTheDocument();
			});
		});
	});

	it("displays the Pokemon height and weight correctly", async () => {
		const { getByText } = render(<PokemonDisplay />);

		await waitFor(() => {
            const pokemonHeight = getByText(/40/i);
            const pokemonWeight = getByText(/60/i);
			expect(pokemonHeight).toBeInTheDocument();
			expect(pokemonWeight).toBeInTheDocument();
		});
	});



	it("displays the Pokemon types correctly", async () => {
		const { getByText } = render(<PokemonDisplay />);

		await waitFor(() => {
			mockPokemon.types.forEach((type) => {
				const typeName = getByText(type.type.name);
				expect(typeName).toBeInTheDocument();
			});
		});
    });
    
    it("displays the Pokemon stats correctly", async () => {
		const { getByText } = render(<PokemonDisplay />);

		await waitFor(() => {
			mockPokemon.stats.forEach((stat) => {
				const statName = getByText(stat.stat.name);
				const statValue = getByText(stat.base_stat);
				expect(statName).toBeInTheDocument();
				expect(statValue).toBeInTheDocument();
			});
		});
	});
});
