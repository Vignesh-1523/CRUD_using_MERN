import '../styles/Update.css';
import '../styles/navigation.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function Update() {

    const [details, setDetails] = useState({})

    const getDetails = e => {
        setDetails({ ...details, [e.target.name]: e.target.value }) // [e.target.name] is like in useState setting the values to the [details] above..or else we know that we can set a value of object to a variable by -- var [name, age] : object_name. Here the e.target.name is the name attribute's value such as playerName, kills, matchWon etc..
    }

    const sendDetails = async () => {
        // console.log(details);
        try {
            const send = await axios.put("http://localhost:8080/update/" + details.playerId, details) // this second parameter is same in fetch where in body : req.json(details)
        } catch (err) {
            console.log("Error while posting details")
        }

    }

    return (
        <div className='Update'>
            <div className="tag">
                <h1>Free<span>Fire</span></h1>
                <div className="nav">
                    <Link to="/add" className="link">ADD</Link>
                    <Link to="/" className="link">GAMERS</Link>
                    {/* <Link to="/update" className="link">UPDATE</Link> */}
                </div>
            </div>
            <div className="form">
                <input type="text" placeholder="Player id *" id="playerId" name="playerId" onChange={getDetails} />
                {/* <input type="text" placeholder="Player Name" id="playerName" name="playerName" onChange={getDetails} /> */}
                <input type="text" placeholder="Matches played" id="matchesPlayed" name="matchesPlayed" onChange={getDetails} />
                <input type="text" placeholder="Total kills" id="kills" name="kills" onChange={getDetails} />
                <input type="text" placeholder="Matches Won" id="matchWon" name="matchWon" onChange={getDetails} />
                <input type="text" placeholder="Avg Damage" id="averageDamage" name="averageDamage" onChange={getDetails} />
                <input type="text" placeholder="Most used Weapon" id="weapon" name="weapon" onChange={getDetails} />
                <button onClick={sendDetails}><Link to="/" className='link'>Update</Link></button>

                {/* we can also use <a> tag but it refresh the page. We know that react speciality is render pages without refresh and that can be done by <Link> tag from react-render-dom */}
            </div>
        </div>
    )
}

export default Update