import React, {useState, useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import "./login.css";



function LoginPage() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorCode, setErrorCode] = useState("");
    const [success, setSuccess] = useState(false);
    const [userId, setUserId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('secret');
        if (token === undefined) {
            navigate("../")
        } else {
            navigate("../MyBets")
        }
    }, [])
    const login = () => {
        axios.get("http://localhost:8989/login", {
            params: {
                username: userName,
                password: password,
            }
        }).then(response => {
            if (response.data.success) {
                setErrorCode(null)
                setSuccess(true)
                setUserId(response.data.id)
                Cookies.set('secret', response.data.secret);
                navigate("../MyBets")
            } else {
                setErrorCode(response.data.errorCode)
            }
        })


    }
    const updateUserName = (e) => {
        setUserName(e.target.value);
    }
    const updatePassword = (e) => {
        setPassword(e.target.value);
    }



    return (

        <div>
            <table>
                <tr>
                    <td>
                        Username:
                    </td>
                    <td>
                        <input value={userName}
                               onChange={(event) => updateUserName(event)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Password:
                    </td>
                    <td>
                        <input type={"password"} value={password}
                               onChange={(event) => updatePassword(event)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onClick={login}>
                            Login
                        </button>
                    </td>
                </tr>
            </table>
            <div>
                <div>
                    {errorCode}
                </div>
            </div>
        </div>
    )

}

export default LoginPage;