import { useDispatch, type TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();

export const logger = useSelector((state: RootState) => state.logger);

// interface Obj<T> {
//   name: T;
// }

// interface State {
//   state: {
//     data: string;
//     loading: boolean;
//   };
// }

// const obj: Obj<State> = {
//   name: {
//     state: {
//       data: "abcd",
//       loading: false,
//     },
//   },
// };
