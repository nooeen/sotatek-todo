import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import getTodayDate from "../../utils/getTodayDate";
import taskContext from "../../contexts/task-context";
import styles from "./NewTask.module.css";

const NewTask = (props) => {
  const taskCtx = useContext(taskContext);

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("normal");
  const [taskDueDate, setTaskDueDate] = useState(getTodayDate());

  const taskNameHandler = (event) => {
    setTaskName(event.target.value);
  };

  const taskDescriptionHandler = (event) => {
    setTaskDescription(event.target.value);
  };

  const taskPriorityHandler = (event) => {
    setTaskPriority(event.target.value);
  };

  const taskDueDateHandler = (event) => {
    setTaskDueDate(event.target.value);
  };

  const resetForm = () => {
    setTaskName("");
    setTaskDescription("");
    setTaskPriority("normal");
    setTaskDueDate(getTodayDate());
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (taskName === "" || taskDescription === "" || taskDueDate === "") {
      taskCtx.notifyUnfinishedForm();
      return;
    }

    if (taskPriority === "") {
      setTaskPriority("normal");
    }

    const task = {
      id: uuidv4(),
      name: taskName,
      description: taskDescription,
      priority: taskPriority,
      dueDate: taskDueDate,
    };
    taskCtx.addTask(task);
    resetForm();
  };

  return (
    <div className={styles.newTask}>
      <h1 className={styles.title}>New Task</h1>
      <form className={styles.form}>
        <input
          className={styles.nameInput}
          type="text"
          value={taskName}
          placeholder="Add new task ..."
          onChange={taskNameHandler}
        />
        <label className={styles.label}>Description</label>
        <br />
        <textarea
          className={styles.descriptionTextArea}
          type="text"
          value={taskDescription}
          onChange={taskDescriptionHandler}
        />
        <div className={styles.dueDateAndPriorityTable}>
          <div className={styles.dueDateAndPriorityRow}>
            <div className={styles.dueDateCell}>
              <label className={styles.label}>Due Date</label>
            </div>
            <div className={styles.priorityCell}>
              <label className={styles.label}>Task Priority</label>
            </div>
          </div>
          <div className={styles.dueDateAndPriorityRow}>
            <div className={styles.dueDateCell}>
              <input
                className={styles.dueDateInput}
                type="date"
                value={taskDueDate}
                min={getTodayDate()}
                onChange={taskDueDateHandler}
              />
            </div>
            <div className={styles.priorityCell}>
              <select
                className={styles.priorityInput}
                value={taskPriority}
                onChange={taskPriorityHandler}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
        <br />
        <button
          className={styles.submitButton}
          type="submit"
          onClick={submitHandler}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default NewTask;
