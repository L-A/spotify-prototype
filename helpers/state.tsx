import { createContext, useContext, useReducer, ReactNode } from "react";
import { shuffleArray } from "../helpers/shuffleArray";

// Types
type Action =
  | { type: "Set albums list"; albums: Album[] }
  | { type: "Select album forwards" }
  | { type: "Select album backwards" }
  | { type: "Set app to need authorization" }
  | { type: "Set app to ready" }
  | { type: "Set device to playing" }
  | { type: "Set device to not playing" }
  | { type: "Set device album"; album: Album };
type Album = {
  name: string;
  covers: object[];
  id: string;
  artist: string;
  uri: string;
};
type State = {
  appReady: boolean;
  needsAuth: boolean;
  albums: Album[];
  selections: string[];
  pickedIndex: number;
  lastPickedIndex: number;
  pickedAlbum: Album | false;
  nextPickedAlbum: Album | false;
  devicePlaying: boolean;
  playingAlbum: Album | undefined;
};
type Dispatch = (action: Action) => void;
type ProviderProps = { children: ReactNode };

const initialState: State = {
  appReady: false,
  needsAuth: false,
  albums: [],
  selections: [],
  pickedAlbum: false,
  nextPickedAlbum: false,
  pickedIndex: -1,
  lastPickedIndex: -1,
  devicePlaying: false,
  playingAlbum: undefined,
};

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch | undefined>(undefined);

const reducer = (state: State, action: Action) => {
  console.log("Action dispatch:", action.type);
  switch (action.type) {
    // Duct tape state management, how u doin

    case "Set app to ready": {
      return { ...state, appReady: true, needsAuth: false };
    }

    case "Set app to need authorization": {
      return { ...state, needsAuth: true };
    }

    case "Set albums list": {
      const shuffledAlbums = shuffleArray(action.albums.map((a) => a.id));
      console.log(shuffledAlbums);
      return { ...state, albums: action.albums, selections: shuffledAlbums };
    }

    case "Select album forwards": {
      if (state.albums.length <= 0) return { ...state, pickedIndex: -1 };
      let pickedIndex = (state.pickedIndex + 1) % state.selections.length;
      let lastPickedIndex =
        pickedIndex > state.lastPickedIndex
          ? pickedIndex
          : state.lastPickedIndex;
      let pickedAlbum = state.pickedAlbum || false;
      let nextPickedAlbum = state.nextPickedAlbum || false;
      if (state.albums[pickedIndex]) {
        pickedAlbum = state.albums.find(
          (album) => album.id == state.selections[pickedIndex]
        );
      }
      if (state.albums[pickedIndex + 1]) {
        nextPickedAlbum = state.albums.find(
          (album) => album.id == state.selections[pickedIndex + 1]
        );
      }
      return {
        ...state,
        lastPickedIndex,
        pickedAlbum,
        nextPickedAlbum,
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

    case "Set device to playing": {
      return {
        ...state,
        devicePlaying: true,
      };
    }

    case "Set device to not playing": {
      return {
        ...state,
        devicePlaying: false,
      };
    }

    case "Set device album": {
      return {
        ...state,
        playingAlbum: action.album || undefined,
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

export const useAppState = (): [State, Dispatch] => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  if (state === undefined || dispatch === undefined) {
    throw new Error("useAppState called outside of its context");
  }
  return [state, dispatch];
};
