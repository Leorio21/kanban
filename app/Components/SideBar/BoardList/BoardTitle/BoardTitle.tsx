import React from "react";
import type { TBoard } from "@/app/Types/Types";
import Card from "@/app/Components/Card/Card";
import { useBoardsStore } from "@/app/Stores/useBoards";

type BoardTitleProps = {
  board?: TBoard;
};

function BoardTitle({ board }: BoardTitleProps) {
  const changeActiveBoard = useBoardsStore((state) => state.changeActiveBoard);
  const openBoardForm = useBoardsStore((state) => state.openBoardForm);

  if (board) {
    return (
      <Card
        boardName={board.name}
        boardId={board.id}
        onClick={() => changeActiveBoard(board.id)}
      >
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
            fill="#828FA3"
          />
        </svg>
        {board.name}
      </Card>
    );
  }

  return (
    <Card addNewBoard={true} onClick={() => openBoardForm(true, "new")}>
      <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
          fill="#828FA3"
        />
      </svg>
      <p>
        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#828FA3"
            d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
          />
        </svg>
        &nbsp;&nbsp;Nouveau Tableau
      </p>
    </Card>
  );
}

export default BoardTitle;
