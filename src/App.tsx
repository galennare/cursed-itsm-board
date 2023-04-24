import React from "react";
import "./App.css";
import { TicketButton } from "./components/TicketButton";
import { DropDownLogIn } from "./components/DropDownLogIn";
import { Preferences } from "./components/Preferences";
import { Ticket } from "./components/Ticket";
import { ViewMyWork } from "./components/ViewMyWork";
import { AdminList } from "./components/AdminList";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1>Team 3</h1>
                    <h4>
                        Galen Nare, Michael Arocho, Solenn Gacon, Nicholas
                        DiGirolamo, Andrew Roberts, Alexandra Croce
                    </h4>
                </div>
            </header>
            <hr></hr>
            <TicketButton></TicketButton>
            <hr></hr>
            <DropDownLogIn></DropDownLogIn>
            <hr></hr>
            <Preferences></Preferences>
            <hr></hr>
            <Ticket></Ticket>
            <hr></hr>
            <ViewMyWork></ViewMyWork>
            <hr></hr>

            <div className="row">
                <div className="column" style={{ float: "left", width: "33%" }}>
                    <h1>Central List</h1>
                </div>
                <AdminList></AdminList>
                <div className="column" style={{ float: "left", width: "33%" }}>
                    <h1>User List</h1>
                </div>
            </div>
        </div>
    );
}

export default App;
