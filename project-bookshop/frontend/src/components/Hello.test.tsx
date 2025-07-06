import { render, screen } from "@testing-library/react";

function Hello() {
  return <h1>Hello World</h1>;
}

test("renders hello message", () => {
  render(<Hello />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});
