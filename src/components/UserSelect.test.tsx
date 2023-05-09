import React from "react";
import { render, screen } from "@testing-library/react";
import { UserSelect } from "./UserSelect";
import { UserRole } from "./NavigationBar";

test("renders a dropdown", () => {
    render(
        <UserSelect
            users={[UserRole.Super, UserRole.Admin, UserRole.User]}
            setUserRole={undefined}
        />
    );
    const select = screen.getByRole("userSelect");
    expect(select).toBeInTheDocument();
});
