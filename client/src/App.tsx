import React from "react";
import "./App.css";
import { Canvas } from "./components/canvas/canvas";
import { NewGameModel } from "./components/newGameModal/newGame";
import "./App.css";
import { useAppState } from "./hooks/useApplicationState";
import { WaitingModal } from "./components/waitingModal/waitingModal";
import { GameView } from "./components/gameView/gameView";

function App() {
  const {
    state: { clientRole, gameState },
  } = useAppState();
  return (
    <div className="App">
      <h3> Draw stuff... :)</h3>
      <GameView/>
      
    </div>
  );
}

export default App;
