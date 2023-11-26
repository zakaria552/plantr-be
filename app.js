const express = require("express");
const app = express();
const cors = require("cors")
const mongoDb = require("./classes/MongoDb");

app.use(express.json());
app.use(cors())

app.get("/users/:userid", async (req, res, next) => {
    const userId = req.params.userid
    try {
        if(!userId) next({ satus: 400, message: "missing user id"})
        const user = await mongoDb.userModel.getUser(userId)
        res.status(200).send(user)
    } catch(e) {
        next(e)
    }
})

app.post("/users", async (req, res, next) => {
    const {userId, name} = req.body
    if(!userId || !name) return next({ status: 400, message: "Missing user id or name"})
    try {
        const createdUser = await mongoDb.userModel.createUser({ userId, name})
        res.status(201).send(createdUser)
    } catch(e) {
        next(e)
    }   
})

app.get("/users/:userId/plants", async (req, res, next) => {
    const { userId } = req.params
    if(!userId ) return next({ status:400, message: "Missing user id"})
    try {
        const plants = await mongoDb.userModel.getPlants(userId)
        res.status(200).send(plants)
    } catch(e) {
        next(e)
    }

})

app.post("/users/:userId/plants", async (req, res, next) => {
    const { userId } = req.params
    const { plantId, imgUrl, description, name, watering } = req.body
    if(!userId) return next({ status: 400, message: "Missing user id"})
    if(!imgUrl || !name || !plantId) return next({status: 400, message: "Missing imgUrl, plantId or name"})
    const plant = { plantId, name, imgUrl, description: description || "", watering: watering || "", lastWatered: ""}
    try {
        const addedPlant = await mongoDb.userModel.addPlant(userId, plant)
        res.status(201).send(addedPlant)
    } catch(e) {
        next(e)
    }

})
app.get("/plants", async (req, res, next) => {
    const { total } = req.query
    try {
        const plants = await mongoDb.plantModel.getPlants(total)
        res.status(200).send(plants)
    } catch(e) {
        next(e)
    }
})
app.use((err, req, res, next) => {
    if(err.status && err.message) {
        res.status(err.status).send({ message: err.message})
    } else {
        next(e)
    }
})

app.use((err, req, res, next) => {
    res.status(400).send({message: "mongodb error"})
})

module.exports = app
