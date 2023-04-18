import React from "react";
import "./App.css";
import { TicketButton } from "./components/TicketButton";

function App() {
    return (
        <div className="App">
            <header className="App-header">
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
            <TicketButton></TicketButton>
        </div>
    );
}

export default App;
