import "./App.css";
import { AppContainer } from "./App.css";
import { BoardList } from "./components/BoardList/BoardList";
import { useState } from "react";

function App() {
  const [activeBoardId, setActiveBoardId] = useState("board-0');
  return (
    <div className={AppContainer}>
      <div>
        <BoardList activeBoardId={activeBoardId} setActiveBoardId={setActiveBoardId}/>
      </div>

      <div>
        <button>이 게시판 삭제하기</button>
        <button>활동 목록 보이기</button>
      </div>
    </div>
  );
}

export default App;
