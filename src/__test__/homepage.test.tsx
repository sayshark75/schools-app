import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

test("HomePage", () => {
  render(<Home />);
  expect(screen.getByRole("button", { name: "Get Started" })).toBeDefined();
  expect(screen.getByRole("button", { name: "Learn More" })).toBeDefined();
});
