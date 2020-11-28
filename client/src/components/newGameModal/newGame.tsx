import React, { useState } from "react";
import { useAppState } from "../../hooks/useApplicationState";
import { useSocket } from "../../hooks/useSocket";
import { generateInviteKey } from "../../utils/gameCodeGen";
import { Button } from "../button/button";
import { Modal } from "../modal/modal";

import "./newGame.css";

type NewGameProps = {
  show: boolean;
};

export const NewGameModel: React.FC<NewGameProps> = ({ show }) => {
  const { socket } = useSocket();
  const { joinAsHost, joinAsGuest } = useAppState();
  const [showRoomNotFound, setRoomNotFound] = useState(false);

  const [joinKey, setJoinKey] = useState("");

  const handleStartGame = () => {
    const inviteKey = generateInviteKey();
    socket.emit("createRoom", inviteKey);
    console.log("start clicked");
  };

  const handleJoinGame = () => {
    console.log("join clicked");
    socket.emit("joinGame", joinKey);
  };

  const handleJoinKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJoinKey(e.target.value);
  };

  socket.on("confirmGameCreated", (room: string) => {
    console.log("room created");
    joinAsHost(room);
  });

  socket.on("confirmGameJoined", () => {
    console.log("room joined");
    setRoomNotFound(false);
    joinAsGuest();
  });

  socket.on("gameNotFound", () => {
    console.log("room joined");
    setRoomNotFound(true);
  });

  return show ? (
    <Modal>
      <div className="new-game">
        <Button onclick={handleStartGame}>Start new game</Button>
        Join existing game
        {showRoomNotFound && (
          <span style={{ color: "red" }}>Room not Found</span>
        )}
        <input onChange={handleJoinKeyChange} type="text" placeholder="paste invite code..."/>
        <Button onclick={handleJoinGame}>Join existing game</Button>
        
      </div>
    </Modal>
  ) : null;
};
