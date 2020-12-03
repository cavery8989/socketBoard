import * as React from "react";

export type ClientRole = "host" | "guest" | null;
type GameState = "LOBBY" | "WAITING_FOR_PLAYER" | "IN_PROGRESS" | "OVER";
type AppState = {
  clientRole: ClientRole;
  playerTurn: ClientRole;
  inviteCode: string;
  gameState: GameState;
  turnsLeft: number;
  subject: string;
};

const defaultState: AppState = {
  clientRole: null,
  playerTurn: "host",
  inviteCode: "",
  gameState: "LOBBY",
  turnsLeft: 15,
  subject: ''
};

const appStateContext = React.createContext<
  [AppState, React.Dispatch<React.SetStateAction<AppState>>]
>([defaultState, () => {}]);

export const AppStateProvider: React.FC = ({ children }) => {
  const appState = React.useState(defaultState);
  const { Provider } = appStateContext;
  return <Provider value={appState}>{children}</Provider>;
};



export const useAppState = () => {
  const [state, setState] = React.useContext(appStateContext);
  return {
    state,
    joinAsHost: (inviteCode: string) =>
      setState((oldState) => ({
        ...oldState,
        clientRole: "host",
        gameState: "WAITING_FOR_PLAYER",
        inviteCode,
      })),
    joinAsGuest: () =>
      setState((oldState) => ({
        ...oldState,
        clientRole: "guest",
        gameState: "IN_PROGRESS",
      })),
    leaveGame: () => {
      setState(defaultState);
    },
    startGame: (subject: string) => {
      setState((oldState) => ({ ...oldState, gameState: "IN_PROGRESS", subject }));
    },
    endClientTurn: () => {
      setState((oldState) => {
        if (oldState.turnsLeft > 0) {
          return {
            ...oldState,
            gameState: "IN_PROGRESS",
            playerTurn: 'guest',
            turnsLeft: oldState.turnsLeft - 1,
          };
        } else {
          return { ...oldState, gameState: "OVER" };
        }
      });
    },
    endGuestTurn: () => {
      setState((oldState) => ({ ...oldState, playerTurn: "host" }));
    },
    startGuestTurn: (turnsLeft) => {
      setState((oldState) => ({ ...oldState, turnsLeft, playerTurn: "guest" }));
    },
    startHostTurn: () => {
      setState((oldState) => {
        const currentTurns = oldState.turnsLeft - 1
        if (currentTurns > 0) {
          return {
            ...oldState,
            playerTurn: 'host',
            turnsLeft: currentTurns,
          };
        } else {
          return { ...oldState, gameState: "OVER" };
        }
      });
    },
    setGameOver: () => {
      setState((oldState) => ({ ...oldState, gameState: "OVER" }));
    },

  };
};

// const otherPlayer = (currentPlayer: ClientRole): ClientRole => {
//   return currentPlayer === "guest" ? "host" : "guest";
// };
