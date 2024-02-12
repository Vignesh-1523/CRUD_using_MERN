import { useEffect, useState } from "react"
import axios from 'axios';
import '../styles/Read.css';
import '../styles/navigation.css';
import { Link } from 'react-router-dom';
function Read() {

    const [players, setPlayers] = useState([])
    const fetchAllPlayers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/")
            // console.log(response)
            console.log(response.data[0].playerName) // Hadrian stein
            setPlayers(response.data)
        } catch (err) {
            console.log("error occured while fetching data")
        }
    }
    useEffect(() => {
        fetchAllPlayers()
    }, [])
    console.log(players);

    // Delete function
    const deletePlayer =  (id) => {
        try{
             axios.delete("http://localhost:8080/" + id) 
             window.location.reload() // we refresh the page to see the changes immediately  and I removed the async, await because with that the reload happened before the delete, its like that only i think because without this perfectly happens.
             .then((res)=>{console.log('Deleted player with ID :' + res.data)} )  
        }catch(err){
            console.log("error occured while deleting data")
        }
    }
    return (
        <div className="Read">
            <div className="tag">
                <h1>Free<span>Fire</span></h1>
                <h1>EDDI <span>Guild Of Bosses</span></h1>
                <div className="nav">
                    <Link to="/add" className="link">ADD</Link>
                    <Link to="/" className="link">GAMERS</Link>
                    {/* <Link to="/update" className="link">UPDATE</Link> */}
                </div>
            </div>
            {players.map((detail, index) => (
                <div key={index} className="player">
                    <h1>{detail.playerName}</h1>
                    <p><span>Player ID</span>        : {detail.playerId}</p>
                    <p><span>Match played</span>     : {detail.matchesPlayed}</p>
                    <p><span>Total kills</span>      : {detail.kills}</p>
                    <p><span>Matchs Won</span>       : {detail.matchWon}</p>
                    <p><span>Avg Damage</span>       : {detail.averageDamage}</p>
                    <p><span>Most used Weapon</span> : {detail.weapon}</p>
                    <button className="del" onClick={() => deletePlayer(detail.playerId)}>Delete Player</button>
                    <button className="upd"><Link to="/update" className="link">Update Player</Link></button>
                </div>
            ))}
        </div>
    )
}

export default Read