import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";
import "@testing-library/jest-dom";

jest.mock("../src/presentation/components/Post", () => ({ post }) => (
  <div data-testid="post">
    <p>{post.username}</p>
    <p>{post.content}</p>
  </div>
));

jest.mock("../src/presentation/components/MainStructure", () => ({ children, className }) => (
  <div data-testid="main-structure" className={className}>
    {children}
  </div>
));

describe("Home Page", () => {
  test("renders the page correctly", () => {
    render(<Home />);

    expect(screen.getByTestId("main-structure")).toBeInTheDocument();

    const postElements = screen.getAllByTestId("post");
    expect(postElements).toHaveLength(2);
  });
});
