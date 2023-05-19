import React, { useCallback, useState } from "react";
import "./App.css";
import { NavigationBar, UserRole } from "./components/NavigationBar";
import { ProfilePhoto } from "./components/ProfilePhoto";
import { Ticket } from "./Interface/TicketInterface";
import { TicketList } from "./components/TicketList";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AdminList } from "./components/AdminList";
import { UserSort } from "./components/UserSort";
import { v4 } from "uuid";
import { TicketCreator } from "./components/TicketCreator";
import { Button } from "react-bootstrap";

const INITIAL_LIST: Ticket[] = [
    {
        id: v4(),
        title: "Computer Issues",
        description: "This is the description for ticket one.",
        priority: 2,
        last_modified: new Date(),
        author: "Joe Biden",
        status: "Pending",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "My Phone Died",
        description: "This is the description for ticket two.",
        priority: 5,
        last_modified: new Date(),
        author: "Donald Trump",
        status: "In-Progress",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "No WIFI?",
        description: "This is the description for ticket three.",
        priority: 0,
        last_modified: new Date(),
        author: "Barack Obama",
        status: "Resolved",
        assignee: "Nick DiGirolamo",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Broken Screen",
        description: "This is the description for ticket four.",
        priority: 1,
        last_modified: new Date(),
        author: "Mr. Guy",
        status: "Pending",
        assignee: "Alexandra Croce",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Keybrd nt wrking",
        description: "This is the description for ticket five.",
        priority: 2,
        last_modified: new Date(),
        author: "Jenna Tomasch",
        status: "Resolved",
        assignee: "Alexandra Croce",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "My Computer Won't Turn on",
        description: "This is the description for ticket six.",
        priority: 5,
        last_modified: new Date(),
        author: "Alejandro Tomato",
        status: "In-Progress",
        assignee: "Alexandra Croce",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "VPN Not Working",
        description: "This is the description for ticket seven.",
        priority: 0,
        last_modified: new Date(),
        author: "Brad Pitt",
        status: "In-Progress",
        assignee: "Solenn Gacon",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Computer smokin'",
        description: "This is the description for ticket eight.",
        priority: 5,
        last_modified: new Date(),
        author: "Kanye West",
        status: "Resolved",
        assignee: "Solenn Gacon",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Lost my Gmail password",
        description: "This is the description for ticket nine.",
        priority: 2,
        last_modified: new Date(),
        author: "Tina Fey",
        status: "Pending",
        assignee: "Solenn Gacon",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "USB Device Not Recognized",
        description: "This is the description for ticket ten.",
        priority: 0,
        last_modified: new Date(),
        author: "Chris Rock",
        status: "In-Progress",
        assignee: "Solenn Gacon",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Lost Wireless Signal",
        description: "This is the description for ticket eleven.",
        priority: 0,
        last_modified: new Date(),
        author: "Morgan Freeman",
        status: "Resolved",
        assignee: "Solenn Gacon",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Blue screen",
        description: "This is the description for ticket twelve.",
        priority: 4,
        last_modified: new Date(),
        author: "Will Smith",
        status: "Pending",
        assignee: "Solenn Gacon",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "An Application Keeps Crashing",
        description: "This is the description for ticket thirteen.",
        priority: 1,
        last_modified: new Date(),
        author: "George Lucas",
        status: "Resolved",
        assignee: "Solenn Gacon",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Received Suspicious Email",
        description: "This is the description for ticket fourteen.",
        priority: 1,
        last_modified: new Date(),
        author: "Stromae",
        status: "In-Progress",
        assignee: "Solenn Gacon",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Spilled red wine on my keyboard",
        description: "This is the description for ticket fifteen.",
        priority: 3,
        last_modified: new Date(),
        author: "Emmanuel Macron",
        status: "In-Progress",
        assignee: "Solenn Gacon",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Sudden Shut Off",
        description: "This is the description for ticket sixteen.",
        priority: 2,
        last_modified: new Date(),
        author: "Paul McCartney",
        status: "Pending",
        assignee: "Galen Nare",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Can't figure out how to install",
        description: "This is the description for ticket seventeen.",
        priority: 1,
        last_modified: new Date(),
        author: "Usain Bolt",
        status: "Pending",
        assignee: "Galen Nare",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Computer is overheating",
        description: "This is the description for ticket eighteen.",
        priority: 3,
        last_modified: new Date(),
        author: "Stephen King",
        status: "Resolved",
        assignee: "Galen Nare",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Hard drive is failing",
        description: "This is the description for ticket nineteen.",
        priority: 2,
        last_modified: new Date(),
        author: "Jeff Gordon",
        status: "Resolved",
        assignee: "Galen Nare",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Computer is literally on fire",
        description: "This is the description for ticket twenty.",
        priority: 5,
        last_modified: new Date(),
        author: "Rafael Nadal",
        status: "In-Progress",
        assignee: "Galen Nare",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "I deleted an important file oops",
        description: "This is the description for ticket twenty-one.",
        priority: 3,
        last_modified: new Date(),
        author: "Jeff Dunham",
        status: "In-Progress",
        assignee: "Michael Arocho",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Frozen screen",
        description: "This is the description for ticket twenty-two.",
        priority: 3,
        last_modified: new Date(),
        author: "Larry The Cable Guy",
        status: "Resolved",
        assignee: "Michael Arocho",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Got hacked",
        description: "This is the description for ticket twenty-three.",
        priority: 4,
        last_modified: new Date(),
        author: "Hulk Hogan",
        status: "Pending",
        assignee: "Michael Arocho",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Can't register for hackathon",
        description: "This is the description for ticket twenty-four.",
        priority: 1,
        last_modified: new Date(),
        author: "Arnold Schwarzenegger",
        status: "Pending",
        assignee: "Andrew Roberts",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "My security camera doesn't work",
        description: "This is the description for ticket twenty-five.",
        priority: 2,
        last_modified: new Date(),
        author: "Leonardo DiCaprio",
        status: "Resolved",
        assignee: "Andrew Roberts",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Can't log in",
        description: "This is the description for ticket twenty-six.",
        priority: 0,
        last_modified: new Date(),
        author: "Ellen DeGeneres",
        status: "In-Progress",
        assignee: "Andrew Roberts",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "I can’t print anything!",
        description: "This is the description for ticket twenty-seven.",
        priority: 1,
        last_modified: new Date(),
        author: "Zinedine Zidane",
        status: "In-Progress",
        assignee: "Solenn Gacon",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Keyboard Letter J Not Working",
        description: "This is the description for ticket twenty-eight.",
        priority: 2,
        last_modified: new Date(),
        author: "Jean Dujardin",
        status: "Resolved",
        assignee: "Solenn Gacon",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Spilled white wine on phone",
        description: "This is the description for ticket twenty-nine.",
        priority: 4,
        last_modified: new Date(),
        author: "Kev Adams",
        status: "Pending",
        assignee: "Solenn Gacon",
        image_path: "path_to_image"
    },
    {
        id: v4(),
        title: "Glitches In Editing Software",
        description: "This is the description for ticket thirty.",
        priority: 4,
        last_modified: new Date(),
        author: "Luc Besson",
        status: "Pending",
        assignee: "Solenn Gacon",
        image_path: "path_to_image"
    }
];

export interface userProps {
    setUserRole: (newRole: UserRole) => void;
}

export interface centralProps {
    centralList: Ticket[];
    setCentralList: (newList: Ticket[]) => void;
}

function App() {
    const [userRole, setUserRole] = useState<UserRole>(UserRole.User);

    const [centralList, setCentralList] = useState<Ticket[]>(INITIAL_LIST);
    const [adminList, setAdminList] = useState<Ticket[]>([]);
    const [userList, setUserList] = useState<Ticket[]>([]);
    const centralTickets = [...centralList];

    const [revealCreator, setRevealCreator] = useState<boolean>(false);

    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <header className="App-header">
                    <div>
                        <ProfilePhoto url="../default-profile.png" />
                    </div>
                    <div>
                        <NavigationBar
                            setUserRole={setUserRole}
                            centralList={centralList}
                            setCentralList={setCentralList}
                        ></NavigationBar>
                    </div>
                </header>
                <div style={{ backgroundColor: "#8096c06e" }}>
                    <div>
                        <small style={{ paddingRight: "800px" }}>
                            Team 3: Galen Nare, Solenn Gacon, Michael Arocho,
                            Andrew Roberts, Alexandra Croce, Nicholas DiGirolamo
                        </small>
                    </div>
                </div>
                <div
                    className="row"
                    style={{ width: "100%", display: "table" }}
                >
                    <div
                        className="column"
                        style={{ width: "33.33%", display: "table-cell" }}
                    >
                        {userRole == UserRole.Super && (
                            <Button
                                onClick={() => setRevealCreator(!revealCreator)}
                            >
                                Toggle Ticket Creator
                            </Button>
                        )}
                        {revealCreator && (
                            <TicketCreator
                                list={centralList}
                                setList={setCentralList}
                            ></TicketCreator>
                        )}
                        <TicketList
                            title={"All Tickets"}
                            userRole={userRole}
                            requiredRole={UserRole.Super}
                            list={centralList}
                            setList={setCentralList}
                        />
                    </div>
                    <div
                        className="column"
                        style={{ width: "33.33%", display: "table-cell" }}
                    >
                        <TicketList
                            title={"My Tickets"}
                            userRole={userRole}
                            requiredRole={UserRole.User}
                            list={userList}
                            setList={setUserList}
                        />
                    </div>
                    <div
                        className="column"
                        style={{ width: "33.33%", display: "table-cell" }}
                    >
                        <AdminList
                            title={"Tickets For Review"}
                            userRole={userRole}
                            requiredRole={UserRole.Admin}
                            userList={userList}
                            adminList={adminList}
                            centralList={centralList}
                            setUserList={setUserList}
                            setAdminList={setAdminList}
                            setCentralList={setCentralList}
                        />
                    </div>
                </div>
            </DndProvider>
        </div>
    );
}

export default App;
