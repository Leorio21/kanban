import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ViewTask.module.css";
import { ElipsisMenu, Item } from "../ElipsisMenu/ElipsisMenu";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Delete from "../Delete/Delete";
import Button from "../Form/Components/Button/Button";
import SubTask from "./SubTask/SubTask";
import StatusList from "../StatusList/StatusList";

const cx = classNames.bind(styles);

function ViewTask() {
  const taskRef = useRef<HTMLDivElement>(null);
  const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);

  const task = useBoardsStore((state) =>
    state.tasks.filter((task) => task.id === state.activeTask)
  );
  const subtasks = useBoardsStore((state) =>
    state.subTasks.filter((subtask) => subtask.taskId === task[0].id)
  );
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
    <section className={cx("container")} onClick={closeTask}>
      <div ref={taskRef}>
        <article className={cx("taskContainer", { hidden: isOpenDeleteForm })}>
          <div className={cx("titleContainer")}>
            <p className={cx("title")}>{task[0].title}</p>
            <ElipsisMenu position="task">
              <Item>Modifier la tâche</Item>
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
              <SubTask key={index} {...subtask} />
            ))}
          </div>
          <StatusList status={task[0].status} />
        </article>
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
              width="auto"
              onClick={() => openCloseDeleteForm(false)}
            >
              Annuler
            </Button>
          </Delete>
        )}
      </div>
    </section>
  );
}

export default ViewTask;
