import { configureStore } from "@reduxjs/toolkit";
import { mainSlice } from "./mainSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        mainSlice: mainSlice.reducer
    }
})

export const useAppDispatch:()=>typeof store.dispatch=useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector;