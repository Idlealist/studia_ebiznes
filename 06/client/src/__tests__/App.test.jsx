import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders navigation links", () => {
    render(<App />);
    
    expect(screen.getByText(/Produkty/)).toBeInTheDocument();
    expect(screen.getByText(/Koszyk/)).toBeInTheDocument();
    expect(screen.getByText(/Płatności/)).toBeInTheDocument();
  });

});
