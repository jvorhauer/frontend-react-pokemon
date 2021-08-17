import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PokeCard from "./PokeCard";

test("PokeCard renders without errors", () => {
  expect(() => {
    render(<PokeCard url="https://pokeapi.co/api/v2/pokemon/201/" />);
  }).not.toThrowError();
});
