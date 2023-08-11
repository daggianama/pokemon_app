import React from "react";
import { render } from "@testing-library/react";
import { PokemonDisplay } from "../PokemonDisplay";

describe("PokemonDisplay Component", () => {
  it("renders without crashing", () => {
    render(<PokemonDisplay />);
  });

  it("displays the Pokemon name correctly", () => {
    // Escribir pruebas para verificar que el nombre del Pokemon se muestre correctamente
  });

  it("displays the Pokemon abilities correctly", () => {
    // Escribir pruebas para verificar que las habilidades del Pokemon se muestren correctamente
  });

  // Agregar más pruebas según sea necesario
});
