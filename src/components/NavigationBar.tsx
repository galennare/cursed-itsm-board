import React from "react";
import { Button } from "react-bootstrap";
import { ProfilePhoto } from "./ProfilePhoto";

/*
    This is NOT a UI component. This is similar to an interface
    in the sense that it defines the properties that can exist
    on a specific data type. This datatype defines the values
    that can be assigned to a variable of type UserRole
*/
export enum UserRole {
    Super = "Super User",
    Admin = "Admin",
    User = "User",
    none = "None"
}

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
    role,
    setRole
}: {
    role: UserRole;
    setRole: (role: UserRole) => void;
}): JSX.Element {
    return (
        <span className="title">
            <div>
                <b>Cursed ITSM Ticketing System</b>
            </div>
            <div>{role}</div>
            <div>
                <Button onClick={() => setRole(UserRole.Super)}>
                    Make me Super
                </Button>
                <Button onClick={() => setRole(UserRole.Admin)}>
                    Make me Admin
                </Button>
                <Button onClick={() => setRole(UserRole.User)}>
                    Make me User
                </Button>
            </div>
            <div>
                <ProfilePhoto searcher="../default-profile.png" />
            </div>
        </span>
    );
}
