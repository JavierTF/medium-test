import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
// import { render } from '@testing-library/react';
import TaskContainer from "../src/app/page";

test("should check if the copyright is visible", () => {
  render(<TaskContainer />);
  const component = screen.getByRole("a");
  expect(component).toHaveTextContent("Sr. Fullstack Javier Toussent Fis");
});
