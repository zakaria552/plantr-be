const express = require("express");
const app = express();
const port = 3001
const db = require("./db/connection");
const UsersModel = require("./db/schema/user");

app.use(express.json());

// e.g /user/fsd3234 --> gets the user
app.get("/users/:userid", async (req, res) => {
    const userId = req.params.userid
    try {
        const user = await UsersModel.findOne({userId})
        res.status(200).send(user)
    } catch(e) {
        res.status(400).send({message: "mongodb error"})
    }
})
app.post("/user", async (req, res) => {
    const {userId, name} = req.body
    if(!userId || !name) res.status(400).send({ message: "Missing user id or name"})
    try {
        const createdUser = await UsersModel.create({ userId, name})
        res.status(201).send()
    } catch(e) {
        res.status(400).send({message: "mongodb error"})
    }
})
app.listen(port, () => console.log("Server is running"));