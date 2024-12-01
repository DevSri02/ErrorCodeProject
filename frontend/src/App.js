import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Dashboard2 from "./components/Dashboard2";
import MyList from "./components/MyList";
import EditList from "./components/EditList";
import Search from "./components/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Dashboard2" element={<Dashboard2 />} />

        <Route path="/mylist" element={<MyList />} />
        <Route path="/edit-list/:listId" element={<EditList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
