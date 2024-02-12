const express = require('express')
const mysql = require('mysql')
const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8778363157',
    database: 'freefire'
})
const cors = require('cors')
app.use(cors())
app.use(express.json())


app.post('/add', (req, res) => {

    console.log("Database connected successfully");
    const q = "INSERT INTO player(`playerId`, `playerName`, `matchesPlayed`, `kills`, `matchWon`, `averageDamage`, `weapon`) VALUES(?)"
    const values = [
        req.body.playerId,
        req.body.playerName,
        req.body.matchesPlayed,
        req.body.kills,
        req.body.matchWon,
        req.body.averageDamage,
        req.body.weapon
    ]
    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
        } else {
            // return res.json(data)
            console.log("sent successfully");
        }
    });
})
app.delete('/:id', (req, res) => { // if we use post method it will work but reflects on the database only, so to delete here we use delete method...some confusions are there lets see soon..

    console.log("Database connected successfully");
    const q = "DELETE FROM player WHERE playerId = ?"
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
        } else {
            // return res.json(data)
            console.log("Deleted Successfully");
        }
    });
})
app.put('/update/:playerId', (req, res) => {
    console.log("Database connected successfully !!");
    const playerId = req.params.playerId;
    const updates = []
    const values = []
    if (req.body.playerName != undefined) {
        updates.push("playerName = ?")
        values.push(req.body.playerName)
    }
    if (req.body.matchesPlayed != undefined) {
        updates.push("matchesPlayed = ?")
        values.push(req.body.matchesPlayed)
    }
    if (req.body.kills != undefined) {
        updates.push("kills = ?")
        values.push(req.body.kills)
    }
    if (req.body.matchWon != undefined) {
        updates.push("matchWon = ?")
        values.push(req.body.matchWon)
    }
    if (req.body.averageDamage != undefined) {
        updates.push("averageDamage = ?")
        values.push(req.body.averageDamage)
    }
    if (req.body.weapon != undefined) {
        updates.push("weapon = ?")
        values.push(req.body.weapon)
    }
    const setUpdates = updates.join(", ")
    console.log(values)
    console.log(updates);

    const q = `UPDATE player SET ${setUpdates} WHERE playerId = ?`;
    db.query(q, [...values, playerId], (err, data) => {
        if (err) {
            console.error("Error while updating");
        } else {
            console.log(data)
        }
    });
});


app.get("/", (req, res) => {
    console.log("Database connected successfully");
    const q = "SELECT * FROM player";
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
        } else {
            return res.json(data)
        }
    });
})


app.listen(8080, (err) => {
    if (err) {
        console.log("error while listeing")
    } else {
        console.log("Server is running on port 8080");
    }
})