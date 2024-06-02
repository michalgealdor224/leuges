import React, {useEffect,useState} from "react";
import axios from "axios";
import GameTable from "./GameTable";

function TableLeague(){
    const [tableLeague,setTableLeague]=useState([]);
    const [gamesTable,setGamesTable] =useState([]);
    const [errorCode, setErrorCode] = useState("");
    useEffect(()=>{
        axios.get("http://localhost:8989/get-table", {

        }).then(response => {
            setTableLeague(response.data)

        })
        axios.get("http://localhost:8989/get-games-played", {

        }).then(response => {
            setGamesTable(response.data)

        })
    },[])
    return(
        <div >
            <div>
                {
                    tableLeague!==undefined?
                        <table>
                            <thead>
                            <tr id={"table-row-header"}>
                                <th>Team Name</th>
                                <th>Draws</th>
                                <th>wins</th>
                                <th>loses</th>
                                <th>goals Scored</th>
                                <th>goalsConceded</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                tableLeague.map((team,i) =>{
                                    return(
                                        <tr>
                                            <td>{team.name}</td>
                                            <td>{team.draws}</td>
                                            <td>{team.wins}</td>
                                            <td>{team.loses}</td>
                                            <td>{team.goalsScored}</td>
                                            <td>{team.goalsConceded}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        :
                        <div></div>
                }
            </div>
            <GameTable games={gamesTable}/>

        </div>

    )
}
export default TableLeague;