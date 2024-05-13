import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog.jsx";

describe("<Blog />", () => {
  let container = null;

  beforeEach(() => {
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

    container = render(<Blog blog={blog} />).container;
  });

  test("renders blog's title and author initially", () => {
    const titleDiv = container.querySelector(".blog-card-title");
    const contentDiv = container.querySelector(".blog-card-content");

    expect(screen.getByText("Fleur De Peau Sarah Q.")).toBeInTheDocument();
    expect(titleDiv).not.toHaveStyle("display: none");
    expect(contentDiv).toHaveStyle("display: none");
  });

  test("displays blog url and likes when 'view' button is clicked", async () => {
    const user = userEvent.setup();

    const contentDiv = container.querySelector(".blog-card-content");

    const button = screen.getByText("view");
    await user.click(button);

    expect(contentDiv).not.toHaveStyle("display: none");
  });
});
