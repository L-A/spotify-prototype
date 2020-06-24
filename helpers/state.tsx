import { createContext, useContext, useReducer, ReactNode } from "react";

// Types
type Action =
  | { type: "Set albums list"; albums: Album[] }
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
  selections: string[];
  pickedIndex: number;
  lastPickedIndex: number;
  pickedAlbum: Album | false;
};
type Dispatch = (action: Action) => void;
type ProviderProps = { children: ReactNode };

const initialState: State = {
  appReady: false,
  albums: [],
  selections: [],
  pickedAlbum: false,
  pickedIndex: -1,
  lastPickedIndex: -1,
};

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch | undefined>(undefined);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    // Duct tape state management, how u doin
    // This is a small app. When needed, there's logic in here:
    case "Set albums list": {
      const shuffledAlbums = action.albums
        .map((a) => a.id)
        .sort(() => Math.random() - 0.5);
      return { ...state, albums: action.albums, selections: shuffledAlbums };
    }

    case "Set app to ready": {
      return { ...state, appReady: true };
    }

    case "Select album forwards": {
      if (state.albums.length <= 0) return { ...state, pickedIndex: -1 };
      let pickedIndex = (state.pickedIndex + 1) % state.selections.length;
      let lastPickedIndex =
        pickedIndex > state.lastPickedIndex
          ? pickedIndex
          : state.lastPickedIndex;
      let pickedAlbum = state.pickedAlbum || false;
      if (state.albums[pickedIndex]) {
        pickedAlbum = state.albums.find(
          (album) => album.id == state.selections[pickedIndex]
        );
      }
      return {
        ...state,
        lastPickedIndex,
        pickedAlbum,
        pickedIndex,
      };
    }

    case "Select album backwards": {
      if (state.albums.length <= 0) return { ...state, pickedIndex: -1 };
      let pickedIndex = Math.max(0, state.pickedIndex - 1);
      let pickedAlbum = state.pickedAlbum || false;
      if (state.albums[pickedIndex]) {
        pickedAlbum = state.albums.find(
          (album) => album.id == state.selections[pickedIndex]
        );
      }
      return {
        ...state,
        pickedAlbum,
        pickedIndex,
      };
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
