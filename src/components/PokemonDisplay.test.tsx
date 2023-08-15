// import { render, screen,  waitFor } from "@testing-library/react";
// import { PokemonDisplay } from "../PokemonDisplay";
// import { setupServer } from "msw/node";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
// import { rest } from "msw";

// // Using jest and react-testing-library, to write tests for the PokemonDisplay component
// // Using rest from msw, to mock the API call to the PokeAPI

// const mockPokemon = {
// 	species: { name: "pikachu" },
// 	sprites: {
// 		other: {
// 			dream_world: {
// 				front_default: "mockImageUrl",
// 			},
// 		},
// 	},
// 	id: 25,
// 	height: 40,
// 	weight: 60,
// 	abilities: [{ ability: { name: "static" } }],
// 	stats: [{ stat: { name: "hp" }, base_stat: 35 }],
// 	types: [{ type: { name: "electric" } }],
// };

// // To intercept and handle HTTP request
// const server = setupServer(
// 	rest.get(
// 		"https://pokeapi.co/api/v2/pokemon/:name",
// 		(_, res, ctx) => {
// 			return res(ctx.json(mockPokemon));
// 		}
// 	)
// );

// beforeAll(() => server.listen()); // Starts the mock server before all the test cases run. It ensures that the mock server is ready to intercept requests.
// afterEach(() => server.resetHandlers()); // Resets any runtime request handlers that are declared in the tests. It ensures that the tests are isolated and run independently.
// afterAll(() => server.close()); // Closes the server to ensure that no server is running after the tests are completed.

// describe("PokemonDisplay Component", () => {
// 	it("renders without crashing", () => {
// 		render(
// 			<PokemonDisplay />
//         );
//         expect(screen.getByText(/:name/i)).toBeInTheDocument();
// 	});

// 	it("displays the Pokemon name correctly", async () => {
// 		const { getByText } = render(
// 			<MemoryRouter initialEntries={["/pokemon/pikachu"]}>
// 				<Routes>
//                 <Route path="/pokemon/:name" element={<PokemonDisplay />} /> 
// 				</Routes>
// 			</MemoryRouter>
// 		);

// 		await waitFor(() => {
// 			const pokemonName = getByText(/PIKACHU/i);

// 			expect(pokemonName).toBeInTheDocument();
// 			expect(pokemonName).toHaveTextContent("PIKACHU");
// 		});
// 	});

// 	it("displays the Pokemon image correctly", async () => {
// 		const { getByAltText } = render(
// 			<MemoryRouter initialEntries={["/pokemon/pikachu"]}>
// 				<Routes>
// 					<Route path="/pokemon/:name" element={<PokemonDisplay />} /> 
// 				</Routes>
// 			</MemoryRouter>
// 		);

// 		await waitFor(() => {
// 			const pokemonImage = getByAltText(/pikachu/i);
// 			expect(pokemonImage).toBeInTheDocument();
// 			expect(pokemonImage).toHaveAttribute("src", "mockImageUrl");
// 		});
// 	});

// 	it("displays the Pokemon ID correctly", async () => {
// 		const { getByText } = render(
// 			<MemoryRouter initialEntries={["/pokemon/pikachu"]}>
// 				<Routes>
// 					<Route path="/pokemon/:name" element={<PokemonDisplay />} /> 
// 				</Routes>
// 			</MemoryRouter>
// 		);

// 		await waitFor(() => {
// 			const pokemonId = getByText(/25/i);
// 			expect(pokemonId).toBeInTheDocument();
// 		});
// 	});

// 	it("displays the Pokemon abilities correctly", async () => {
// 		const { getByText } = render(
// 			<MemoryRouter initialEntries={["/pokemon/pikachu"]}>
// 				<Routes>
// 					<Route path="/pokemon/:name" element={<PokemonDisplay />} /> 
// 				</Routes>
// 			</MemoryRouter>
// 		);

// 		await waitFor(() => {
// 			mockPokemon.abilities.forEach((ability) => {
// 				const abilityName = getByText(ability.ability.name);
// 				expect(abilityName).toBeInTheDocument();
// 			});
// 		});
// 	});

// 	it("displays the Pokemon height and weight correctly", async () => {
// 		const { getByText } = render(
// 			<MemoryRouter initialEntries={["/pokemon/pikachu"]}>
// 				<Routes>
// 					<Route path="/pokemon/:name" element={<PokemonDisplay />} /> 
// 				</Routes>
// 			</MemoryRouter>
// 		);

// 		await waitFor(() => {
// 			const pokemonHeight = getByText(/40/i);
// 			const pokemonWeight = getByText(/60/i);
// 			expect(pokemonHeight).toBeInTheDocument();
// 			expect(pokemonWeight).toBeInTheDocument();
// 		});
// 	});

// 	it("displays the Pokemon types correctly", async () => {
// 		const { getByText } = render(
// 			<MemoryRouter initialEntries={["/pokemon/pikachu"]}>
// 				<Routes>
// 					<Route path="/pokemon/:name" element={<PokemonDisplay />} /> 
// 				</Routes>
// 			</MemoryRouter>
// 		);

// 		await waitFor(() => {
// 			mockPokemon.types.forEach((type) => {
// 				const typeName = getByText(type.type.name);
// 				expect(typeName).toBeInTheDocument();
// 			});
// 		});
// 	});

// 	it("displays the Pokemon stats correctly", async () => {
// 		const { getByText } = render(
// 			<MemoryRouter initialEntries={["/pokemon/pikachu"]}>
// 				<Routes></Routes>
// 				<Route path="/pokemon/:name">
// 					<PokemonDisplay />
// 				</Route>
// 			</MemoryRouter>
// 		);

// 		await waitFor(() => {
// 			mockPokemon.stats.forEach((stat) => {
// 				const statName = getByText(stat.stat.name);
// 				const statValue = getByText(stat.base_stat);
// 				expect(statName).toBeInTheDocument();
// 				expect(statValue).toBeInTheDocument();
// 			});
// 		});
// 	});
// });


import { render, screen, waitFor } from "@testing-library/react";
import { PokemonDisplay } from "./PokemonDisplay";
import { setupServer } from "msw/node";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { rest } from "msw";
import 'whatwg-fetch'; // To polyfill the fetch API
import '@testing-library/jest-dom'; // To extend the jest-dom matchers

const mockPokemon = {
  species: { name: "pikachu" },
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

const server = setupServer(
  rest.get("https://pokeapi.co/api/v2/pokemon/:name", (_, res, ctx) => {
    return res(ctx.json(mockPokemon));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PokemonDisplay Component", () => {
  it("renders without crashing", () => {
    render(<PokemonDisplay />);
    
  });

  it("displays the Pokemon data correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/pokemon/pikachu"]}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      // console.log(screen.getByTestId("pokemon-display").outerHTML);
      expect(screen.getByRole('heading', { name: /pikachu/i })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /pikachu/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: /id/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /25/i })).toBeInTheDocument();
      
      expect(screen.getByRole('heading', { level: 3, name: /height/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /40/i })).toBeInTheDocument();
      
      expect(screen.getByRole('heading', { level: 3, name: /weight/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /60/i })).toBeInTheDocument();
      
      expect(screen.getByRole('heading', { level: 3, name: /abilities/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /static/i })).toBeInTheDocument();
      
      expect(screen.getByRole('heading', { level: 3, name: /type/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /electric/i })).toBeInTheDocument();
      


        mockPokemon.abilities.forEach((ability) => {
        expect(screen.getByText(ability.ability.name)).toBeInTheDocument();
      });

      mockPokemon.types.forEach((type) => {
        expect(screen.getByText(type.type.name)).toBeInTheDocument();
      });
     
      mockPokemon.stats.forEach((stat) => {
        const statName = screen.getByText(stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1));
        const statValue = screen.getByText(stat.base_stat.toString());
        expect(statName).toBeInTheDocument();
        expect(statValue).toBeInTheDocument();
      });
    });
  });
});
