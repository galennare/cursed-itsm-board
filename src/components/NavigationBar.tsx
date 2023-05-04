import React from "react";
import { Button } from "react-bootstrap";
import { ProfilePhoto } from "./ProfilePhoto";
import { UserRole } from "../interfaces/UserRole";

/*
    This is a UI component that should look like a navigation bar
    that spans the top of the browser window and feature our project
    title as well as the drop-down menu to select the user role.

    This component should accept a parameter of the current
    selected user role as well as a hook/function to update
    that role. The variable that contains the actual role will
    be stored in App.tsx and be passed in as a property to this
    component.
*/
export function NavigationBar({
    userRole,
    setUserRole
}: {
    userRole: UserRole;
    setUserRole: (role: UserRole) => void;
}): JSX.Element {
    // delete this function later
    const setAdmin = () => setUserRole(UserRole.Admin);

    return (
        <span className="title">
            <div>
                <b>Cursed ITSM Ticketing System</b>
            </div>
            <div>{userRole}</div>
            <div>
                <Button onClick={setAdmin}>Delete this button</Button>
            </div>
            <div>
                <ProfilePhoto searcher="../default-profile.png" />
            </div>
        </span>
    );
}
