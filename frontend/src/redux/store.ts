import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/PlayersSlice";

export const store = configureStore({
    reducer: {
        player: playerReducer,
    },
});
