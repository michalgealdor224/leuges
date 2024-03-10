import './App.css';
import React from "react";
import {BrowserRouter, BrowserRouter as Router, NavLink, Route, Routes} from "react-router-dom";
import LoginPage from "./LoginPage";
import SuperAdmin from "./SuperAdmin";
import DashboardPage from "./DashboardPage";
import SignUp from "./SignUp";
import Profile from "./Profile";


class App extends React.Component {

    render() {
        return (
            <div className="App">

                <BrowserRouter>
                    <NavLink id={"navLink1"} style={{margin: "10px"}} to={"/SignUp"}> SignUp </NavLink>
                    <NavLink id={"navLink1"} style={{margin: "10px"}} to={"/Profile"}> Profile </NavLink>

                    <Routes>
                            <Route path={"/"} element={<LoginPage/>}/>
                            <Route path={"SignUp"} element={<SignUp/>}/>
                            <Route path={"/Profile"} element={<Profile/>}/>
                            <Route path={"/super-admin"} element={<SuperAdmin/>}/>
                            <Route path={"/dashboard"} element={<DashboardPage/>}/>

                        </Routes>
                </BrowserRouter>


            </div>
        )
    }


}

export default App;
