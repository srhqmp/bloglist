import { render, screen } from "@testing-library/react";
import Blog from "./Blog.jsx";
import { expect } from "vitest";

describe("<Blog />", () => {
  test("renders blog's title and author initially", async () => {
    const blog = {
      title: "Fleur De Peau",
      author: "Sarah Q.",
      likes: 12,
      url: "srhqmp.com",
      user: {
        name: "Sarah",
        username: "srhqmp",
        id: 1,
      },
    };

    const { container } = render(<Blog blog={blog} />);
    const titleDiv = container.querySelector(".blog-card-title");
    const contentDiv = container.querySelector(".blog-card-content");

    expect(screen.getByText("Fleur De Peau Sarah Q.")).toBeInTheDocument();
    expect(titleDiv).not.toHaveStyle("display: none");
    expect(contentDiv).toHaveStyle("display: none");
  });
});
