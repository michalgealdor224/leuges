import React from "react";

function GameTable(props){
    return(
        <div>
            <table>
                <thead>
                <tr >
                    <th>Team 1</th>
                    <th>Team 2</th>
                    <th>Score Team 1</th>
                    <th>Score Team 2</th>
                    <th>Round</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.games.map((liveGame,i) =>{
                        return(
                            <tr>
                                <td>{liveGame.teamA.name}</td>
                                <td>{liveGame.teamB.name}</td>
                                <td>{liveGame.scoreTeamA}</td>
                                <td>{liveGame.scoreTeamB}</td>
                                <td>{liveGame.round+1}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
export default GameTable;