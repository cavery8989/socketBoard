import React from "react";
import "./App.css";
import { Canvas } from "./components/canvas/canvas";
import { NewGameModel } from "./components/newGameModal/newGame";
import "./App.css";
import { useAppState } from "./hooks/useApplicationState";
import { WaitingModal } from "./components/waitingModal/waitingModal";

function App() {
  const {
    state: { clientRole, gameState },
  } = useAppState();
  return (
    <div className="App">
      <h3> Draw stuff... :)</h3>
      <Canvas />
      <NewGameModel show={clientRole === null} />
      {gameState === 'WAITING_FOR_PLAYER' && <WaitingModal/>}
    </div>
  );
}

export default App;
