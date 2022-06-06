import { useContext, useState, useEffect } from "react";
import taskContext from "../../contexts/task-context";
import styles from "./Task.module.css";
import getTodayDate from "../../utils/getTodayDate";

const Task = (props) => {
  const taskCtx = useContext(taskContext);

  const [showDetail, setShowDetail] = useState(false);

  const [checked, setChecked] = useState(false);

  const checkboxHandler = () => {
    setChecked((prevState) => {
      if (prevState) {
        taskCtx.unCheckedTask(props.id);
      } else {
        taskCtx.addCheckedTask(props.id);
      }
      return !prevState;
    });
  };

  useEffect(() => {
    if (taskCtx.checkedTasks.includes(props.id)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [props.id, taskCtx.checkedTasks]);

  const [taskName, setTaskName] = useState(props.name);
  const [taskDescription, setTaskDescription] = useState(props.description);
  const [taskPriority, setTaskPriority] = useState(props.priority);
  const [taskDueDate, setTaskDueDate] = useState(props.dueDate);

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

  const removeHandler = () => {
    taskCtx.removeTask(props.id);
    return;
  };

  const toggleDetailHandler = () => {
    setShowDetail(!showDetail);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (taskName === "" || taskDescription === "" || taskDueDate === "") {
      return;
    }

    if (taskPriority === "") {
      setTaskPriority("normal");
    }

    const task = {
      id: props.id,
      name: taskName,
      description: taskDescription,
      priority: taskPriority,
      dueDate: taskDueDate,
    };
    taskCtx.updateTask(task);
  };

  return (
    <div className={styles.task}>
      <div>
        <div className={styles.nameCheckbox}>
          <input
            type="checkbox"
            className={styles.checkbox}
            onChange={checkboxHandler}
            checked={checked}
          />
          <h1 className={styles.name}>{props.name}</h1>
        </div>
        <div className={styles.buttons}>
          <button className={styles.detailButton} onClick={toggleDetailHandler}>
            Detail
          </button>
          <button className={styles.removeButton} onClick={removeHandler}>
            Remove
          </button>
        </div>
      </div>
      {showDetail && (
        <form className={styles.form}>
          <input
            className={styles.nameInput}
            type="text"
            value={taskName}
            placeholder="Add new task ..."
            onChange={taskNameHandler}
          />
          <br />
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
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default Task;
