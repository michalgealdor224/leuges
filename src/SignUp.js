import React from "react";
import axios from "axios";


class SignUp extends React.Component {

    state = {
        username : "",
        password : "",
        confirmPassword : "" ,
        email : "",
        ifSuccess : "",
        messageError : " "
    }



    sign = () => {
        axios.post("http://localhost:8989/add-user", null, {
                params : {
                    username : this.state.username,
                    password : this.state.password,
                    confirmPassword : this.state.confirmPassword,
                    email : this.state.email
                }
            }
        ).then((response) => {
            this.setState( {
                ifSuccess : response.data.success,
                messageError :response.data.errorCode

            })

        })
    }

    valueChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.ifSuccess?
                        <div>
                            <h1>ההרשמה בוצעה בהצלחה עבור לעמוד ההתחברות כדי להיכנס לאיזור האישי </h1>
                        </div>
                        :
                        <div >
                            <div>
                                <input onChange={(event) => this.valueChange("username", event)} value={this.state.username} type={"text"} placeholder={"enter user name :"}/>
                            </div>
                            <div>
                                <input onChange={(event) => this.valueChange("password", event)} value={this.state.password} type={"text"} placeholder={"enter password :"}/>
                            </div>
                            <div>
                                <input onChange={(event) => this.valueChange("confirmPassword", event)} value={this.state.confirmPassword} type={"text"} placeholder={"confirm password :"}/>

                            </div>
                            <div>
                                <input onChange={(event) => this.valueChange("email", event)} value={this.state.email} type={"text"} placeholder={"enter email :"}/>
                            </div>
                            <div>
                                <button onClick={this.sign}>sign up </button>
                            </div>


                            <div>
                                {this.state.messageError}
                            </div>



                        </div>
                }
            </div>

        )
    }

}
export default SignUp;