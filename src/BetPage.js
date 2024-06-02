import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function BetPage(){
    let {gameId}=useParams();
    const [teamAName,setTeamAName] =useState();
    const [teamBName,setTeamBName] =useState();
    const [teamASkillLevel,setTeamASkillLevel] =useState(0);
    const [teamBSkillLevel,setTeamBSkillLevel] =useState(0);
    const [teamAScore,setTeamAScore] =useState(0);
    const [teamBScore,setTeamBScore] =useState(0);
    const [isDraw,setIsDraw] =useState(false);
    const [teamAWin,setTeamAWin] =useState(false);
    const [teamBWin,setTeamBWin] =useState(false);
    const [drawRatio,setDrawRatio] =useState(0);
    const [teamAWinRatio,setTeamAWinRatio] =useState(0);
    const [teamBWinRatio,setTeamBWinRatio] =useState(0);
    const [sum,setSum]=useState(0);
    const [amount,setAmount]=useState();
    const [double,setDouble] =useState(false);
    const [ratio,setRatio] =useState(0);
    const notify = (message) => toast(message);


    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get('secret');
        if (token === undefined) {
            navigate("../")
        } else {
            axios.post("http://localhost:8989/get-data", null, {
                    params: {
                        secret: token
                    }
                }
            ).then((response) => {
                setAmount(response.data.user.balance)
            })
            axios.get("http://localhost:8989/get-game-by-id", {
                params:{
                    gameId:gameId
                }
            }).then(response => {
                setTeamAName(response.data.teamA.name)
                setTeamBName(response.data.teamB.name)
                setTeamASkillLevel(response.data.teamA.skillLevel)
                console.log("team a level    :  " + response.data.teamA.skillLevel)
                setTeamBSkillLevel(response.data.teamB.skillLevel)
                console.log("team b level   :   " + response.data.teamB.skillLevel)
                calculateRatio();

            })
        }

    }, [])
    const calculateRatio = ()=>{
        if(teamASkillLevel>teamBSkillLevel)
        {
            setDrawRatio(1.5+ ((teamASkillLevel - teamBSkillLevel)/ 4 ))
            setTeamAWinRatio(4+((teamASkillLevel - teamBSkillLevel)/4))
            setTeamBWinRatio(4-((teamASkillLevel-teamBSkillLevel)/4))
        }
        else if(teamASkillLevel<teamBSkillLevel)
        {
            setDrawRatio(1.5 + (teamBSkillLevel-teamASkillLevel)/4)
            setTeamBWinRatio(4+(teamBSkillLevel-teamASkillLevel)/4)
            setTeamAWinRatio(4-(teamBSkillLevel-teamASkillLevel)/4)
        }
        else{
            setDrawRatio(1.5 )
            setTeamAWinRatio(4)
            setTeamBWinRatio(4)
        }
    }
    const scoreAChange = (e) => {
        setTeamAScore(e.target.value)
        isDraw&&
        setTeamBScore(e.target.value);
    }
    const scoreBChange = (e) => {
        setTeamBScore(e.target.value);
        isDraw&&
        setTeamAScore(e.target.value);
    }
    const chooseTeamAWin=()=>{
        setTeamAWin(!teamAWin);
        console.log(teamAWin)
        setIsDraw(false);
        setTeamBWin(false);
        teamAWin?setRatio(1):setRatio(teamAWinRatio);
    }
    const chooseTeamBWin=()=>{
        setTeamBWin(!teamBWin);
        console.log(teamBWin)
        setTeamAWin(false);
        setIsDraw(false);
        teamBWin?setRatio(1):setRatio(teamBWinRatio);
    }
    const chooseDraw=()=>{
        setIsDraw(!isDraw);
        console.log(isDraw)
        setTeamBWin(false);
        setTeamAWin(false);
        isDraw?setRatio(1):setRatio(drawRatio);
    }
    const sumChange =(e)=>{
        setSum(e.target.value);
    }
    const doubleIt = () => {
        setDouble(true);
        setRatio(ratio=>ratio*2);
    }
    const cancel=()=>{
        setDouble(false);
        setRatio(ratio=>ratio/2);
    }
    const sendBet = () => {
        axios.post("http://localhost:8989/send-bet", null,{
            params:{
                secret:Cookies.get('secret'),
                gameId:gameId,
                teamAWin:teamAWin,
                teamBWin:teamBWin,
                isDouble:double,
                teamAScore:teamAScore,
                teamBScore:teamBScore,
                sum:sum,
                ratio:ratio

            }
        }).then(response => {
            if(response.data.success){
                console.log(response.data.success)
                alert("The bet has been sent")
            }
            else{
                alert(response.data.errorCode)
            }
        })
    }
    return(
        <div>

            <h1>{teamAName} V.S  {teamBName}</h1>
            <button onClick={chooseTeamAWin} style={{backgroundColor: teamAWin?"blue": "white"}} >
                {teamAName} win <br/>*{teamAWinRatio}</button>
            <button onClick={chooseTeamBWin} style={{backgroundColor: teamBWin?"blue": "white"}} >
                {teamBName} win <br/>*{teamBWinRatio}</button>
            <button onClick={chooseDraw} style={{backgroundColor: isDraw?"blue": "white"}} >
                draw <br/>*{drawRatio}</button>
            <br/>
            {
                !double?
                    <button onClick={doubleIt}>להכפיל את ההימור </button>
                    :
                    <div>
                        <span>{teamAName}<input type={"number"} min="0" value={teamAScore} onChange={scoreAChange}/></span>
                        <span><input type={"number"} min="0" value={teamBScore} onChange={scoreBChange}/>{teamBName}</span>
                        <br/>
                        <button onClick={cancel}>בטל</button>
                    </div>
            }

            <br/>
            <span><input type={"number"} max={amount} min ="0" value={sum} onChange={sumChange}/></span>
            <br/>
            <p>צפי זכייה { sum*ratio}</p>
            <button disabled={!(teamAWin || teamBWin || isDraw) || sum===0} onClick={sendBet}>שלח הימור</button>
        </div>
    )
}
export default BetPage;