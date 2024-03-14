import React, {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";



class LoginPage extends React.Component {

    state = {
        username: "", email: "", password: ""
        , errorCode: null, success: false, id: ""
    }

    login = () => {
        axios.get("http://localhost:8989/login", {
            params: {
                username: this.state.username,
                password: this.state.password,
            }
        }).then(response => {
            if (response.data.success) {
                this.setState({
                    errorCode: null,
                    success: true,
                    id: response.data.id
                })
                Cookies.set('secret', response.data.secret);
                //window.locate.replace('./dashboard')
            } else {
                this.setState({
                    errorCode: response.data.errorCode
                })
            }
        })


    }
    inputChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })

    }

    render() {

        return (

            <div>
                <table>
                    <tr>
                        <td>
                            Username:
                        </td>
                        <td>
                            <input value={this.state.username}
                                   onChange={(event) => this.inputChange("username", event)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Password:
                        </td>
                        <td>
                            <input type={"password"} value={this.state.password}
                                   onChange={(event) => this.inputChange("password", event)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={this.login}>
                                Login
                            </button>
                        </td>
                    </tr>
                </table>
                <div>
                    <div>
                        {this.state.errorCode}
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;