import React from "react";
import { screen, render } from "@testing-library/react";
import { generateGravatarURL, ProfilePhoto } from "./ProfilePhoto";

test("There is an image", () => {
    render(<ProfilePhoto url={"../default_profile.png"} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
});
