import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ViewTask.module.css";
import { ElipsisMenu, Item } from "../ElipsisMenu/ElipsisMenu";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Delete from "../Delete/Delete";
import Button from "../Form/Components/Button/Button";
import StatusList from "../StatusList/StatusList";
import Subtask from "./Subtask/Subtask";
import BackDrop from "../BackDrop/BackDrop";

const cx = classNames.bind(styles);

function ViewTask() {
  const taskRef = useRef<HTMLDivElement>(null);
  const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);

  const task = useBoardsStore((state) =>
    state.tasks.filter((task) => task.id === state.activeTask)
  );
  const subtasks = useBoardsStore((state) =>
    state.subtasks.filter((subtask) => subtask.taskId === task[0].id)
  );
  const openTaskForm = useBoardsStore((state) => state.openTaskForm);
  const displayTaskForm = useBoardsStore((state) => state.displayTaskForm);
  const changeActiveTask = useBoardsStore((state) => state.changeActiveTask);
  const deleteTask = useBoardsStore((state) => state.deleteTask);

  const closeTask = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elementClicked = event.target as HTMLDivElement;
    if (!taskRef.current?.contains(elementClicked)) {
      changeActiveTask(null);
    }
  };

  const openCloseDeleteForm = (newValue: boolean) => {
    setIsOpenDeleteForm(newValue);
  };

  const onDeleteHandler = () => {
    deleteTask();
    setIsOpenDeleteForm(false);
  };

  return (
    <BackDrop onClick={closeTask}>
      <article
        ref={taskRef}
        className={cx("taskContainer", { hidden: displayTaskForm.isOpen })}
      >
        <div className={cx({ hidden: isOpenDeleteForm })}>
          <div className={cx("titleContainer")}>
            <p className={cx("title")}>{task[0].title}</p>
            <ElipsisMenu position="task">
              <Item onClick={() => openTaskForm(true, "modify")}>
                Modifier la tâche
              </Item>
              <Item type="delete" onClick={() => openCloseDeleteForm(true)}>
                Supprimer la tâche
              </Item>
            </ElipsisMenu>
          </div>
          <p className={cx("description")}>{task[0].description}</p>
          <div className={cx("subtasksContainer")}>
            <p className={cx("subTitle")}>
              Sous-tâches (
              {subtasks.filter((subtask) => subtask.isCompleted == true).length}{" "}
              / {subtasks.length})
            </p>
            {subtasks.map((subtask, index) => (
              <Subtask key={index} subtask={subtask} />
            ))}
          </div>
          <StatusList status={task[0].status} taskColumnId={task[0].columnId} />
        </div>
        {isOpenDeleteForm && (
          <Delete type="task" name={task[0].title}>
            <Button
              color="red"
              size="medium"
              width="max"
              onClick={onDeleteHandler}
            >
              Supprimer
            </Button>
            <Button
              color="white"
              size="medium"
              width="max"
              onClick={() => openCloseDeleteForm(false)}
            >
              Annuler
            </Button>
          </Delete>
        )}
      </article>
    </BackDrop>
  );
}

export default ViewTask;
