import * as React from "react";
import { useAppState } from "../../hooks/useApplicationState";
import { Modal } from "../modal/modal";

export const WaitingModal = () => {
  const {
    state: { inviteCode },
  } = useAppState();


  return (
    <Modal>
      <p>Invite code: {inviteCode}</p>
      <p>Waiting for player...</p>
    </Modal>
  );
};
