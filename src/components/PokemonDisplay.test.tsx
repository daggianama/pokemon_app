

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
