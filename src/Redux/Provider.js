"use client"
import { Provider } from "react-redux";
import { store } from "./App/store";

export const Providers = ({children})=>{
    return <Provider store={store}>{children}</Provider>
}

