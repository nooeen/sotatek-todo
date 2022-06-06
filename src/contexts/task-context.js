import React from "react";

const taskContext = React.createContext({
  tasks: [],
  addTask: (task) => {},
  updateTask: (id, task) => {},
  removeTask: (id) => {},
});

export default taskContext;
