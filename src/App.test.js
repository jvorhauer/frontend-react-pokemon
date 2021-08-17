import { render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("App should render without error", () => {
  expect(() => {
    render(<App/>);
  }).not.toThrowError();
});
