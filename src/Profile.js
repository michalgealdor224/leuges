import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Profile () {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [balance, setBalance] = useState("");
    const [errorCode, setErrorCode] = useState(false);
    const [success, setSuccess] = useState(false);
    const [userId, setUserId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('secret');
        if (token === undefined) {
            navigate("../")
        } else {
            getDataOfUser();
        }
    }, [])



    const getDataOfUser = () => {
        const userSecret = Cookies.get("secret")
        axios.post("http://localhost:8989/get-data", null, {
                params: {
                    secret: userSecret
                }
            }
        ).then((response) => {

            setUserName(response.data.user.username)
            setPassword(response.data.user.password)
            setUserEmail(response.data.user.email)
            setBalance(response.data.user.balance)

        })
    }

    const setData = () => {
        axios.post("http://localhost:8989/set-data", null, {
            params: {
                id: userId,
                username: userName,
                password: password,
                email: userEmail
            }
        }).then((response) => {
            console.log(response.data)
            if (!response.data.success) {
                setErrorCode(true)
            }
        });
    }
    const updateUserName = (e) => {
        setUserName(e.target.value);
    }
    const updatePassword = (e) => {
        setPassword(e.target.value);
    }
    const updateEmail = (e) => {
        setUserEmail(e.target.value);
    }


    return (
        <div>

            <div>
                <input value={userName}
                       onChange={(event) => updateUserName(event)}/>
            </div>

            <div>
                <input type={"password"} value={password}
                       onChange={(event) => updatePassword(event)}/>
            </div>

            <div>
                <input value={userEmail}
                       onChange={(event) => updateEmail( event)}/>
            </div>
            <div>
                <input value={balance}
                       disabled={true}/>
            </div>


            <button onClick={setData}>change data</button>
        </div>


    )

}

export default Profile;