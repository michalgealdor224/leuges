import React from "react";
import axios from "axios";


class Profile extends React.Component {

    state = {
        username : "" ,
        password : "",
        email : "",
        id : "",
        isChangeName : false,
        newUsername : "", newPassword: "" ,newEmail : ""
    }

    componentDidMount() {
        this.getDataOfUser();
    }


    getDataOfUser = (props) => {
        axios.post("http://localhost:8989/get-data", null, {
            params:{
                id:this.props.id
            }
            }
        ).then((response) => {
            this.setState( {
                username : response.data.username,
                password : response.data.password,
                email : response.data.email
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
                console.log(this.state.newPassword)
                this.setState({
                    isChangeName: response.data
                });
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
                           onChange={(event) => this.inputChange("username", event)} />
                </div>

                <div>
                    <input type={"password"}  value={this.state.password}
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