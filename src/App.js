import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import SignUp from "./SignUp";
import Profile from "./Profile";
import TableLeague from "./TableLeague";
import NavBar from "./NavBar";
import AuthProvider from "./AuthProvider";
import MyBets from "./MyBets";
import FutureGames from "./FutureGames";
import BetPage from "./BetPage";


function App() {

    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <NavBar/>
                    <div className="container">
                        <div>
                            <Routes>
                                <Route path={"/"} element={<LoginPage/>}/>
                                <Route path={"/signUp"} element={<SignUp/>}/>
                                <Route path={"/Profile"} element={<Profile/>}/>
                                <Route path={"/dashboard"} element={<DashboardPage/>}/>
                                <Route path={"/TableLeague"} element={<TableLeague/>}/>
                                <Route path={"/MyBets"} element={<MyBets/>}/>
                                <Route path={"/FutureGames"} element={<FutureGames/>}/>
                                <Route path={"/BetPage/:gameId"} element={<BetPage/>}/>
                            </Routes>
                        </div>
                    </div>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}

export default App;