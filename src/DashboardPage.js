import React, {useState, useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";

function DashboardPage (){
    const [liveGamesTable,setLiveGamesTable]=useState([]);
    const [isLiveGamesTable,setIsLiveGamesTable]=useState(false);
    const [errorCode, setErrorCode] = useState("");

    /* useEffect(()=>{
         axios.get("http://localhost:8989/get-live-games", {

         }).then(response => {
             if(response.data.success){
                 setLiveGamesTable(response.data.liveGames)
             }
             else{
                 setErrorCode(response.data.errorCode)
             }

         })
     },[])*/
    return (
        <div>
            {
                !isLiveGamesTable?
                    <div>
                        <h1>There are no game at the moment.</h1>
                    </div>
                    :
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>Team 1</th>
                                <th>Team 2</th>
                                <th>Score Team 1</th>
                                <th>Score Team 2</th>
                                <th>Score Team 2</th>
                                <th>Round</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                liveGamesTable.map((liveGame,i) =>{
                                    return(
                                        <tr>
                                            <td>liveGame.team1</td>
                                            <td>liveGame.team2</td>
                                            <td>liveGame.ScoreTeam1</td>
                                            <td>liveGame.ScoreTeam2</td>
                                            <td>liveGame.round</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
            }

        </div>
    )

}
export default DashboardPage;