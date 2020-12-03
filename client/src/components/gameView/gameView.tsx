import React, { useCallback, useEffect } from "react";
import { ClientRole, useAppState } from "../../hooks/useApplicationState";
import { useSocket } from "../../hooks/useSocket";
import { bindSocket } from "../../socketsHelpers";
import { Canvas } from "../canvas/canvas";
import { NewGameModel } from "../newGameModal/newGame";
import { WaitingModal } from "../waitingModal/waitingModal";

import "./gameView.css";

export const GameView = () => {
  const {
    state: { clientRole, gameState, playerTurn, turnsLeft, subject },
    endClientTurn: endTurn,
    startGuestTurn,
    startGame,
    setGameOver,
    startHostTurn,
  } = useAppState();

  const { socket } = useSocket();

  useEffect(() => {
    const unSub = [
      bindSocket(socket, "playerJoined", () => {
        console.log("player joined");
        const newSubject = getSubject();
        startGame(newSubject);
        socket.emit("startGameGuest", { newSubject });
      }),
      bindSocket(socket, "startGameGuest", ({ newSubject }) => {
        startGame(newSubject);
      }),
      bindSocket(socket, "hostTurnOver", ({ turnsLeft }) => {
        startGuestTurn(turnsLeft);
      }),
      bindSocket(socket, "guestTurnOver", () => {
        startHostTurn();
      }),
      bindSocket(socket, "gameOver", () => {
        // set game over
        setGameOver();
      }),
    ];
    return unSub.forEach((unSub) => unSub());
  }, [socket, startGuestTurn, setGameOver, startGame, startHostTurn]);

  useEffect(() => {
    if (clientRole === "host") {
      if (gameState === "OVER") {
        socket.emit("gameOver");
      } else {
        socket.emit("clientTurnOver");
      }
    }
  }, [turnsLeft, clientRole, socket, gameState]);

  const handlePlayerLiftedPen = useCallback(() => {
    if (clientRole === "host") {
      endTurn();
    } else if (clientRole === "guest") {
      // broadcast turn over
      socket.emit("guestTurnOver");
    }
  }, [endTurn, socket, clientRole]);

  return (
    <>
      <div className="turn-display">
        {gameState === "IN_PROGRESS" && (
          <>
            <h3>Draw a {subject}</h3>
            <p>
              Its {isPlayersTurn(clientRole, playerTurn) ? "your" : "their"}{" "}
              turn
            </p>
          </>
        )}
      </div>
      <Canvas
        playerLiftedPen={handlePlayerLiftedPen}
        playerActive={
          gameState === "IN_PROGRESS" && isPlayersTurn(clientRole, playerTurn)
        }
      />
      {clientRole === null && <NewGameModel />}
      {gameState === "WAITING_FOR_PLAYER" && <WaitingModal />}
    </>
  );
};

const isPlayersTurn = (clientRole: ClientRole, currentTurn: ClientRole) => {
  return clientRole === currentTurn;
};

const getSubject = () => {
  const choices = [
    "penguin",
    "rat",
    "dinosaur",
    "pikachu",
    "cat",
    "pickle Rick",
    "robot",
    "monkey",
  ];
  return choices[Math.floor(Math.round(Math.random() * choices.length))];
};
