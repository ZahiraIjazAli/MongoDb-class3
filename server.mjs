import express from "express"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 2200;


let users = []; 

function randomNumber() {
    return Math.floor(Math.random() * 100000000000);
}


app.post("/user", (req, res) => {

    console.log(req.body); 
    let newUser = {
        id: randomNumber(),
        firstname: req.body.firstname,
        secondname: req.body.secondname,
        password: req.body.password
    }

    users.push(newUser);
    res.status(201).send("user is created"); 
})

app.get("/user/:userId", (req, res) => {

    let userId = req.params.userId;
    let isFound = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            res.send(users[i]);
            isFound = true;
            break;
        }
    }
    if (!isFound) {
        res.status(204).send("user not found");
    }
})

app.get("/users", (req, res) => {
    res.send(users);
})

app.put("/user/:userId", (req, res) => { 
    res.send("your user is modified");

    let userId = req.params.userId;
    let userIndex = -1

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            userIndex = i;
            break;
        }
    }

    if (userIndex === -1) {
        res.status(204).send("user not found");
    } else {

        if (req.body.firstname) {
            users[userIndex].firstname = req.body.firstname
        };
        if (req.body.secondname) {
            users[userIndex].secondname = req.body.secondname
        };
        if (req.body.password) {
            users[userIndex].password = req.body.password
        };

        res.send(users[userIndex]);
    }
})

app.delete("/user/:userId", (req, res) => {

    let userId = req.params.userId;
    let userIndex = -1

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            userIndex = i;
            break;
        }
    }

    if (userIndex === -1) {

        res.status(204)
        res.send("user not found");

    } else {

        users.splice(userIndex, 1);
        res.send("user is deleted");
    }
})

app.delete("/users", (req, res) => {
    
    users = [];
    
    res.send("all users deleted");
})


app.get('/', (req, res) => {
    console.log("modified");
    res.send('its home page!')
})


app.listen(port, () => {
    console.log(`port is running ${port}`)
})