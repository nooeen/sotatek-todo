import { useState, useEffect } from "react";
import {
  getLSItem,
  setLSItem,
  removeLSItem,
} from "../utils/handleLocalStorage";
import taskContext from "./task-context";

const TaskContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState([]);

  useEffect(() => {
    if (getLSItem("tasks")) {
      setTasks(getLSItem("tasks"));
    }
    setTasks(JSON.parse(getLSItem("tasks") || "[]"));
  }, []);

  const addTaskHandler = (task) => {
    setTasks((prevState) => {
      removeLSItem("tasks");
      setLSItem("tasks", JSON.stringify([...prevState, task]));
      return [...prevState, task];
    });
  };

  const updateTaskHandler = (task) => {
    setTasks((prevState) => {
      removeLSItem("tasks");
      const tasks = prevState.filter((element) => {
        return element.id !== task.id;
      });
      setLSItem("tasks", JSON.stringify([...tasks, task]));
      return [...tasks, task];
    });
  };

  const removeTaskHandler = (id) => {
    setTasks((prevState) => {
      removeLSItem("tasks");
      const tasks = prevState.filter((element) => {
        return element.id !== id;
      });
      setLSItem("tasks", JSON.stringify(tasks));
      return tasks;
    });
  };

  const addCheckedTask = () => {};

  const unCheckedTask = () => {};

  const clearCheckedTask = () => {};

  const removeCheckedTask = () => {};

  return (
    <taskContext.Provider
      value={{
        tasks: tasks,
        checkedTasks: checkedTasks,
        addCheckedTask: addCheckedTask,
        unCheckedTask: unCheckedTask,
        clearCheckedTask: clearCheckedTask,
        removeCheckedTask: removeCheckedTask,
        addTask: addTaskHandler,
        updateTask: updateTaskHandler,
        removeTask: removeTaskHandler,
      }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskContextProvider;
