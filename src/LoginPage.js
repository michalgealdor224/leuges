import React, {useState} from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import Profile from "./Profile";


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
                const cookies = new Cookies(null, {path: '/'})
                cookies.set('id', response.data.id);
                cookies.set('secret', response.data.secret);
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
                {this.state.success ? <Profile id = {this.state.id}/> : this.state.id}
            </div>
        )
    }
}

export default LoginPage;