import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './dashboard';
import Leave from './leave'
import EmployeeList from "./employee";
import Attendance from "./attendance";
function App(){
  return <div>
      <BrowserRouter>
      <Routes>
    
          <Route path="/" element={<Signup/>}/>
          <Route path ="/login" element={<Login/>} />
          <Route path ="/dashboard" element={<Dashboard/>} />
          <Route path ="/leave" element={<Leave/>} />
          <Route path ="/employee" element={<EmployeeList/>}/>
          <Route path ="/attendance" element={<Attendance/>}/>


               </Routes>



      </BrowserRouter>
  </div>}

export default App;
