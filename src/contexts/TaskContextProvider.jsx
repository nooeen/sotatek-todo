import { useState, useEffect } from "react";
import {
  getLSItem,
  setLSItem,
  removeLSItem,
} from "../utils/handleLocalStorage";
import taskContext from "./task-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    toast("Task added!", { hideProgressBar: true });
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
    toast("Task updated!", { hideProgressBar: true });
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
    toast("Task removed!", { hideProgressBar: true });
  };

  const addCheckedTask = (id) => {
    setCheckedTasks((prevState) => {
      return [...prevState, id];
    });
  };

  const unCheckedTask = (id) => {
    setCheckedTasks((prevState) => {
      return prevState.filter((element) => element !== id);
    });
  };

  const clearCheckedTask = () => {
    setCheckedTasks([]);
  };

  const removeCheckedTask = () => {
    checkedTasks.forEach((element) => removeTaskHandler(element));
    setCheckedTasks([]);
    toast("Tasks removed!", { hideProgressBar: true });
  };

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
      <ToastContainer />
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskContextProvider;
