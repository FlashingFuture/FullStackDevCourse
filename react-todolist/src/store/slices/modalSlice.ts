import { createSlice } from "@reduxjs/toolkit";
import type { ITask } from "../../types";

type TModalState = {
  boardId: string;
  listId: string;
  task: ITask;
};

const initialState: TModalState = {
  boardId: "board-0",
  listId: "list-0",
  task: {
    taskId: "task-0",
    taskName: "task 0",
    taskDescrpition: "task descrpition",
    taskOwner: "kiyoung",
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {},
});

export const modalReducer = modalSlice.reducer;
