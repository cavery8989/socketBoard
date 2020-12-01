import React, { useEffect, useState } from "react";
import { useAppState } from "../../hooks/useApplicationState";
import { useSocket } from "../../hooks/useSocket";
import { bindSocket } from "../../socketsHelpers";
import { generateInviteKey } from "../../utils/gameCodeGen";
import { Button } from "../button/button";
import { Modal } from "../modal/modal";

import "./newGame.css";

export const NewGameModel = () => {
  const { socket } = useSocket();
  const { joinAsHost, joinAsGuest } = useAppState();
  const [showRoomNotFound, setRoomNotFound] = useState(false);

  const [joinKey, setJoinKey] = useState("");

  useEffect(() => {
    const unSubscribers = [
      bindSocket(socket, "confirmGameCreated", (room: string) => {
        console.log("room created");
        joinAsHost(room);
      }),
      bindSocket(socket, "confirmGameJoined", () => {
        console.log("room joined");
        setRoomNotFound(false);
        joinAsGuest();
      }),
      bindSocket(socket, "gameNotFound", () => {
        console.log("room joined");
        setRoomNotFound(true);
      }),
    ];

    return () => unSubscribers.forEach(unSub => unSub())

  }, [joinAsGuest, joinAsHost, socket]);

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

  return (
    <Modal>
      <>
        <Button onclick={handleStartGame}>Start new game</Button>
        Join existing game
        {showRoomNotFound && (
          <span style={{ color: "red" }}>Room not Found</span>
        )}
        <input
          onChange={handleJoinKeyChange}
          type="text"
          placeholder="paste invite code..."
        />
        <Button onclick={handleJoinGame}>Join existing game</Button>
      </>
    </Modal>
  );
};


