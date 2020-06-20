import { createContext, useContext, useReducer, ReactNode } from "react";

// Duct tape state management, how u doin

// Types
type Action =
  | { type: "Set albums list"; albums: Album[] }
  | { type: "Set picked album"; album: Album }
  | { type: "Select album forwards" }
  | { type: "Select album backwards" }
  | { type: "Set app to ready" };
type Album = {
  name: string;
  covers: object[];
  id: string;
  artist: string;
};
type State = {
  appReady: boolean;
  albums: Album[];
  pickedAlbum: Album | false;
};
type Dispatch = (action: Action) => void;
type ProviderProps = { children: ReactNode };

const initialState: State = { appReady: false, albums: [], pickedAlbum: false };

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch | undefined>(undefined);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "Set albums list": {
      return { ...state, albums: action.albums };
    }
    case "Set app to ready": {
      return { ...state, appReady: true };
    }
    default: {
      return { ...state };
    }
  }
};

export const StateProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAppState = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  if (state === undefined || dispatch === undefined) {
    throw new Error("useAppState called outside of its context");
  }
  return [state, dispatch];
};

/*
Reference state structure

{
  pickedAlbum: 
  totalAlbums: {
    [{
      name,
      covers,
      id,
      artists
    }]
  }
}

*/
