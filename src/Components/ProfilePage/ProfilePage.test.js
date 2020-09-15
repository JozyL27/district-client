import React from "react";
import ReactDom from "react-dom";
import renderer from "react-test-renderer";
import ProfilePage from "./ProfilePage";
import { UserProvider } from "../../Context/UserContext";
import { MemoryRouter } from "react-router-dom";

describe("<ProfilePage />", () => {
  // smoke test
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDom.render(
      <MemoryRouter>
        <UserProvider>
          <ProfilePage />
        </UserProvider>
      </MemoryRouter>,
      div
    );
    ReactDom.unmountComponentAtNode(div);
  });

  // snapshot
  it("renders the UI as expected", () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <UserProvider>
            <ProfilePage />
          </UserProvider>
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
