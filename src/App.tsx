import React from "react";
import "./App.css";
import { TicketButton } from "./components/TicketButton";
import { Toolbar } from "./components/CentralToolbar";

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
            <TicketButton></TicketButton>
            <Toolbar></Toolbar>
        </div>
    );
}

export default App;
