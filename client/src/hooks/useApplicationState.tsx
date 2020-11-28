import * as React from "react";

type ClientRole =  "host" | "guest" | null;
type AppState = {
  clientRole: ClientRole
  inviteCode: string;
};

const defaultState: AppState = {
  clientRole: null,
  inviteCode: "",
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
    const [state, setState] = React.useContext(appStateContext)
    return {
        state,
        joinAsHost: (inviteCode: string) => setState(oldState => ({...oldState, clientRole: 'host', inviteCode,})),
        joinAsGuest: () => setState(oldState => ({...oldState, clientRole: 'guest' })),
        leaveGame: () => {setState(defaultState)}
    }
}