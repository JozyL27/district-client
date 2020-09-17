import React from "react";
import ReactDom from "react-dom";
import ArticleCard from "./ArticleCard";
import avatar from "../../illustrations/01.png";
import { MemoryRouter } from "react-router-dom";

const ArticleCardHelpers = {
  user: {
    avatar: avatar,
    username: "kanyeWest",
    id: 0,
  },
  article: {
    title: "test article",
    date_publsihed: `${Date.now()}`,
    author: 0,
  },
};

describe("<ArticleCard />", () => {
  const { user, article } = ArticleCardHelpers;
  // smoke test
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(
      <MemoryRouter>
        <ArticleCard
          avatar={user.avatar}
          username={user.username}
          id={user.id}
          title={article.title}
          date_published={article.date_publsihed}
          author={article.author}
        />
      </MemoryRouter>,
      div
    );
    ReactDom.unmountComponentAtNode(div);
  });
});
