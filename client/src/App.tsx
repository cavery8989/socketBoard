
import React from "react";
import "./App.css";
import { Canvas } from "./components/canvas/canvas";
import { NewGameModel } from "./components/newGameModal/newGame";
import "./App.css";
import { useAppState } from "./hooks/useApplicationState";


function App() {
  
  const { state: { clientRole , inviteCode} } = useAppState()
  console.log(clientRole)
  return (
    <div className="App">
    
     <h3> Draw stuff... :)</h3>
  {inviteCode && <h4> Invite code: {inviteCode}</h4>}
     <Canvas/>
     <NewGameModel show={clientRole === null}/>
    </div>
  );
}

export default App;
