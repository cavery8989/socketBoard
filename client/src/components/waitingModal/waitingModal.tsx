import * as React from "react";
import { useEffect } from "react";
import { useAppState } from "../../hooks/useApplicationState";
import { useSocket } from "../../hooks/useSocket";
import { bindSocket } from "../../socketsHelpers";
import { Modal } from "../modal/modal";

export const WaitingModal = () => {
  const { socket } = useSocket();
  const {
    startGame,
    state: { inviteCode },
  } = useAppState();

  useEffect(() => {
    const unSubPlayerJoined = bindSocket(socket, "playerJoined", () => {
      console.log("player joined");
      startGame();
    });

    return () => {
      unSubPlayerJoined();
    };
  }, [socket, startGame]);

  return (
    <Modal>
      <p>Invite code: {inviteCode}</p>
      <p>Waiting for player...</p>
    </Modal>
  );
};
