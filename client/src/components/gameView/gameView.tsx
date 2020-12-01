import React from "react";
import { useAppState } from "../../hooks/useApplicationState";
import { Canvas } from "../canvas/canvas";
import { NewGameModel } from "../newGameModal/newGame";
import { WaitingModal } from "../waitingModal/waitingModal";

export const GameView = () => {
  const {
    state: { clientRole, gameState },
  } = useAppState();
  console.log(clientRole);
  return (
    <>
      <Canvas />
      {clientRole === null && <NewGameModel />}
      {gameState === "WAITING_FOR_PLAYER" && <WaitingModal />}
    </>
  );
};
