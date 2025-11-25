import{configureStore} from "@reduxjs/toolkit";
import driversReducer from "./driverSlice";

export const store = configureStore({
    reducer: {
        drivers: driversReducer,
    }
}
);