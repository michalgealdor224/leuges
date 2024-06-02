import React, {useState, useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import GameTable from "./GameTable";

function DashboardPage (){
    const [liveGamesTable,setLiveGamesTable]=useState([]);
    const [isLiveGamesTable,setIsLiveGamesTable]=useState(false);
    const [errorCode, setErrorCode] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        getGames();
        const event =new EventSource("http://localhost:8989/start-streaming");
        event.onopen=function (){

        };
        event.onmessage =function (datalist){
            console.log(datalist.data)
            if(datalist.data){
                console.log(datalist.data)
                getGames();
            }

        }

    },[])
    const getGames=()=>{
        axios.get("http://localhost:8989/get-live-games", {

        }).then(response => {
            setLiveGamesTable(response.data)

        })
    }
    return (
        <div>
            {
                liveGamesTable.length==0?
                    <div>
                        <h1>There are no game at the moment.</h1>
                    </div>
                    :
                    <GameTable games={liveGamesTable}/>
            }

        </div>
    )

}
export default DashboardPage;