import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
    currentSongs: [],
    currentIndex: 0,
    isPlaying: false,
    isActive: false,
    activeSong: {},
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setActiveSong: (state, action) => {
            if (action.payload.song) {
                state.activeSong = action.payload.song;
            }

            if (action.payload.data) {
                state.currentSongs = action.payload.data;
            }

            if (action.payload.i) {
                state.currentIndex = action.payload.i;
            }
            state.isActive = true;
        },
        prevSong: (state) => {
            if (state.currentIndex === 0) {
                state.currentIndex = state.currentSongs.length - 1;
            } else {
                state.currentIndex -= 1;
            }
            state.activeSong = state.currentSongs[state.currentIndex];
        },
        nextSong: (state) => {
            if (state.currentIndex === state.currentSongs.length - 1) {
                state.currentIndex = 0;
            } else {
                state.currentIndex += 1;
            }
            state.activeSong = state.currentSongs[state.currentIndex];
        },
        playPause: (state, action) => {
            state.isPlaying = action.payload;
        },
    },
});

export const { setActiveSong, prevSong, nextSong, playPause } =
    playerSlice.actions;

export default playerSlice.reducer;
