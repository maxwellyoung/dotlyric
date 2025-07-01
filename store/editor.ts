import { create } from "zustand";

export interface EditorState {
  // Text input
  lyrics: string;
  maxChars: number;

  // Timing
  duration: number; // seconds (0-30)

  // Dot parameters
  gridCols: number;
  gridRows: number;
  dotRadius: number;
  invertBackground: boolean;

  // Animation state
  isPlaying: boolean;
  currentFrame: number;

  // Actions
  setLyrics: (lyrics: string) => void;
  setDuration: (duration: number) => void;
  setGridCols: (cols: number) => void;
  setGridRows: (rows: number) => void;
  setDotRadius: (radius: number) => void;
  setInvertBackground: (invert: boolean) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentFrame: (frame: number) => void;
  resetEditor: () => void;
}

const DEFAULT_STATE = {
  lyrics: "",
  maxChars: 200,
  duration: 10,
  gridCols: 64,
  gridRows: 32,
  dotRadius: 2,
  invertBackground: false,
  isPlaying: false,
  currentFrame: 0,
};

export const useEditorStore = create<EditorState>((set) => ({
  ...DEFAULT_STATE,

  setLyrics: (lyrics: string) =>
    set((state) => ({
      lyrics: lyrics.slice(0, state.maxChars),
    })),

  setDuration: (duration: number) => set({ duration }),
  setGridCols: (gridCols: number) => set({ gridCols }),
  setGridRows: (gridRows: number) => set({ gridRows }),
  setDotRadius: (dotRadius: number) => set({ dotRadius }),
  setInvertBackground: (invertBackground: boolean) => set({ invertBackground }),
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setCurrentFrame: (currentFrame: number) => set({ currentFrame }),

  resetEditor: () => set(DEFAULT_STATE),
}));
