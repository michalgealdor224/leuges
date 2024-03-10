import React from "react";
import axios from "axios";


class Profile extends React.Component {

    state = {
        username : "" ,
        password : "",
        email : "",
        id : ""
    }


    getDataOfUser = () => {

        axios.post("http://localhost:8989/get-data", null, {

            }
        ).then((response) => {
            this.setState( {
                username : response.data.username,
                password : response.data.password,
                email : response.data.email

            })
        })
    }


    render() {
        return (
            <div>
                <button onClick={this.getDataOfUser}></button>
                {this.state.username}
                {this.state.password}
                {this.state.email}
            </div>


        )
    }


}
export default Profile;