import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Redux/App/store";



// Typed version of useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;