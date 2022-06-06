import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import taskContext from "../../contexts/task-context";
import styles from "./ListTask.module.css";
import Task from "../../components/Task/Task";

const ListTask = (props) => {
  const taskCtx = useContext(taskContext);

  const [query, setQuery] = useState("");
  const [bulk, setBulk] = useState(false);

  const queryHandler = (event) => {
    setQuery(event.target.value);
  };

  const navigate = useNavigate();

  const navigateToAdd = () => {
    navigate("/new");
  };

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
        <div></div>
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
