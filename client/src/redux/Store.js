import { ConfigureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import loadingBarReducer from "./features/LoadingBarSlice";

export const store = ConfigureStore({
    reducer: {
        player: playerReducer,
        loadingBar: loadingBarReducer,
    },
});
