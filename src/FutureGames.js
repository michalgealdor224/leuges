import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {useState} from "react";
import axios from "axios";
import React from "react";

function FutureGames(){
    const [futureGames,setFutureGames]=useState([]);
    const [token,setToken]=useState("");
    const navigate = useNavigate();
    useEffect(() => {
        setToken(Cookies.get('secret'));
        axios.get("http://localhost:8989/get-future-games", {

        }).then(response => {
            setFutureGames(response.data)

        })
    }, [])
    const bet=(gameId)=>{
        navigate(`/BetPage/${gameId}`)
    }

    return(
        <div>
            <div>
                <table>
                    <thead>
                    <tr >
                        <th>Team 1</th>
                        <th>Team 2</th>
                        <th>Round</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        futureGames.map((game,i) =>{
                            return(

                                <tr >
                                    <td>{game.teamA.name}</td>
                                    <td>{game.teamB.name}</td>
                                    <td>{game.round+1}</td>
                                    <td><button onClick={()=>bet(game.id)}>המר</button></td>
                                </tr>

                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default FutureGames;