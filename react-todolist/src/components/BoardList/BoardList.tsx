import { useState, type FC } from "react";
import { useTypedSelector } from "../../hooks/redux";
import { FiPlusCircle } from "react-icons/fi";
import { SideForm } from "../SideForm/SideForm";

type BoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

export const BoardList: FC<> = ({ activeBoardId, setActiveBoardId }) => {
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div>
      <div>게시판:</div>
      {boardArray.map((board, index) => (
        <div key={board.boardId}>
          <div>{board.boardName}</div>
        </div>
      ))}
      <div>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle onClick={() => setIsFormOpen(!isFormOpen)} />
        )}
      </div>
    </div>
  );
};
