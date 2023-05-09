import React from "react";
import { Form } from "react-bootstrap";
import { UserRole } from "./NavigationBar";

export function UserSelect({
    users,
    setUserRole
}: {
    users: UserRole[];
    setUserRole?: (role: UserRole) => void; // Optional for testing DO NOT make this undefined
}): JSX.Element {
    return (
        <div>
            <Form.Select
                role={"userSelect"}
                id={"userSelect"}
                onChange={(event) => {
                    setUserRole?.(
                        UserRole[event.target.value as keyof typeof UserRole] // Trust me it works
                    );
                }}
            >
                {users
                    .filter((user) => user != UserRole.none)
                    .map((user) => {
                        return (
                            <option key={user} value={user}>
                                {user}
                            </option>
                        );
                    })}
            </Form.Select>
        </div>
    );
}
