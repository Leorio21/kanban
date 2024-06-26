import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./StatusList.module.css";
import { useBoardsStore } from "@/app/Stores/useBoards";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { TFormInputs } from "@/app/Types/Types";

const cx = classNames.bind(styles);

type StatusListProps = {
  register?: UseFormRegister<TFormInputs>;
  setValue?: UseFormSetValue<TFormInputs>;
  status?: string;
  taskColumnId?: number;
};

function StatusList({
  register,
  setValue,
  status,
  taskColumnId,
}: StatusListProps) {
  const statusRef = useRef<HTMLDivElement>(null);
  const [statusSelected, setStatusSelected] = useState(status || "");
  const [isOpenStatusList, setIsOpenStatusList] = useState(false);
  const columnsBoard = useBoardsStore((state) =>
    state.columns.filter((column) => column.boardId === state.activeBoard)
  );
  const activeTask = useBoardsStore((state) => state.activeTask);
  const changeTaskStatus = useBoardsStore((state) => state.changeTaskStatus);
  const updateTasks = useBoardsStore((state) => state.updateTasks);

  const closeStatusList = () => {
    setIsOpenStatusList((current) => !current);
  };

  const onSelectStatus = (newStatus: string, colId: number) => {
    setStatusSelected(newStatus);
    setIsOpenStatusList(false);
    if (setValue !== undefined) {
      setValue("status", newStatus);
      setValue("colId", colId.toString());
    } else {
      changeTaskStatus(colId);
      updateTasks(true);
    }
  };

  useEffect(() => {
    if (statusRef.current) {
      statusRef.current.addEventListener("mouseleave", () => {
        setIsOpenStatusList(false);
      });
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      statusRef.current?.removeEventListener;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTask]);
  return (
    <div ref={statusRef} className={cx("statusContainer")}>
      <p className={cx("subTitle")}>Status Actuel</p>
      <p
        className={cx("currentStatus", "button", {
          currentStatusActive: isOpenStatusList,
        })}
        onClick={closeStatusList}
      >
        <input
          type="text"
          style={{ display: "none" }}
          defaultValue={status !== undefined ? status : columnsBoard[0].name}
          {...register?.("status")}
        />
        <input
          type="text"
          style={{ display: "none" }}
          defaultValue={
            taskColumnId !== undefined ? taskColumnId : columnsBoard[0].id
          }
          {...register?.("colId")}
        />
        <span>{statusSelected ? statusSelected : columnsBoard[0].name}</span>
        <svg
          className={cx("chevron", {
            rotateChevron: isOpenStatusList,
          })}
          width="10"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6" />
        </svg>
      </p>
      <div
        className={cx("statusList", {
          hidden: !isOpenStatusList,
          statusListOpen: isOpenStatusList,
        })}
      >
        {columnsBoard.map((column) => (
          <p
            key={column.id}
            className={cx("statusListItem")}
            onClick={() => onSelectStatus(column.name, column.id)}
          >
            {column.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default StatusList;
