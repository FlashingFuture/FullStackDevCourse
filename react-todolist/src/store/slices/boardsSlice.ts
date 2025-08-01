import { createSlice } from "@reduxjs/toolkit";
import type { IBoard } from "../../types";

type TBoardsState = {
  modalActive: boolean;
  boardArray: IBoard[];
};

const initialState: TBoardsState = {
  modalActive: false,
  boardArray: [
    {
      boardId: "board-0",
      boardName: "첫 번째 게시물",
      lists: [
        {
          listId: "list-0",
          listName: "list 1",
          tasks: [
            {
              taskId: "task-0",
              taskName: "Task 1",
              taskDescrpition: "Description",
              taskOwner: "John",
            },
            {
              taskId: "task-1",
              taskName: "Task 2",
              taskDescrpition: "Description",
              taskOwner: "John",
            },
          ],
        },
        {
          listId: "list-1",
          listName: "list 2",
          tasks: [
            {
              taskId: "task-2",
              taskName: "Task 3",
              taskDescrpition: "Description",
              taskOwner: "John",
            },
            {
              taskId: "task-3",
              taskName: "Task 4",
              taskDescrpition: "Description",
              taskOwner: "John",
            },
          ],
        },
      ],
    },
  ],
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
});

export const boardsReducer = boardsSlice.reducer;
