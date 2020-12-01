import React from "react";
import "./App.css";
import { GameView } from "./components/gameView/gameView";
import { AppStateProvider } from "./hooks/useApplicationState";

function App() {
  return (
    <div className="App">
      <AppStateProvider>
        <GameView />
      </AppStateProvider>
    </div>
  );
}

export default App;
