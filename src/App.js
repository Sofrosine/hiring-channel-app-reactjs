import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginCompany from './Components/Login/LoginCompany';
import LoginEngineer from './Components/Login/LoginEngineer';
import Home from './Components/Home/Home';
import HomePage from './Components/Home/Company/HomePage';
import InsertData from './Components/CRUDPage/Engineer/InsertData';
import UpdateData from './Components/CRUDPage/Engineer/UpdateData';
import EditSkill from './Components/CRUDPage/Engineer/Skill/EditSkill';
import EngineerList from './Components/HomeList/EngineerList';
import UserEngineer from './Components/Home/UserEngineer';
import 'materialize-css/dist/css/materialize.min.css';
import EngineerProfile from './Components/Home/Engineer/EngineerProfile';
import EngineerHome from './Components/Home/Engineer/EngineerHome';
import EngineerProject from './Components/Home/Engineer/EngineerProject';
import CompanyProject from './Components/Home/Company/CompanyProject';
import AddProject from './Components/Home/Company/AddProject';
import CompanyListProject from './Components/Home/Company/CompanyListProject';
import CompanyProfile from './Components/CRUDPage/Company/CompanyProfile';
import InsertDataCompany from './Components/CRUDPage/Company/InsertDataCompany';

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/company/home" component={HomePage} />
      <Route path="/company/progress" component={CompanyProject} />
      <Route path="/company/project" component={CompanyListProject} />
      <Route path="/company/profile" component={CompanyProfile}/>
      <Route path="/company/insert" component={InsertDataCompany}/>
      <Route exact path="/login/company" component={LoginCompany} />
      <Route path="/login/engineer" component={LoginEngineer} />
      <Route exact path="/engineer/profile" component={EngineerProfile} />
      <Route path="/engineer/project" component={EngineerProject} />
      <Route path="/engineer/home" component={EngineerHome} />
      <Route path="/engineer/insert" component={InsertData} />
      <Route path="/engineer/update" component={UpdateData} />
      <Route path="/engineer/skill" component={EditSkill} />
      <Route path="/list" component={EngineerList} />
      <Route exact path="/user/:userId" component={UserEngineer} />
      <Route path="/user/:userId/hire" component={AddProject} />
      
    </Router>
  );
}

export default App;
