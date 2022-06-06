import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import taskContext from "../../contexts/task-context";
import styles from "./ListTask.module.css";
import Task from "../../components/Task/Task";
import "react-toastify/dist/ReactToastify.css";

const ListTask = (props) => {
  const navigate = useNavigate();

  const navigateToAdd = () => {
    navigate("/new");
  };

  const taskCtx = useContext(taskContext);

  const [query, setQuery] = useState("");

  const queryHandler = (event) => {
    setQuery(event.target.value);
  };

  const [bulk, setBulk] = useState(false);

  useEffect(() => {
    taskCtx.checkedTasks.length > 0 ? setBulk(true) : setBulk(false);
  }, [taskCtx.checkedTasks]);

  const tasks = taskCtx.tasks
    .filter((element) => {
      if (query === "") {
        return element;
      } else return element.name.toLowerCase().includes(query.toLowerCase());
    })
    .sort(function (a, b) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  return (
    <div className={styles.listTask}>
      <h1 className={styles.title}>To do List</h1>
      <input
        className={styles.search}
        type="text"
        value={query}
        placeholder="Search ..."
        onChange={queryHandler}
      />
      {tasks.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          name={task.name}
          description={task.description}
          dueDate={task.dueDate}
          priority={task.priority}
        />
      ))}
      {bulk ? (
        <div className={styles.bulk}>
          <h1 className={styles.bulkTitle}>Bulk Action:</h1>
          <div className={styles.buttons}>
            <button
              className={styles.doneButton}
              onClick={taskCtx.clearCheckedTask}
            >
              Done
            </button>
            <button
              className={styles.removeButton}
              onClick={taskCtx.removeCheckedTask}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            className={styles.updateButton}
            type="submit"
            onClick={navigateToAdd}
          >
            Add Task
          </button>
        </div>
      )}
    </div>
  );
};

export default ListTask;
