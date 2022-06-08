import React from "react";

const taskContext = React.createContext({
  tasks: [],
  checkedTasks: [],
  addTask: (task) => {},
  updateTask: (task) => {},
  removeTask: (id) => {},
  addCheckedTask: (id) => {},
  unCheckedTask: (id) => {},
  clearCheckedTask: () => {},
  removeCheckedTask: (id) => {},
  notifyUnfinishedForm: () => {},
});

export default taskContext;
