import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginCompany from './Components/Login/LoginCompany';
import LoginEngineer from './Components/Login/LoginEngineer';
import Home from './Components/Home/Home';
import HomePage from './Components/Home/Company/HomePage';
import EngineerHome from './Components/Home/Engineer/EngineerHome';
import InsertData from './Components/CRUDPage/Engineer/InsertData';
import UpdateData from './Components/CRUDPage/Engineer/UpdateData';
import EditSkill from './Components/CRUDPage/Engineer/Skill/EditSkill';
import EngineerList from './Components/HomeList/EngineerList';
import UserEngineer from './Components/Home/UserEngineer';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}/>
      <Route path="/company/home" component={HomePage}/>
      <Route exact path="/login/company" component={LoginCompany}/>
      <Route path="/login/engineer" component={LoginEngineer}/>
      <Route exact path="/engineer/home" component={EngineerHome}/>
      <Route path="/engineer/insert" component={InsertData}/>
      <Route path="/engineer/update" component={UpdateData}/>
      <Route path="/engineer/skill" component={EditSkill} />
      <Route path="/list" component={EngineerList}/>
      <Route path="/user/:userId" component={UserEngineer}/>
    </Router>
  );
}

export default App;
