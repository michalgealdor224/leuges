import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

class Profile extends React.Component {

    state = {
        username: "",
        password: "",
        email: "",
        id: "",
        newUsername: "", newPassword: "", newEmail: ""
    }

    componentDidMount() {
        this.getDataOfUser();
    }


    getDataOfUser = () => {
        const userSecret = Cookies.get("secret")
        axios.post("http://localhost:8989/get-data", null, {
                params: {
                    secret: userSecret
                }
            }
        ).then((response) => {
            this.setState({
                username: response.data.user.username,
                password: response.data.user.password,
                email: response.data.user.email
            })
        })
    }

    setData = () => {
        axios.post("http://localhost:8989/set-data", null, {
            params: {
                id: this.props.id,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }
        }).then((response) => {
            console.log(response.data)
            if (!response.data.success) {
                this.setState({
                    error: true
                });
            }
        });
    }

    inputChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })

    }


    render() {
        return (
            <div>

                <div>
                    <input value={this.state.username}
                           onChange={(event) => this.inputChange("username", event)}/>
                </div>

                <div>
                    <input type={"password"} value={this.state.password}
                           onChange={(event) => this.inputChange("password", event)}/>
                </div>

                <div>
                    <input value={this.state.email}
                           onChange={(event) => this.inputChange("email", event)}/>
                </div>


                <button onClick={this.setData}>change data</button>
            </div>


        )
    }


}

export default Profile;