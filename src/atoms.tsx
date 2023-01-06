import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface ITodo {
  id: number;
  text: string;
}

export interface IToDoState {
  [key: string]: ITodo[];
}
export interface IPanel {
  id: number;
  text: string;
}

export interface IPanelState {
  [key: string]: IPanel[];
}

export interface ILocalStorage {
  "To Do": [];
  Doing: [];
  Done: [];
}

export interface IInput {
  text: string;
}

export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const DeleteAreaState = atom<boolean>({
  key: "garbage",
  default: false,
});
