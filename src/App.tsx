import React from "react";
import "./App.css";

import { CentralListSection } from "./component/CentralSection";

function App() {
    return (
        <div>
            <header>
                <div>
                    <h1>Team 3</h1>
                    <h4>Galen Nare</h4>
                    <h4>Michael Arocho</h4>
                    <h4>Solenn Gacon</h4>
                    <h4>Nicholas DiGirolamo</h4>
                    <h4>Andrew Roberts</h4>
                    <h4>Alexandra Croce</h4>
                </div>
            </header>
            <div>
                {CentralListSection("New", [
                    "Ticket 1",
                    "Ticket 2",
                    "Ticket 3"
                ])}
            </div>
        </div>
    );
}

export default App;
