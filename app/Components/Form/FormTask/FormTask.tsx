import React, { useRef, useState } from "react";
import classNames from "classnames";
import styles from "./FormTask.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useBoardsStore } from "@/app/Stores/useBoards";
import Button from "../Components/Button/Button";
import StatusList from "../../StatusList/StatusList";
import Input from "../Components/Input/Input";
import TextArea from "../Components/TextArea/TextArea";
import InputList from "../Components/InputList/InputList";
import type { FormInputs } from "@/app/Types/Types";

type FormTaskProps = {
  taskId?: number;
};

function FormTask({ taskId }: FormTaskProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const task = useBoardsStore((state) =>
    state.tasks.filter((task) => task.id === taskId)
  );

  const addTask = useBoardsStore((state) => state.addTask);
  const openTaskForm = useBoardsStore((state) => state.openTaskForm);

  const [subtaskIdToDelete, setSubtaskIdToDelete] = useState<number[]>([]);

  const addIdToDelete = (idToAdd: number) => {
    setSubtaskIdToDelete((current) => [...current, idToAdd]);
  };

  const closeForm = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elementCliked = event.target as HTMLElement;
    if (!formRef.current?.contains(elementCliked)) {
      openTaskForm(false);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    if (taskId !== undefined) {
      // modifyBoard(data, boardId);
      // subtaskIdToDelete.forEach((id) => deleteColumn(id));
      // openBoardForm(false);
    } else {
      addTask(data);
      openTaskForm(false);
    }
  };

  return (
    <div
      className={classNames(styles.container)}
      onClick={closeForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <form ref={formRef} className={classNames(styles.formContainer)}>
        <p className={classNames(styles.title)}>
          {taskId !== undefined
            ? "Modifier la tâche"
            : "Ajouter une nouvelle tâche"}
        </p>
        <Input
          label="Nom de la tâche"
          type="text"
          fieldName="taskName"
          register={register}
          errors={errors}
          notNull={true}
          placeholder="ex : Faire une pause café"
          content={task.length > 0 ? task[0].title : undefined}
        />
        <TextArea
          label="Description"
          fieldName="description"
          register={register}
          errors={errors}
          rows={5}
          placeholder="ex : C'est toujours bon de faire un break. Une pause de 15min pour recharger les batteries."
          content={task.length > 0 ? task[0].description : undefined}
        />
        <InputList
          title="Sous-tâches"
          type="subtask"
          register={register}
          errors={errors}
          addIdToDelete={addIdToDelete}
          placeHolder={["ex: Faire le café", "ex: Boire un café et sourire"]}
        />
        <StatusList register={register} setValue={setValue} />
        <Button
          color="purple"
          size="medium"
          width="auto"
          onClick={handleSubmit(onSubmit)}
        >
          {taskId !== undefined ? "Sauvegarder" : "Créer"}
        </Button>
      </form>
    </div>
  );
}

export default FormTask;