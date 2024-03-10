import React from "react";
import axios from "axios";

class SuperAdmin extends React.Component {

    state = {
        users: []
    }

    componentDidMount() {
        axios.get("http://localhost:8989/get-users").then(response => {
            this.setState({
                users: response.data
            })
        })
    }


    render() {
        return (
            <div className="App">

                <div>
                    {this.state.users.map(item => {
                        return (
                            <div>
                                <span> {item.username}</span>
                                <button> login as</button>
                            </div>
                        )
                    })}
                </div>


            </div>
        );
    }


}

export default SuperAdmin;