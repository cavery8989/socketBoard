import * as React from "react";

type ClientRole = "host" | "guest" | null;
type GameState = "LOBBY" | "WAITING_FOR_PLAYER" | "IN_PROGRESS";
type AppState = {
  clientRole: ClientRole;
  inviteCode: string;
  gameState: GameState;
};

const defaultState: AppState = {
  clientRole: null,
  inviteCode: "",
  gameState: "LOBBY",
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
      setState((oldState) => ({ ...oldState, clientRole: "guest", gameState: 'IN_PROGRESS' })),
    leaveGame: () => {
      setState(defaultState);
    },
    startGame: () => {
      setState((oldState) => ({...oldState, gameState: 'IN_PROGRESS'}))
    }
  };
};
