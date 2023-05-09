import React from "react";
import { screen, render } from "@testing-library/react";
import { generateGravatarURL, ProfilePhoto } from "./ProfilePhoto";

test("generates correct URL", () => {
    const testTicket = {
        id: 42,
        title: "My Phone Died",
        description: "This is the description for ticket two.",
        priority: 1 as 0 | 1 | 2 | 3 | 4 | 5,
        last_modified: new Date(),
        author: "Donald Trump",
        status: "In-Progress" as "In-Progress" | "Pending" | "Resolved",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    };

    const url = generateGravatarURL(testTicket);
    expect(url).toEqual(
        "https://www.gravatar.com/avatar/e4f2e1f0e2ae4d3ce7018cf3b4f3577c99714bdc9f5a4ac28e3e7cb2c505db6c?s=64&d=identicon&r=PG"
    );
});

test("There is an image", () => {
    render(<ProfilePhoto url={"../default_profile.png"} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
});
