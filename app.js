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
app.get("/users/emails/:email", async (req, res, next) => {
    const { email } = req.params
    try {
        const user = await mongoDb.userModel.getUserByEmail(email)
        res.status(200).send(user)
    } catch(e) {
        console.log(e)
        next(e)
    }
})
app.post("/users", async (req, res, next) => {
    const {name, email, passwordHash} = req.body
    if(!name || !email || !passwordHash) return next({ status: 400, message: "Missing name, passwordHash or email"})
    try {
        const createdUser = await mongoDb.userModel.createUser({ name, email, passwordHash})
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
    const { plant } = req.body
    if(!userId) return next({ status: 400, message: "Missing user id"})
    if(!plant) return next({status: 400, message: "Missing plant"})
    const plantFormated = {...plant, lastWatered: ""}
    try {
        const addedPlant = await mongoDb.userModel.addPlant(userId, plantFormated)
        res.status(201).send(addedPlant)
    } catch(e) {
        next(e)
    }

})
app.put("/users/:userId/plants/:plantId", async (req, res, next) => {
    const { userId, plantId } = req.params
    const {lastWatered} = req.body
    if(!userId) return next({ status: 400, message: "Missing user id"}) 
    if(!plantId) return next({status: 400, message: "Missing plantId"})
    if(!lastWatered) return next({status: 400, message: "Missing lastWatered"})
    try {
        const updatedPlant = await mongoDb.userModel.updatePlant(userId, plantId, lastWatered)
        res.status(201).send(updatedPlant)
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
app.get("/plants/:plantId", async (req, res, next) => {
    const {plantId} = req.params
    try {
        const plant = await mongoDb.plantModel.getPlantById(plantId)
        res.status(200).send(plant)
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
