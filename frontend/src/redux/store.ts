"use client";
import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/PlayersSlice";
import { useDispatch, useSelector } from "react-redux";
const store = configureStore({
    reducer: {
        player: playerReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type PlayerDispatch = typeof store.dispatch;

export const usePlayerDispatch = () => useDispatch<PlayerDispatch>();
export const usePlayerSelector = (selector: (state: RootState) => any) =>
    useSelector(selector);
