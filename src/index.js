import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListTask from "./pages/ListTask/ListTask";
import NewTask from "./pages/NewTask/NewTask";
import TaskContextProvider from "./contexts/TaskContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <TaskContextProvider>
      <Routes>
        <Route path="/" element={<ListTask />} />
        <Route path="/new" element={<NewTask />} />
      </Routes>
    </TaskContextProvider>
  </BrowserRouter>
);
