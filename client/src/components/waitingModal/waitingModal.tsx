import * as React from "react";
import { useAppState } from "../../hooks/useApplicationState";
import { useSocket } from "../../hooks/useSocket";
import { Modal } from "../modal/modal";

export const WaitingModal = () => {
  const { socket } = useSocket();
  const {
    startGame,
    state: { inviteCode },
  } = useAppState();

  socket.on("playerJoined", () => {
    console.log('player joined')
    startGame();
  });
  return (
    <Modal>
      <p>Invite code: {inviteCode}</p>
      <p>Waiting for player...</p>
    </Modal>
  );
};
