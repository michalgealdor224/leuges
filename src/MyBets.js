import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import React from "react";
import axios from "axios";

function MyBets(){
    const [myBets ,setMyBets] =useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        let token=Cookies.get('secret');
        if (token === undefined) {
            navigate("../")
        } else {
            console.log(token)
            getMyBets(token);
            const event =new EventSource("http://localhost:8989/start-streaming");
            event.onopen=function (){

            };
            event.onmessage =function (datalist){
                console.log(datalist.data)
                if(datalist.data){
                    console.log(datalist.data)
                    getMyBets();
                }

            }

        }
    }, [])

    const getMyBets=(token)=>{
        axios.get("http://localhost:8989/get-my-bets", {
            params:{
                secret:token
            }
        }).then(response => {
            setMyBets(response.data)
            console.log(response.data)

        })
    }
    return(
        <div>
            {
                myBets.length>0?
                    <table>
                        <thead>
                        <tr>
                            <th>Team 1</th>
                            <th>Team 2</th>
                            <th>Score Team 1</th>
                            <th>Score Team 2</th>
                            <th>Is Live</th>
                            <th>Your Bet</th>
                            <th>success</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            myBets.map(bet=>{
                                return(
                                    <tr>
                                        <td>{bet.game.teamA.name}</td>
                                        <td>{bet.game.teamB.name}</td>
                                        <td>{bet.game.scoreA}</td>
                                        <td>{bet.game.scoreB}</td>
                                        <td>{bet.game.live?"true":"false"}</td>
                                        <td>{bet.teamIsWin!=null?bet.teamIsWin.name:"Draw"}<br/> {bet.teamAScore}:{bet.teamBScore}</td>
                                        <td>{bet.success?"true":"false"}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    :
                    <h1>No bets right now!</h1>

            }

        </div>
    )

}
export default MyBets;